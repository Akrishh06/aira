import Link from 'next/link'

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <div className="text-2xl font-bold text-blue-600">AIRA</div>
          <nav className="flex items-center gap-4">
            <Link
              href="/signup"
              className="rounded-lg px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100"
            >
              Sign In
            </Link>
            <Link
              href="/signup"
              className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
            >
              Get Started
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <h1 className="mb-6 text-5xl font-bold tracking-tight text-gray-900 md:text-6xl">
          AIRA — Your Voice,
          <br />
          <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Supercharged
          </span>
        </h1>
        <p className="mx-auto mb-8 max-w-2xl text-xl text-gray-600">
          A privacy-first writing assistant that learns your unique style and transforms
          any text to match your voice perfectly.
        </p>
        <Link
          href="/signup"
          className="inline-flex items-center rounded-lg bg-blue-600 px-8 py-4 text-lg font-semibold text-white hover:bg-blue-700"
        >
          Get Started Free
        </Link>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-20">
        <h2 className="mb-12 text-center text-3xl font-bold text-gray-900">
          Everything you need to write like you
        </h2>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          <FeatureCard
            title="Personalized Profile"
            description="70+ parameters capture every nuance of your writing style"
            icon="👤"
          />
          <FeatureCard
            title="Rewrite to Your Voice"
            description="Transform any text to match your unique style instantly"
            icon="✨"
          />
          <FeatureCard
            title="Version History"
            description="Track all your rewrites and iterate with confidence"
            icon="📚"
          />
          <FeatureCard
            title="Export & Share"
            description="Download your profile and use it anywhere"
            icon="📤"
          />
        </div>
      </section>

      {/* How It Works */}
      <section className="container mx-auto px-4 py-20">
        <h2 className="mb-12 text-center text-3xl font-bold text-gray-900">
          How it works
        </h2>
        <div className="mx-auto max-w-4xl space-y-8">
          <Step
            number="1"
            title="Complete Your Profile"
            description="Answer a few quick questions about your writing style and preferences"
          />
          <Step
            number="2"
            title="Review Your Parameters"
            description="See your personalized profile of 70+ style parameters (all 0 or 1)"
          />
          <Step
            number="3"
            title="Rewrite Anything"
            description="Paste any text and watch it transform to match your voice perfectly"
          />
        </div>
      </section>

      {/* CTA Section */}
      <section className="border-y bg-blue-600 py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="mb-4 text-4xl font-bold text-white">
            Ready to supercharge your writing?
          </h2>
          <p className="mb-8 text-xl text-blue-100">
            Join AIRA today and discover your perfect writing voice.
          </p>
          <Link
            href="/signup"
            className="inline-flex items-center rounded-lg bg-white px-8 py-4 text-lg font-semibold text-blue-600 hover:bg-gray-100"
          >
            Get Started Free
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-gray-50 py-8">
        <div className="container mx-auto px-4 text-center text-sm text-gray-600">
          © 2024 AIRA. Privacy-first writing assistant.
        </div>
      </footer>
    </div>
  )
}

function FeatureCard({
  title,
  description,
  icon,
}: {
  title: string
  description: string
  icon: string
}) {
  return (
    <div className="rounded-xl border bg-white p-6 shadow-sm transition-shadow hover:shadow-md">
      <div className="mb-3 text-4xl">{icon}</div>
      <h3 className="mb-2 text-xl font-semibold text-gray-900">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  )
}

function Step({
  number,
  title,
  description,
}: {
  number: string
  title: string
  description: string
}) {
  return (
    <div className="flex gap-6">
      <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-blue-600 text-xl font-bold text-white">
        {number}
      </div>
      <div>
        <h3 className="mb-2 text-xl font-semibold text-gray-900">{title}</h3>
        <p className="text-gray-600">{description}</p>
      </div>
    </div>
  )
}
