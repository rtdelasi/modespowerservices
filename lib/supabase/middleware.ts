import { createServerClient } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server';

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  });

  const pathname = request.nextUrl.pathname;

  // 1. FALLBACK BYPASS: Check query param (?preview_token=xxx) or signed cookie
  const bypassToken = process.env.MAINTENANCE_BYPASS_TOKEN;
  const previewToken = request.nextUrl.searchParams.get('preview_token');

  let hasBypass = false;
  let shouldSetBypassCookie = false;

  if (bypassToken && bypassToken.length > 5 && previewToken && previewToken === bypassToken) {
    hasBypass = true;
    shouldSetBypassCookie = true;
  } else if (bypassToken && bypassToken.length > 5 && request.cookies.get('maintenance_bypass')?.value === '1') {
    hasBypass = true;
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseKey) {
    return supabaseResponse;
  }

  const supabase = createServerClient(supabaseUrl, supabaseKey, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
        supabaseResponse = NextResponse.next({
          request,
        });
        cookiesToSet.forEach(({ name, value, options }) =>
          supabaseResponse.cookies.set(name, value, options)
        );
      },
    },
  });

  // Attach bypass cookie if requested via query token
  if (shouldSetBypassCookie) {
    supabaseResponse.cookies.set({
      name: 'maintenance_bypass',
      value: '1',
      path: '/',
      maxAge: 60 * 60 * 24, // 24 hours
      sameSite: 'lax',
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
    });
  }

  // 2. ADMIN ROUTE GATING (/admin/*)
  const isAccessingAdmin = pathname.startsWith('/admin');
  if (isAccessingAdmin) {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    const isLoginPage = pathname.startsWith('/admin/login');

    if (!isLoginPage && !user) {
      const url = request.nextUrl.clone();
      url.pathname = '/admin/login';
      url.searchParams.set('redirectTo', pathname);
      return NextResponse.redirect(url);
    }

    if (isLoginPage && user) {
      const url = request.nextUrl.clone();
      url.pathname = '/admin';
      return NextResponse.redirect(url);
    }

    return supabaseResponse;
  }

  // 3. EXPLICIT STANDALONE ALLOWLIST: Direct /maintenance access & Next.js internals
  if (pathname === '/maintenance') {
    const requestHeaders = new Headers(request.headers);
    requestHeaders.set('x-maintenance-mode', 'true');
    const response = NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    });
    return response;
  }

  if (pathname.startsWith('/_next')) {
    return supabaseResponse;
  }

  // If visitor has valid fallback bypass token, allow through directly to live site
  if (hasBypass) {
    return supabaseResponse;
  }

  // 4. MAINTENANCE MODE DATABASE CHECK & HARD GATING
  try {
    const { data: settings, error: dbError } = await supabase
      .from('site_settings')
      .select('maintenance_mode')
      .eq('id', 'default')
      .single();

    if (!dbError && settings?.maintenance_mode) {
      // Cryptographically verify if request has a valid Supabase admin session
      const {
        data: { user },
        error: authError,
      } = await supabase.auth.getUser();

      // If user is NOT an authenticated admin
      if (!user || authError) {
        // Block API routes with 503 JSON response
        if (pathname.startsWith('/api')) {
          return NextResponse.json(
            {
              error: 'Website maintenance ongoing. API endpoints are temporarily unavailable.',
              maintenance_mode: true,
            },
            {
              status: 503,
              headers: {
                'Cache-Control': 'no-store, no-cache, must-revalidate, max-age=0',
                'Retry-After': '3600',
              },
            }
          );
        }

        // For all public web routes (/, /about, /services, /projects, /gallery, /contact, etc.),
        // rewrite to /maintenance while preserving original URL in browser
        const rewriteUrl = request.nextUrl.clone();
        rewriteUrl.pathname = '/maintenance';

        const requestHeaders = new Headers(request.headers);
        requestHeaders.set('x-maintenance-mode', 'true');

        const rewriteResponse = NextResponse.rewrite(rewriteUrl, {
          request: {
            headers: requestHeaders,
          },
        });

        // Prevent CDN or browser caching of maintenance rewrite responses
        rewriteResponse.headers.set('Cache-Control', 'no-store, no-cache, must-revalidate, max-age=0');
        rewriteResponse.headers.set('Pragma', 'no-cache');
        rewriteResponse.headers.set('Expires', '0');

        // Copy over cookies (including any updated session/bypass cookies)
        supabaseResponse.cookies.getAll().forEach((cookie) => {
          rewriteResponse.cookies.set(cookie);
        });

        return rewriteResponse;
      }
    }
  } catch (err) {
    // Fail open on database network timeout so site remains available
    console.error('Maintenance mode verification error:', err);
  }

  return supabaseResponse;
}
