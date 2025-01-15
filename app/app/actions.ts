'use server'

import { redirect } from 'next/navigation'

export async function signIn(formData: FormData) {
  const email = formData.get('email')
  const password = formData.get('password')

  // Here you would typically validate the user's credentials
  // For this example, we'll just log the attempt and redirect
  console.log(`Sign in attempt for email: ${email}`)

  // Redirect to the dashboard (in a real app, only if authentication is successful)
  redirect('/dashboard')
}

export async function signUp(formData: FormData) {
  const name = formData.get('name')
  const email = formData.get('email')
  const password = formData.get('password')

  // Here you would typically create a new user account
  // For this example, we'll just log the attempt and redirect
  console.log(`Sign up attempt for name: ${name}, email: ${email}`)

  // Redirect to the dashboard (in a real app, only if sign up is successful)
  redirect('/dashboard')
}

