'use client'
import Link from 'next/link'
import { Zap } from 'lucide-react'

interface HeaderProps {
  showNavLinks?: boolean
}

export function Header({ showNavLinks = true }: HeaderProps) {
  return (
    <header className="px-4 lg:px-6 h-14 flex items-center border-b">
      <Link className="flex items-center justify-center" href="/">
        <Zap className="h-6 w-6" />
        <span className="ml-2 text-2xl font-bold">Remote Functions</span>
      </Link>
      {showNavLinks && (
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Link className="text-sm font-medium hover:underline underline-offset-4" href="/signin">
            Sign In
          </Link>
          <Link className="text-sm font-medium hover:underline underline-offset-4" href="/signup">
            Sign Up
          </Link>
        </nav>
      )}
    </header>
  )
}

