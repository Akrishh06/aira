/**
 * AIRA Onboarding Questions and Parameter Mapping Logic
 */

import { ParamProfile, ParamValue, DEFAULT_PROFILE } from './parameters'

export type QuestionType = 'single' | 'multi' | 'scale' | 'toggle'

export interface Question {
  id: string
  type: QuestionType
  title: string
  description?: string
  options?: Option[]
  min?: number
  max?: number
}

export interface Option {
  value: string
  label: string
  sets: string // e.g., "T_formal=1,T_casual=0"
}

// 18+ onboarding questions
export const ONBOARDING_QUESTIONS: Question[] = [
  {
    id: 'q1',
    type: 'single',
    title: 'Pick your default tone',
    description: 'How formal should your writing be?',
    options: [
      { value: 'formal', label: 'Formal & Professional', sets: 'T_formal=1,T_casual=0' },
      { value: 'casual', label: 'Casual & Conversational', sets: 'T_casual=1,T_formal=0' },
    ],
  },
  {
    id: 'q2',
    type: 'multi',
    title: 'What are your primary writing goals?',
    description: 'Select all that apply',
    options: [
      { value: 'inform', label: 'Inform & Educate', sets: 'P_informative=1' },
      { value: 'persuade', label: 'Persuade & Influence', sets: 'P_persuasive=1' },
      { value: 'market', label: 'Market & Promote', sets: 'T_marketing=1' },
      { value: 'academic', label: 'Academic Writing', sets: 'T_academic=1' },
    ],
  },
  {
    id: 'q3',
    type: 'scale',
    title: 'How concise should your writing be?',
    description: '1 = Very detailed, 5 = Ultra concise',
    min: 1,
    max: 5,
  },
  {
    id: 'q4',
    type: 'single',
    title: 'Voice preference',
    description: 'Active vs passive voice',
    options: [
      { value: 'active', label: 'Prefer active voice', sets: 'S_active=1,S_passive=0' },
      { value: 'passive_ok', label: 'Passive voice is fine', sets: 'S_passive=1,S_active=0' },
    ],
  },
  {
    id: 'q5',
    type: 'toggle',
    title: 'Use bullets by default?',
    description: 'Format lists as bullet points',
  },
  {
    id: 'q6',
    type: 'toggle',
    title: 'Include a TL;DR?',
    description: 'Add an executive summary at the top',
  },
  {
    id: 'q7',
    type: 'toggle',
    title: 'Add examples?',
    description: 'Include concrete examples to illustrate points',
  },
  {
    id: 'q8',
    type: 'toggle',
    title: 'Define terms?',
    description: 'Explain specialized vocabulary',
  },
  {
    id: 'q9',
    type: 'toggle',
    title: 'Use tables when helpful?',
    description: 'Organize data in table format',
  },
  {
    id: 'q10',
    type: 'toggle',
    title: 'Use emoji?',
    description: 'Include emoji for emphasis and engagement',
  },
  {
    id: 'q11',
    type: 'toggle',
    title: 'Allow humor?',
    description: 'Use light, appropriate humor',
  },
  {
    id: 'q12',
    type: 'toggle',
    title: 'Prefer short sentences?',
    description: 'Keep sentences brief and punchy',
  },
  {
    id: 'q13',
    type: 'toggle',
    title: 'Include a concluding CTA?',
    description: 'End with a call to action',
  },
  {
    id: 'q14',
    type: 'single',
    title: 'Who is your primary audience?',
    options: [
      { value: 'experts', label: 'Domain Experts', sets: 'A_expert=1,S_jargon=1,S_define_terms=0' },
      { value: 'execs', label: 'Executives', sets: 'A_exec=1,T_concise=1' },
      { value: 'students', label: 'Students & Learners', sets: 'A_student=1,F_reading_grade8=1,S_define_terms=1' },
      { value: 'public', label: 'General Public', sets: 'A_public=1,F_plain_language=1,S_define_terms=1' },
    ],
  },
  {
    id: 'q15',
    type: 'toggle',
    title: 'Use inclusive language?',
    description: 'Gender-neutral, accessible terminology',
  },
  {
    id: 'q16',
    type: 'toggle',
    title: 'Enable brand-safe filter?',
    description: 'Avoid potentially controversial language',
  },
  {
    id: 'q17',
    type: 'toggle',
    title: 'Always include a summary?',
    description: 'Add a brief summary to every output',
  },
  {
    id: 'q18',
    type: 'toggle',
    title: 'Return 3 variants by default?',
    description: 'Generate multiple versions of rewrites',
  },
  {
    id: 'q19',
    type: 'single',
    title: 'What energy level fits your style?',
    options: [
      { value: 'enthusiastic', label: 'Enthusiastic & Energetic', sets: 'P_enthusiastic=1,P_calm=0' },
      { value: 'calm', label: 'Calm & Measured', sets: 'P_calm=1,P_enthusiastic=0' },
    ],
  },
  {
    id: 'q20',
    type: 'toggle',
    title: 'Use Markdown formatting?',
    description: 'Format output with Markdown syntax',
  },
]

