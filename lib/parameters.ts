/**
 * AIRA Parameter Definitions
 * 70+ binary parameters (0 or 1) organized by groups
 */

export type ParamId = string
export type ParamValue = 0 | 1

export interface Parameter {
  id: ParamId
  label: string
  group: ParamGroup
  description?: string
}

export type ParamGroup =
  | 'Personality'
  | 'Tone'
  | 'Style'
  | 'Structure'
  | 'Punctuation'
  | 'Formality'
  | 'Audience'
  | 'Content'
  | 'Productivity'
  | 'Accessibility'
  | 'Formatting'

export type ParamProfile = Record<ParamId, ParamValue>

// Complete parameter definitions (70+)
export const PARAMETERS: Parameter[] = [
  // Personality (12)
  { id: 'P_assertive', label: 'Assertive voice', group: 'Personality', description: 'Use strong, confident assertions' },
  { id: 'P_supportive', label: 'Supportive/empathetic', group: 'Personality', description: 'Show understanding and empathy' },
  { id: 'P_confident', label: 'Confident modality', group: 'Personality', description: 'Express certainty and conviction' },
  { id: 'P_cautious', label: 'Cautious hedging', group: 'Personality', description: 'Use hedging language (may, might, possibly)' },
  { id: 'P_humorous', label: 'Light humor allowed', group: 'Personality', description: 'Include appropriate humor' },
  { id: 'P_serious', label: 'Serious tone bias', group: 'Personality', description: 'Maintain serious, professional tone' },
  { id: 'P_direct', label: 'Direct/brief', group: 'Personality', description: 'Get straight to the point' },
  { id: 'P_diplomatic', label: 'Diplomatic/softened', group: 'Personality', description: 'Use tactful, gentle language' },
  { id: 'P_enthusiastic', label: 'Enthusiastic energy', group: 'Personality', description: 'Show excitement and energy' },
  { id: 'P_calm', label: 'Calm/neutral energy', group: 'Personality', description: 'Maintain measured, neutral tone' },
  { id: 'P_persuasive', label: 'Persuasive intent', group: 'Personality', description: 'Aim to convince or influence' },
  { id: 'P_informative', label: 'Informative intent', group: 'Personality', description: 'Focus on educating and informing' },

  // Tone (10)
  { id: 'T_formal', label: 'Formal tone', group: 'Tone', description: 'Professional, polished language' },
  { id: 'T_casual', label: 'Casual tone', group: 'Tone', description: 'Relaxed, conversational language' },
  { id: 'T_friendly', label: 'Friendly tone', group: 'Tone', description: 'Warm, approachable language' },
  { id: 'T_academic', label: 'Academic tone', group: 'Tone', description: 'Scholarly, precise language' },
  { id: 'T_marketing', label: 'Marketing voice', group: 'Tone', description: 'Promotional, engaging language' },
  { id: 'T_technical', label: 'Technical tone', group: 'Tone', description: 'Precise, specialized terminology' },
  { id: 'T_concise', label: 'Ultra concise', group: 'Tone', description: 'Maximum brevity' },
  { id: 'T_expansive', label: 'Expansive/elaborative', group: 'Tone', description: 'Detailed, thorough explanations' },
  { id: 'T_confidential', label: 'Avoid claims; cautious', group: 'Tone', description: 'Minimize definitive statements' },
  { id: 'T_inclusive', label: 'Inclusive language', group: 'Tone', description: 'Gender-neutral, accessible language' },

  // Style (12)
  { id: 'S_active', label: 'Active voice', group: 'Style', description: 'Prefer active voice constructions' },
  { id: 'S_passive', label: 'Passive voice tolerance', group: 'Style', description: 'Allow passive voice' },
  { id: 'S_story', label: 'Storytelling allowed', group: 'Style', description: 'Use narrative techniques' },
  { id: 'S_bullets', label: 'Bullet preference', group: 'Style', description: 'Use bullet points for lists' },
  { id: 'S_numbered', label: 'Numbered lists', group: 'Style', description: 'Use numbered lists for sequences' },
  { id: 'S_headers', label: 'Use headers', group: 'Style', description: 'Break content with headers' },
  { id: 'S_examples', label: 'Use examples', group: 'Style', description: 'Include concrete examples' },
  { id: 'S_analogies', label: 'Use analogies', group: 'Style', description: 'Explain via comparisons' },
  { id: 'S_jargon', label: 'Use domain jargon', group: 'Style', description: 'Include technical terminology' },
  { id: 'S_define_terms', label: 'Define terms', group: 'Style', description: 'Explain specialized vocabulary' },
  { id: 'S_data_points', label: 'Cite data points', group: 'Style', description: 'Include statistics and data' },
  { id: 'S_citations', label: 'Include citations placeholder', group: 'Style', description: 'Add [CITATION NEEDED] markers' },

  // Structure (10)
  { id: 'R_intro', label: 'Intro paragraph', group: 'Structure', description: 'Start with introduction' },
  { id: 'R_summary', label: 'TL;DR summary', group: 'Structure', description: 'Include executive summary' },
  { id: 'R_conclusion', label: 'Conclusion/CTA', group: 'Structure', description: 'End with call to action' },
  { id: 'R_problem_solution', label: 'Problem→Solution frame', group: 'Structure', description: 'Use problem-solution structure' },
  { id: 'R_compare_contrast', label: 'Compare/contrast', group: 'Structure', description: 'Show comparisons' },
  { id: 'R_steps', label: 'Step-by-step', group: 'Structure', description: 'Sequential instructions' },
  { id: 'R_questions', label: 'Rhetorical questions', group: 'Structure', description: 'Use questions to engage' },
  { id: 'R_quotes', label: 'Quotations allowed', group: 'Structure', description: 'Include relevant quotes' },
  { id: 'R_tables', label: 'Use tables', group: 'Structure', description: 'Organize data in tables' },
  { id: 'R_checklists', label: 'Use checklists', group: 'Structure', description: 'Create actionable checklists' },

  // Punctuation & Rhythm (8)
  { id: 'U_em_dashes', label: 'Em dashes', group: 'Punctuation', description: 'Use em dashes (—) for breaks' },
  { id: 'U_oxford_comma', label: 'Oxford comma', group: 'Punctuation', description: 'Use serial comma' },
  { id: 'U_exclamation', label: 'Exclamation usage', group: 'Punctuation', description: 'Allow exclamation points' },
  { id: 'U_emoji', label: 'Emoji allowed', group: 'Punctuation', description: 'Include emoji' },
  { id: 'U_parentheses', label: 'Parentheses allowed', group: 'Punctuation', description: 'Use parenthetical asides' },
  { id: 'U_colons', label: 'Colons/semicolons', group: 'Punctuation', description: 'Use complex punctuation' },
  { id: 'U_short_sentences', label: 'Short sentences bias', group: 'Punctuation', description: 'Prefer shorter sentences' },
  { id: 'U_varied_length', label: 'Varied sentence length', group: 'Punctuation', description: 'Mix sentence lengths' },

  // Audience (6)
  { id: 'A_expert', label: 'Audience: experts', group: 'Audience', description: 'Target domain experts' },
  { id: 'A_exec', label: 'Audience: executives', group: 'Audience', description: 'Target business leaders' },
  { id: 'A_student', label: 'Audience: students', group: 'Audience', description: 'Target learners' },
  { id: 'A_public', label: 'Audience: general public', group: 'Audience', description: 'Target general readers' },
  { id: 'A_non_native', label: 'Audience: non-native English', group: 'Audience', description: 'Simplify for ESL readers' },
  { id: 'A_sales', label: 'Audience: buyers', group: 'Audience', description: 'Target potential customers' },

  // Content Safety/Filters (6)
  { id: 'C_sensitive', label: 'Avoid sensitive topics', group: 'Content', description: 'Skip controversial subjects' },
  { id: 'C_no_medical', label: 'No medical claims', group: 'Content', description: 'Avoid health advice' },
  { id: 'C_no_legal', label: 'No legal advice', group: 'Content', description: 'Avoid legal guidance' },
  { id: 'C_no_financial', label: 'No financial advice', group: 'Content', description: 'Avoid investment guidance' },
  { id: 'C_brand_safe', label: 'Brand-safe language', group: 'Content', description: 'Avoid controversial language' },
  { id: 'C_factcheck', label: 'Flag unverifiable claims', group: 'Content', description: 'Mark uncertain facts' },

  // Productivity (5)
  { id: 'X_templates', label: 'Offer templates', group: 'Productivity', description: 'Provide reusable formats' },
  { id: 'X_headings', label: 'Auto headings', group: 'Productivity', description: 'Generate section headings' },
  { id: 'X_outline', label: 'Create outline', group: 'Productivity', description: 'Start with outline' },
  { id: 'X_variants', label: 'Return 3 variants', group: 'Productivity', description: 'Generate multiple versions' },
  { id: 'X_summarize', label: 'Always give summary', group: 'Productivity', description: 'Include brief summary' },

  // Accessibility & Formatting (7)
  { id: 'F_plain_language', label: 'Plain language bias', group: 'Formatting', description: 'Use simple words' },
  { id: 'F_alt_text', label: 'Prompt for alt text', group: 'Formatting', description: 'Request image descriptions' },
  { id: 'F_reading_grade8', label: 'Grade ≤ 8', group: 'Formatting', description: 'Target 8th grade reading level' },
  { id: 'F_title_case', label: 'Title Case headings', group: 'Formatting', description: 'Capitalize headings' },
  { id: 'F_snake_case', label: 'snake_case allowed', group: 'Formatting', description: 'Use underscores' },
  { id: 'F_code_blocks', label: 'Code blocks allowed', group: 'Formatting', description: 'Include code examples' },
  { id: 'F_markdown', label: 'Use Markdown', group: 'Formatting', description: 'Format with Markdown' },
]

