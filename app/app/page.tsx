'use client'

import { useState, useEffect } from 'react'
import { useSession, signOut } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { PARAMETERS, ParamProfile, getAllGroups, getParametersByGroup, ParamGroup } from '@/lib/parameters'
import { formatDistance } from 'date-fns'

interface Response {
  id: string
  inputText: string
  outputText: string
  createdAt: string
}

export default function DashboardPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [activeTab, setActiveTab] = useState<'rewrite' | 'profile' | 'history'>('rewrite')
  const [profile, setProfile] = useState<ParamProfile | null>(null)
  const [loading, setLoading] = useState(true)

  // Rewrite state
  const [inputText, setInputText] = useState('')
  const [outputVariants, setOutputVariants] = useState<string[]>([])
  const [rewriting, setRewriting] = useState(false)
  const [rewriteError, setRewriteError] = useState('')
  const [activeVariant, setActiveVariant] = useState(0)

  // History state
  const [history, setHistory] = useState<Response[]>([])
  const [loadingHistory, setLoadingHistory] = useState(false)

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/signup')
    } else if (status === 'authenticated') {
      loadProfile()
    }
  }, [status, router])

  const loadProfile = async () => {
    try {
      const res = await fetch('/api/profile')
      if (res.ok) {
        const data = await res.json()
        setProfile(data.profile.params)
      } else if (res.status === 404) {
        // No profile yet, redirect to onboarding
        router.push('/onboarding')
      }
    } catch (error) {
      console.error('Failed to load profile:', error)
    } finally {
      setLoading(false)
    }
  }

  const loadHistory = async () => {
    setLoadingHistory(true)
    try {
      const res = await fetch('/api/responses')
      if (res.ok) {
        const data = await res.json()
        setHistory(data.responses)
      }
    } catch (error) {
      console.error('Failed to load history:', error)
    } finally {
      setLoadingHistory(false)
    }
  }

  useEffect(() => {
    if (activeTab === 'history' && history.length === 0) {
      loadHistory()
    }
  }, [activeTab])

  const handleRewrite = async () => {
    if (!inputText.trim()) {
      setRewriteError('Please enter some text to rewrite')
      return
    }

    setRewriting(true)
    setRewriteError('')
    setOutputVariants([])

    try {
      const res = await fetch('/api/rewrite', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ inputText }),
      })

      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.error || 'Failed to rewrite')
      }

      const data = await res.json()
      setOutputVariants(data.variants)
      setActiveVariant(0)
    } catch (error) {
      setRewriteError(error instanceof Error ? error.message : 'Something went wrong')
    } finally {
      setRewriting(false)
    }
  }

  const handleSaveResponse = async () => {
    if (!outputVariants[activeVariant]) return

    try {
      await fetch('/api/responses', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          inputText,
          outputText: outputVariants[activeVariant],
        }),
      })
      alert('Saved to history!')
    } catch (error) {
      alert('Failed to save')
    }
  }

  const handleUpdateParam = async (paramId: string, value: 0 | 1) => {
    if (!profile) return

    const updatedProfile = { ...profile, [paramId]: value }
    setProfile(updatedProfile)

    try {
      await fetch('/api/profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ params: updatedProfile }),
      })
    } catch (error) {
      console.error('Failed to update profile:', error)
      // Revert on error
      setProfile(profile)
    }
  }

  const handleExportProfile = () => {
    if (!profile) return

    const dataStr = JSON.stringify(profile, null, 2)
    const dataBlob = new Blob([dataStr], { type: 'application/json' })
    const url = URL.createObjectURL(dataBlob)
    const link = document.createElement('a')
    link.href = url
    link.download = 'aira_profile.json'
    link.click()
    URL.revokeObjectURL(url)
  }

  const handleResetProfile = async () => {
    if (!confirm('Are you sure you want to reset all parameters to 0?')) return

    const resetProfile = Object.keys(profile || {}).reduce((acc, key) => {
      acc[key] = 0
      return acc
    }, {} as ParamProfile)

    setProfile(resetProfile)

    try {
      await fetch('/api/profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ params: resetProfile }),
      })
    } catch (error) {
      console.error('Failed to reset profile:', error)
    }
  }

  if (status === 'loading' || loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-lg text-gray-600">Loading...</div>
      </div>
    )
  }

  if (!session || !profile) {
    return null
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="border-b bg-white shadow-sm">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <h1 className="text-2xl font-bold text-blue-600">AIRA</h1>
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-600">{session.user.email}</span>
            <button
              onClick={() => signOut({ callbackUrl: '/' })}
              className="rounded-lg px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100"
            >
              Sign Out
            </button>
          </div>
        </div>
      </header>

      {/* Tabs */}
      <div className="border-b bg-white">
        <div className="container mx-auto px-4">
          <nav className="flex gap-8">
            <button
              onClick={() => setActiveTab('rewrite')}
              className={`border-b-2 py-4 text-sm font-medium transition-colors ${
                activeTab === 'rewrite'
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-600 hover:text-gray-900'
              }`}
            >
              Rewrite
            </button>
            <button
              onClick={() => setActiveTab('profile')}
              className={`border-b-2 py-4 text-sm font-medium transition-colors ${
                activeTab === 'profile'
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-600 hover:text-gray-900'
              }`}
            >
              Your Profile
            </button>
            <button
              onClick={() => setActiveTab('history')}
              className={`border-b-2 py-4 text-sm font-medium transition-colors ${
                activeTab === 'history'
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-600 hover:text-gray-900'
              }`}
            >
              History
            </button>
          </nav>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-8">
        {activeTab === 'rewrite' && (
          <div className="mx-auto max-w-4xl space-y-6">
            <div className="rounded-lg border bg-white p-6 shadow-sm">
              <h2 className="mb-4 text-xl font-bold text-gray-900">Rewrite Text</h2>
              <textarea
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Paste text to rewrite..."
                className="mb-4 h-48 w-full rounded-lg border border-gray-300 p-4 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
              {rewriteError && (
                <div className="mb-4 rounded-lg bg-red-50 p-3 text-sm text-red-600">
                  {rewriteError}
                </div>
              )}
              <button
                onClick={handleRewrite}
                disabled={rewriting || !inputText.trim()}
                className="w-full rounded-lg bg-blue-600 px-6 py-3 font-medium text-white hover:bg-blue-700 disabled:opacity-50"
              >
                {rewriting ? 'Rewriting...' : 'Rewrite to My Voice'}
              </button>
            </div>

            {outputVariants.length > 0 && (
              <div className="rounded-lg border bg-white p-6 shadow-sm">
                <div className="mb-4 flex items-center justify-between">
                  <h3 className="text-lg font-bold text-gray-900">Output</h3>
                  <button
                    onClick={handleSaveResponse}
                    className="rounded-lg bg-green-600 px-4 py-2 text-sm font-medium text-white hover:bg-green-700"
                  >
                    Save to History
                  </button>
                </div>

                {/* Variant tabs */}
                {outputVariants.length > 1 && (
                  <div className="mb-4 flex gap-2">
                    {outputVariants.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setActiveVariant(index)}
                        className={`rounded-lg px-4 py-2 text-sm font-medium ${
                          activeVariant === index
                            ? 'bg-blue-600 text-white'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        Variant {index + 1}
                      </button>
                    ))}
                  </div>
                )}

                <div className="whitespace-pre-wrap rounded-lg bg-gray-50 p-4 text-gray-900">
                  {outputVariants[activeVariant]}
                </div>
              </div>
            )}
          </div>
        )}

        {activeTab === 'profile' && (
          <div className="mx-auto max-w-6xl">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">Your Writing Profile</h2>
              <div className="flex gap-2">
                <button
                  onClick={handleExportProfile}
                  className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                  Export JSON
                </button>
                <button
                  onClick={handleResetProfile}
                  className="rounded-lg border border-red-300 px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50"
                >
                  Reset All
                </button>
              </div>
            </div>

            <div className="space-y-6">
              {getAllGroups().map((group) => (
                <div key={group} className="rounded-lg border bg-white p-6 shadow-sm">
                  <h3 className="mb-4 text-lg font-bold text-gray-900">{group}</h3>
                  <div className="grid gap-4 md:grid-cols-2">
                    {getParametersByGroup(group as ParamGroup).map((param) => (
                      <div
                        key={param.id}
                        className="flex items-center justify-between rounded-lg border p-4"
                      >
                        <div>
                          <div className="font-medium text-gray-900">{param.label}</div>
                          {param.description && (
                            <div className="text-sm text-gray-500">{param.description}</div>
                          )}
                        </div>
                        <label className="relative inline-flex cursor-pointer items-center">
                          <input
                            type="checkbox"
                            checked={profile[param.id] === 1}
                            onChange={(e) => handleUpdateParam(param.id, e.target.checked ? 1 : 0)}
                            className="peer sr-only"
                          />
                          <div className="peer h-6 w-11 rounded-full bg-gray-200 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-blue-600 peer-checked:after:translate-x-full peer-checked:after:border-white" />
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'history' && (
          <div className="mx-auto max-w-6xl">
            <h2 className="mb-6 text-2xl font-bold text-gray-900">Rewrite History</h2>
            {loadingHistory ? (
              <div className="text-center text-gray-600">Loading...</div>
            ) : history.length === 0 ? (
              <div className="rounded-lg border bg-white p-12 text-center shadow-sm">
                <p className="text-gray-600">No history yet. Start rewriting!</p>
              </div>
            ) : (
              <div className="space-y-4">
                {history.map((response) => (
                  <div key={response.id} className="rounded-lg border bg-white p-6 shadow-sm">
                    <div className="mb-2 text-sm text-gray-500">
                      {formatDistance(new Date(response.createdAt), new Date(), {
                        addSuffix: true,
                      })}
                    </div>
                    <div className="mb-4">
                      <div className="mb-1 text-xs font-medium text-gray-500">INPUT</div>
                      <div className="text-sm text-gray-700">
                        {response.inputText.substring(0, 200)}
                        {response.inputText.length > 200 && '...'}
                      </div>
                    </div>
                    <div>
                      <div className="mb-1 text-xs font-medium text-gray-500">OUTPUT</div>
                      <div className="whitespace-pre-wrap text-sm text-gray-900">
                        {response.outputText}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
