import React from 'react'
import { ArrowRight, Sparkles, CheckCircle2 } from 'lucide-react'
import { Link } from 'react-router-dom'

const CallToAction = () => {
  return (
    <section
      id="cta"
      className="relative w-full overflow-hidden bg-white py-24 sm:py-28 scroll-mt-12"
    >
      {/* Background glow */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 -z-0 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-green-100/50 blur-3xl" />

      {/* Main container */}
      <div className="relative z-10 mx-auto max-w-5xl px-6">
        <div className="relative overflow-hidden rounded-3xl border border-green-100 bg-gradient-to-br from-green-50 via-white to-green-50/40 px-6 py-14 shadow-sm sm:px-12 sm:py-16">

          {/* Decorative elements */}
          <div className="pointer-events-none absolute -right-20 -top-20 h-48 w-48 rounded-full bg-green-200/30 blur-3xl" />

          <div className="pointer-events-none absolute -bottom-24 -left-20 h-52 w-52 rounded-full bg-green-100/40 blur-3xl" />

          {/* Content */}
          <div className="relative flex flex-col items-center text-center">

            {/* Badge */}
            <div className="inline-flex items-center gap-2 rounded-full border border-green-200 bg-white px-5 py-2 text-sm font-medium text-green-700 shadow-sm">
              <Sparkles className="h-4 w-4" />
              <span>Ready to build your resume?</span>
            </div>

            {/* Heading */}
            <h2 className="mt-6 max-w-3xl text-3xl font-semibold leading-tight tracking-tight text-slate-900 sm:text-4xl md:text-5xl">
              Build a resume that helps you{' '}
              <span className="bg-gradient-to-r from-green-700 to-green-500 bg-clip-text text-transparent">
                stand out.
              </span>
            </h2>

            {/* Description */}
            <p className="mt-5 max-w-2xl text-sm leading-7 text-slate-600 sm:text-base">
              Create a professional, job-ready resume with AI assistance,
              modern templates, easy editing, and instant PDF export.
            </p>

            {/* CTA */}
            <div className="mt-8">
              <Link
                to="/app?state=register"
                className="group inline-flex h-12 items-center gap-2 rounded-full bg-green-600 px-8 font-medium text-white shadow-sm ring-1 ring-green-500 transition-all duration-200 hover:bg-green-700 hover:shadow-lg hover:shadow-green-200 active:scale-95"
              >
                <span>Create your resume</span>

                <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
              </Link>
            </div>

            {/* Supporting points */}
            <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-xs text-slate-500 sm:text-sm">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-green-500" />
                <span>AI-assisted writing</span>
              </div>

              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-green-500" />
                <span>Professional templates</span>
              </div>

              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-green-500" />
                <span>PDF export</span>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  )
}

export default CallToAction
