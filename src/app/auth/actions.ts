// app/auth/actions.ts
'use server'

import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export async function login(formData: FormData) {
  const supabase = await createClient()

  // Validate the form data
  const email = formData.get('email') as string
  const password = formData.get('password') as string

  if (!email || !password) {
    return { error: 'Please provide both email and password' }
  }

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error) {
    return { error: error.message }
  }

  // After successful login, check if user is a guide
  const { data: profile } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', data.user.id)
    .single()

  revalidatePath('/', 'layout')
  
  // Redirect based on user role
  if (profile?.role === 'guide') {
    redirect('/guide/dashboard')
  } else {
    redirect('/dashboard')
  }
}

export async function signup(formData: FormData) {
  const supabase = await createClient()

  // Validate the form data
  const email = formData.get('email') as string
  const password = formData.get('password') as string
  const fullName = formData.get('fullName') as string
  const isGuide = formData.get('isGuide') === 'true'

  if (!email || !password || !fullName) {
    return { error: 'Please fill in all required fields' }
  }

  // Create the user
  const { data: { user }, error: signUpError } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name: fullName,
        role: isGuide ? 'guide' : 'user'
      }
    }
  })

  if (signUpError) {
    return { error: signUpError.message }
  }

  if (!user) {
    return { error: 'An error occurred during signup' }
  }

  // Create profile record
  const { error: profileError } = await supabase
    .from('profiles')
    .insert({
      id: user.id,
      full_name: fullName,
      email: email,
      role: isGuide ? 'guide' : 'user',
    })

  if (profileError) {
    return { error: profileError.message }
  }

  revalidatePath('/', 'layout')
  redirect('/auth/verify')
}

export async function signOut() {
  const supabase = await createClient()
  
  const { error } = await supabase.auth.signOut()
  
  if (error) {
    return { error: error.message }
  }

  revalidatePath('/', 'layout')
  redirect('/auth/login')
}

export async function resetPassword(formData: FormData) {
  const supabase = await createClient()
  
  const email = formData.get('email') as string
  
  if (!email) {
    return { error: 'Please provide an email address' }
  }

  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${process.env.NEXT_PUBLIC_APP_URL}/auth/update-password`,
  })

  if (error) {
    return { error: error.message }
  }

  return { success: true }
}

export async function updatePassword(formData: FormData) {
  const supabase = await createClient()
  
  const password = formData.get('password') as string
  const confirmPassword = formData.get('confirmPassword') as string

  if (!password || !confirmPassword) {
    return { error: 'Please provide both password fields' }
  }

  if (password !== confirmPassword) {
    return { error: 'Passwords do not match' }
  }

  const { error } = await supabase.auth.updateUser({
    password: password
  })

  if (error) {
    return { error: error.message }
  }

  revalidatePath('/', 'layout')
  redirect('/auth/login?message=Password updated successfully')
}

export async function updateProfile(formData: FormData) {
  const supabase = await createClient()
  
  // Get the current user
  const { data: { user }, error: userError } = await supabase.auth.getUser()
  
  if (userError || !user) {
    return { error: 'Not authenticated' }
  }

  const fullName = formData.get('fullName') as string
  const avatar = formData.get('avatar') as File

  // Start building the update object
  const updates: any = {
    id: user.id,
    full_name: fullName,
    updated_at: new Date().toISOString(),
  }

  // Handle avatar upload if provided
  if (avatar && avatar.size > 0) {
    const fileExt = avatar.name.split('.').pop()
    const fileName = `${user.id}/${Math.random()}.${fileExt}`

    const { error: uploadError } = await supabase.storage
      .from('avatars')
      .upload(fileName, avatar)

    if (uploadError) {
      return { error: 'Error uploading avatar' }
    }

    const { data: { publicUrl } } = supabase.storage
      .from('avatars')
      .getPublicUrl(fileName)

    updates.avatar_url = publicUrl
  }

  const { error: updateError } = await supabase
    .from('profiles')
    .upsert(updates)

  if (updateError) {
    return { error: updateError.message }
  }

  revalidatePath('/', 'layout')
  return { success: true }
}