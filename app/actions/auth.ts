'use server';

import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';

export async function login(formData: FormData) {
  const email = (formData.get('email') as string)?.trim();
  const password = (formData.get('password') as string)?.trim();
  const redirectTo = (formData.get('redirectTo') as string) || '/admin';

  if (!email || !password) {
    return { success: false, error: 'Please enter both email and password.' };
  }

  const supabase = createClient();
  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return { success: false, error: error.message };
  }

  revalidatePath('/', 'layout');
  return { success: true, redirectTo };
}

export async function logout() {
  const supabase = createClient();
  await supabase.auth.signOut();
  revalidatePath('/', 'layout');
  redirect('/admin/login');
}
