import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import fs from 'fs/promises';
import path from 'path';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File | null;
    const bucket = (formData.get('bucket') as string) || 'media';
    const folder = (formData.get('folder') as string) || '';

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    const fileExt = file.name.split('.').pop() || 'png';
    const cleanFileName = file.name
      .replace(/\.[^/.]+$/, '')
      .replace(/[^a-zA-Z0-9]/g, '_')
      .toLowerCase();
    const fileName = `${Date.now()}_${cleanFileName}.${fileExt}`;
    const filePath = folder ? `${folder}/${fileName}` : fileName;

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // 1. Try uploading to Supabase Storage using service role key
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (supabaseUrl && serviceRoleKey && !supabaseUrl.includes('placeholder')) {
      try {
        const supabase = createClient(supabaseUrl, serviceRoleKey);
        const { data, error } = await supabase.storage.from(bucket).upload(filePath, buffer, {
          contentType: file.type || 'image/jpeg',
          cacheControl: '3600',
          upsert: true,
        });

        if (!error && data) {
          const {
            data: { publicUrl },
          } = supabase.storage.from(bucket).getPublicUrl(data.path);

          return NextResponse.json({
            path: data.path,
            publicUrl,
          });
        } else if (error) {
          console.warn('Supabase storage upload error, falling back to local storage:', error.message);
        }
      } catch (sbError: any) {
        console.warn('Supabase storage exception, falling back to local storage:', sbError.message);
      }
    }

    // 2. Fallback: Save directly to public/uploads/<bucket>/
    const uploadsDir = path.join(process.cwd(), 'public', 'uploads', bucket);
    await fs.mkdir(uploadsDir, { recursive: true });
    const localFilePath = path.join(uploadsDir, fileName);
    await fs.writeFile(localFilePath, buffer);

    const publicUrl = `/uploads/${bucket}/${fileName}`;
    return NextResponse.json({
      path: publicUrl,
      publicUrl,
    });
  } catch (err: any) {
    console.error('Upload API route error:', err);
    return NextResponse.json(
      { error: err.message || 'Failed to process file upload' },
      { status: 500 }
    );
  }
}
