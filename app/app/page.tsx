'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowRight, Code, Repeat, Zap } from 'lucide-react'
import { Header } from '@/components/header'

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                  Centralize Your LLM Tools
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                  Define, manage, and reuse your LLM tools across multiple applications with ease.
                </p>
              </div>
              <div className="space-x-4">
                <Link href="/signup">
                  <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
                    Get Started
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link href="#how-it-works">
                  <Button variant="outline">Learn More</Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
        <section id="features" className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12">Key Features</h2>
            <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-3">
              <div className="flex flex-col items-center space-y-3 text-center">
                <Code className="h-12 w-12 text-primary" />
                <h3 className="text-xl font-bold">Centralized Definition</h3>
                <p className="text-gray-500 dark:text-gray-400">Define your LLM tools in one place for consistency and easy management.</p>
              </div>
              <div className="flex flex-col items-center space-y-3 text-center">
                <Repeat className="h-12 w-12 text-primary" />
                <h3 className="text-xl font-bold">Easy Reusability</h3>
                <p className="text-gray-500 dark:text-gray-400">Use the same tools across multiple applications without duplication.</p>
              </div>
              <div className="flex flex-col items-center space-y-3 text-center">
                <Zap className="h-12 w-12 text-primary" />
                <h3 className="text-xl font-bold">Improved Efficiency</h3>
                <p className="text-gray-500 dark:text-gray-400">Streamline your development process and reduce redundancy in your codebase.</p>
              </div>
            </div>
          </div>
        </section>
        <section id="how-it-works" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12">How It Works</h2>
            <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-3">
              <div className="flex flex-col space-y-3">
                <span className="text-xl font-bold">1. Define</span>
                <p className="text-gray-500 dark:text-gray-400">Create your LLM tools in our centralized platform.</p>
              </div>
              <div className="flex flex-col space-y-3">
                <span className="text-xl font-bold">2. Manage</span>
                <p className="text-gray-500 dark:text-gray-400">Easily update and version your tools as needed.</p>
              </div>
              <div className="flex flex-col space-y-3">
                <span className="text-xl font-bold">3. Integrate</span>
                <p className="text-gray-500 dark:text-gray-400">Seamlessly use your tools across multiple applications.</p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-gray-500 dark:text-gray-400">© 2023 Remote Functions. All rights reserved.</p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Terms of Service
          </Link>
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Privacy
          </Link>
        </nav>
      </footer>
    </div>
  )
}