export interface Answer {
  questionId: string
  value: string | number | boolean
}

// Map a single answer to parameter updates
function mapAnswerToParams(question: Question, answerValue: string | number | boolean): Partial<ParamProfile> {
  const updates: Partial<ParamProfile> = {}

  switch (question.type) {
    case 'single': {
      const option = question.options?.find(opt => opt.value === answerValue)
      if (option?.sets) {
        parseSetsString(option.sets, updates)
      }
      break
    }

    case 'multi': {
      // answerValue should be comma-separated values for multi-select
      const selectedValues = typeof answerValue === 'string' ? answerValue.split(',') : []
      selectedValues.forEach(val => {
        const option = question.options?.find(opt => opt.value === val.trim())
        if (option?.sets) {
          parseSetsString(option.sets, updates)
        }
      })
      break
    }

    case 'scale': {
      const numValue = typeof answerValue === 'number' ? answerValue : parseInt(String(answerValue))
      // Special logic for q3 (conciseness scale)
      if (question.id === 'q3') {
        if (numValue >= 4) {
          updates.T_concise = 1
          updates.T_expansive = 0
        } else if (numValue <= 2) {
          updates.T_expansive = 1
          updates.T_concise = 0
        }
      }
      break
    }

    case 'toggle': {
      const boolValue = answerValue === true || answerValue === 'true' || answerValue === 1
      const paramValue: ParamValue = boolValue ? 1 : 0

      // Map toggle questions to specific parameters
      const toggleMap: Record<string, string> = {
        q5: 'S_bullets',
        q6: 'R_summary',
        q7: 'S_examples',
        q8: 'S_define_terms',
        q9: 'R_tables',
        q10: 'U_emoji',
        q11: 'P_humorous',
        q12: 'U_short_sentences',
        q13: 'R_conclusion',
        q15: 'T_inclusive',
        q16: 'C_brand_safe',
        q17: 'X_summarize',
        q18: 'X_variants',
        q20: 'F_markdown',
      }

      const paramId = toggleMap[question.id]
      if (paramId) {
        updates[paramId] = paramValue
      }
      break
    }
  }

  return updates
}

// Parse a sets string like "T_formal=1,T_casual=0"
function parseSetsString(sets: string, updates: Partial<ParamProfile>): void {
  const assignments = sets.split(',')
  assignments.forEach(assignment => {
    const [paramId, valueStr] = assignment.trim().split('=')
    if (paramId && valueStr) {
      const value = parseInt(valueStr) as ParamValue
      if (value === 0 || value === 1) {
        updates[paramId.trim()] = value
      }
    }
  })
}

// Compute full profile from all answers
export function computeProfileFromAnswers(answers: Answer[]): {
  profile: ParamProfile
  scorecard: Record<string, string[]>
} {
  // Start with default profile
  const profile: ParamProfile = { ...DEFAULT_PROFILE }
  const scorecard: Record<string, string[]> = {}

  // Apply each answer
  answers.forEach(answer => {
    const question = ONBOARDING_QUESTIONS.find(q => q.id === answer.questionId)
    if (!question) return

    const updates = mapAnswerToParams(question, answer.value)

    // Track which questions affected which params
    Object.keys(updates).forEach(paramId => {
      if (!scorecard[paramId]) {
        scorecard[paramId] = []
      }
      scorecard[paramId].push(`${question.title} (${answer.value})`)
    })

    // Apply updates
    Object.assign(profile, updates)
  })

  // Handle conflicts (prefer latest answer)
  // Most conflicts are already handled by setting opposing params to 0
  // in the sets strings

  return { profile, scorecard }
}

// Validate all answers are provided
export function validateAnswers(answers: Answer[]): { valid: boolean; missing: string[] } {
  const answeredIds = new Set(answers.map(a => a.questionId))
  const missing = ONBOARDING_QUESTIONS.filter(q => !answeredIds.has(q.id)).map(q => q.id)

  return {
    valid: missing.length === 0,
    missing,
  }
}