// Default profile (mostly neutral with a few sensible defaults)
export const DEFAULT_PROFILE: ParamProfile = PARAMETERS.reduce((acc, param) => {
  // Start with all 0
  acc[param.id] = 0
  return acc
}, {} as ParamProfile)

// Set sensible defaults per spec
DEFAULT_PROFILE.S_active = 1
DEFAULT_PROFILE.T_inclusive = 1
DEFAULT_PROFILE.F_plain_language = 1

// Get parameters by group
export function getParametersByGroup(group: ParamGroup): Parameter[] {
  return PARAMETERS.filter(p => p.group === group)
}

// Get all groups
export function getAllGroups(): ParamGroup[] {
  return Array.from(new Set(PARAMETERS.map(p => p.group)))
}

// Validate profile has all parameters
export function validateProfile(profile: Partial<ParamProfile>): boolean {
  return PARAMETERS.every(param => {
    const value = profile[param.id]
    return value === 0 || value === 1
  })
}

// Fill missing parameters with 0
export function fillMissingParams(profile: Partial<ParamProfile>): ParamProfile {
  const complete: ParamProfile = { ...DEFAULT_PROFILE }
  for (const [key, value] of Object.entries(profile)) {
    if (value === 0 || value === 1) {
      complete[key] = value
    }
  }
  return complete
}
