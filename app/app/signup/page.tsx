'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { signIn } from 'next-auth/react'
import { Header } from '@/components/header'

export default function SignUp() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header showNavLinks={false} />
      <main className="flex-1 flex items-center justify-center">
        <div className="w-full max-w-md space-y-8 px-4 py-8 bg-white shadow-lg rounded-lg">
          <div className="space-y-2 text-center">
            <h1 className="text-3xl font-bold">Sign Up</h1>
            <p className="text-gray-500">Create your account to get started</p>
          </div>
          <form className="space-y-4" action={async (formData) => {
            const name = formData.get('name') as string
            const email = formData.get('email') as string
            const password = formData.get('password') as string
            // Here you would typically create a new user account
            // For this example, we'll just redirect to the dashboard
            await signIn('credentials', { email, password, callbackUrl: '/dashboard' })
          }}>
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input id="name" name="name" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" name="email" type="email" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" name="password" type="password" required />
            </div>
            <Button className="w-full" type="submit">
              Sign Up
            </Button>
          </form>
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white px-2 text-muted-foreground">
                Or continue with
              </span>
            </div>
          </div>
          <Button
            variant="outline"
            type="button"
            className="w-full"
            onClick={() => signIn('google', { callbackUrl: '/dashboard' })}
          >
            Sign up with Google
          </Button>
          <div className="text-center">
            <p className="text-sm text-gray-500">
              Already have an account?{' '}
              <Link className="text-blue-600 hover:underline" href="/signin">
                Sign In
              </Link>
            </p>
          </div>
        </div>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-gray-500 dark:text-gray-400">© 2023 Remote Functions. All rights reserved.</p>
      </footer>
    </div>
  )
}
