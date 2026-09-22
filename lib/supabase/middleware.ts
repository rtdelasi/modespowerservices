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

  if (bypassToken && previewToken && previewToken === bypassToken) {
    hasBypass = true;
    shouldSetBypassCookie = true;
  } else if (request.cookies.get('maintenance_bypass')?.value === '1') {
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

  // 3. SKIPPED PUBLIC ROUTES (Avoid loops & keep API/maintenance page reachable)
  if (
    pathname === '/maintenance' ||
    pathname.startsWith('/api') ||
    pathname.startsWith('/_next') ||
    hasBypass
  ) {
    return supabaseResponse;
  }

  // 4. MAINTENANCE MODE DATABASE CHECK
  try {
    const { data: settings } = await supabase
      .from('site_settings')
      .select('maintenance_mode')
      .eq('id', 'default')
      .single();

    if (settings?.maintenance_mode) {
      // Check if visitor is an authenticated admin
      const {
        data: { user },
      } = await supabase.auth.getUser();

      // If NOT an authenticated admin, rewrite to /maintenance (preserves requested URL in browser)
      if (!user) {
        const rewriteUrl = request.nextUrl.clone();
        rewriteUrl.pathname = '/maintenance';

        const rewriteResponse = NextResponse.rewrite(rewriteUrl, {
          request: {
            headers: request.headers,
          },
        });

        // Copy over updated cookie headers (e.g. auth tokens / bypass cookies)
        supabaseResponse.cookies.getAll().forEach((cookie) => {
          rewriteResponse.cookies.set(cookie);
        });

        return rewriteResponse;
      }
    }
  } catch (err) {
    // Fail open on database error so site remains reachable
    console.error('Maintenance mode verification error:', err);
  }

  return supabaseResponse;
}
