'use client'

import { useEffect, useState } from 'react'
import { signOut } from "next-auth/react"
import { Button } from '@/components/ui/button'
import { Header } from '@/components/header'
import { getSession } from 'next-auth/react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { solarizedlight } from 'react-syntax-highlighter/dist/esm/styles/prism'

const fakeFunctions = [
  { id: 1, name: 'Function One', code: 'def function_one():\n    return "Hello from Function One"' },
  { id: 2, name: 'Function Two', code: 'def function_two():\n    return "Hello from Function Two"' },
]

export default function Dashboard() {
  const [session, setSession] = useState(null)
  const [selectedFunction, setSelectedFunction] = useState(fakeFunctions[0])
  const [code, setCode] = useState(selectedFunction.code)
  const [isEditing, setIsEditing] = useState(false)
  const [functions, setFunctions] = useState(fakeFunctions)

  useEffect(() => {
    const fetchSession = async () => {
      const sessionData = await getSession()
      if (!sessionData) {
        throw new Error('Session data is null')
      }
      setSession(sessionData)
    }
    fetchSession()
  }, [])
  const handleFunctionSelect = (func: { id: number, name: string, code: string }) => {
    setSelectedFunction(func)
    setCode(func.code)
    setIsEditing(false)
  }

  const handleCodeChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCode(event.target.value)
  }

  const handleSave = () => {
    // Here you would typically save the code to a server
    console.log('Code saved:', code)
    setIsEditing(false)
  }

  const handleAddFunction = () => {
    const newFunction = { id: functions.length + 1, name: `Function ${functions.length + 1}`, code: '' }
    setFunctions([...functions, newFunction])
    setSelectedFunction(newFunction)
    setCode(newFunction.code)
    setIsEditing(true)
  }

  return (
    <div className="flex flex-col min-h-screen">
      <div className="px-4 lg:px-6 h-14 flex items-center border-b">
        <Header showNavLinks={false} />
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Button
            variant="ghost"
            onClick={() => signOut({ callbackUrl: '/' })}
          >
            Sign Out
          </Button>
        </nav>
      </div>
      <main className="flex-1 flex">
        <aside className="w-1/4 border-r p-4">
          <h2 className="text-xl font-bold mb-4">Functions</h2>
          <ul>
            {functions.map((func) => (
              <li key={func.id}>
                <button
                  className={`block w-full text-left p-2 ${selectedFunction.id === func.id ? 'bg-gray-200' : ''}`}
                  onClick={() => handleFunctionSelect(func)}
                >
                  {func.name}
                </button>
              </li>
            ))}
          </ul>
          <Button className="mt-4" onClick={handleAddFunction}>
            + Add Function
          </Button>
        </aside>
        <section className="w-3/4 p-4">
          <h2 className="text-xl font-bold mb-4">{selectedFunction.name}</h2>
          {!isEditing ? (
            <>
              <SyntaxHighlighter language="python" style={solarizedlight}>
                {code}
              </SyntaxHighlighter>
              <Button className="mt-4" onClick={() => setIsEditing(true)}>
                Edit
              </Button>
            </>
          ) : (
            <>
              <textarea
                className="w-full h-64 mt-4 p-2 border"
                value={code}
                onChange={handleCodeChange}
              />
              <Button className="mt-4" onClick={handleSave}>
                Done
              </Button>
            </>
          )}
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-gray-500 dark:text-gray-400">© 2023 Remote Functions. All rights reserved.</p>
      </footer>
    </div>
  )
}
