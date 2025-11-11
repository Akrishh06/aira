'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { ONBOARDING_QUESTIONS, Answer } from '@/lib/onboarding'

export default function OnboardingPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(0)
  const [answers, setAnswers] = useState<Answer[]>([])
  const [currentAnswer, setCurrentAnswer] = useState<string | number | boolean>('')
  const [multiSelectValues, setMultiSelectValues] = useState<Set<string>>(new Set())
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const currentQuestion = ONBOARDING_QUESTIONS[currentStep]
  const progress = ((currentStep + 1) / ONBOARDING_QUESTIONS.length) * 100

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/signup')
    }
  }, [status, router])

  const handleNext = () => {
    let answerValue: string | number | boolean = currentAnswer

    // For multi-select, join selected values
    if (currentQuestion.type === 'multi') {
      answerValue = Array.from(multiSelectValues).join(',')
    }

    // Validate answer
    if (
      currentQuestion.type !== 'toggle' &&
      (answerValue === '' || answerValue === undefined)
    ) {
      setError('Please provide an answer')
      return
    }

    // Save answer
    const newAnswers = [
      ...answers.filter((a) => a.questionId !== currentQuestion.id),
      {
        questionId: currentQuestion.id,
        value: answerValue,
      },
    ]
    setAnswers(newAnswers)

    // Move to next question or submit
    if (currentStep < ONBOARDING_QUESTIONS.length - 1) {
      setCurrentStep(currentStep + 1)
      setCurrentAnswer('')
      setMultiSelectValues(new Set())
      setError('')
    } else {
      submitAnswers(newAnswers)
    }
  }

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
      // Load previous answer
      const prevAnswer = answers.find(
        (a) => a.questionId === ONBOARDING_QUESTIONS[currentStep - 1].id
      )
      if (prevAnswer) {
        setCurrentAnswer(prevAnswer.value)
      }
      setError('')
    }
  }

  const handleMultiSelect = (value: string) => {
    const newSet = new Set(multiSelectValues)
    if (newSet.has(value)) {
      newSet.delete(value)
    } else {
      newSet.add(value)
    }
    setMultiSelectValues(newSet)
  }

  const submitAnswers = async (finalAnswers: Answer[]) => {
    setLoading(true)
    setError('')

    try {
      const response = await fetch('/api/profile/onboarding', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ answers: finalAnswers }),
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error || 'Failed to save profile')
      }

      router.push('/app')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong')
      setLoading(false)
    }
  }

  if (status === 'loading') {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-lg text-gray-600">Loading...</div>
      </div>
    )
  }

  if (!session) {
    return null
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-12 px-4">
      <div className="mx-auto max-w-2xl">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="mb-2 flex items-center justify-between text-sm">
            <span className="font-medium text-gray-700">
              Question {currentStep + 1} of {ONBOARDING_QUESTIONS.length}
            </span>
            <span className="text-gray-500">{Math.round(progress)}% complete</span>
          </div>
          <div className="h-2 w-full overflow-hidden rounded-full bg-gray-200">
            <div
              className="h-full bg-blue-600 transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Question Card */}
        <div className="rounded-2xl border bg-white p-8 shadow-lg">
          <h2 className="mb-2 text-2xl font-bold text-gray-900">
            {currentQuestion.title}
          </h2>
          {currentQuestion.description && (
            <p className="mb-6 text-gray-600">{currentQuestion.description}</p>
          )}

          {error && (
            <div className="mb-4 rounded-lg bg-red-50 p-3 text-sm text-red-600">
              {error}
            </div>
          )}

          {/* Question Input */}
          <div className="mb-8">
            {currentQuestion.type === 'single' && (
              <div className="space-y-3">
                {currentQuestion.options?.map((option) => (
                  <label
                    key={option.value}
                    className="flex cursor-pointer items-center gap-3 rounded-lg border p-4 transition-colors hover:bg-gray-50"
                  >
                    <input
                      type="radio"
                      name="answer"
                      value={option.value}
                      checked={currentAnswer === option.value}
                      onChange={(e) => setCurrentAnswer(e.target.value)}
                      className="h-4 w-4 text-blue-600"
                    />
                    <span className="font-medium text-gray-900">{option.label}</span>
                  </label>
                ))}
              </div>
            )}

            {currentQuestion.type === 'multi' && (
              <div className="space-y-3">
                {currentQuestion.options?.map((option) => (
                  <label
                    key={option.value}
                    className="flex cursor-pointer items-center gap-3 rounded-lg border p-4 transition-colors hover:bg-gray-50"
                  >
                    <input
                      type="checkbox"
                      checked={multiSelectValues.has(option.value)}
                      onChange={() => handleMultiSelect(option.value)}
                      className="h-4 w-4 rounded text-blue-600"
                    />
                    <span className="font-medium text-gray-900">{option.label}</span>
                  </label>
                ))}
              </div>
            )}

            {currentQuestion.type === 'scale' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between gap-4">
                  {Array.from({ length: 5 }, (_, i) => i + 1).map((value) => (
                    <button
                      key={value}
                      type="button"
                      onClick={() => setCurrentAnswer(value)}
                      className={`flex h-16 w-16 items-center justify-center rounded-lg border-2 text-2xl font-bold transition-colors ${
                        currentAnswer === value
                          ? 'border-blue-600 bg-blue-600 text-white'
                          : 'border-gray-300 text-gray-600 hover:border-blue-300'
                      }`}
                    >
                      {value}
                    </button>
                  ))}
                </div>
                <div className="flex justify-between text-sm text-gray-600">
                  <span>{currentQuestion.min}</span>
                  <span>{currentQuestion.max}</span>
                </div>
              </div>
            )}

            {currentQuestion.type === 'toggle' && (
              <div className="flex items-center gap-3">
                <label className="relative inline-flex cursor-pointer items-center">
                  <input
                    type="checkbox"
                    checked={currentAnswer === true}
                    onChange={(e) => setCurrentAnswer(e.target.checked)}
                    className="peer sr-only"
                  />
                  <div className="peer h-6 w-11 rounded-full bg-gray-200 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-blue-600 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300" />
                </label>
                <span className="text-lg font-medium text-gray-900">
                  {currentAnswer ? 'Yes' : 'No'}
                </span>
              </div>
            )}
          </div>

          {/* Navigation Buttons */}
          <div className="flex gap-4">
            <button
              type="button"
              onClick={handleBack}
              disabled={currentStep === 0 || loading}
              className="rounded-lg border border-gray-300 px-6 py-3 font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50"
            >
              Back
            </button>
            <button
              type="button"
              onClick={handleNext}
              disabled={loading}
              className="flex-1 rounded-lg bg-blue-600 px-6 py-3 font-medium text-white hover:bg-blue-700 disabled:opacity-50"
            >
              {loading
                ? 'Saving...'
                : currentStep === ONBOARDING_QUESTIONS.length - 1
                ? 'Complete'
                : 'Next'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
