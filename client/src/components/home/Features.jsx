import React from 'react'
import {
  Sparkles,
  FileText,
  WandSparkles,
  LayoutTemplate,
  Download,
  BriefcaseBusiness,
  CheckCircle2,
} from 'lucide-react'
import Title from './Title'

const Features = () => {
  const features = [
    {
      icon: Sparkles,
      title: 'AI-assisted writing',
      description:
        'Generate professional resume content with AI assistance for summaries, experience and job-specific improvements.',
      iconClass: 'text-violet-600',
      bgClass: 'bg-violet-50',
      borderClass: 'border-violet-200',
    },
    {
      icon: BriefcaseBusiness,
      title: 'Job description matching',
      description:
        'Use a job description to identify important skills and improve your resume for the role you are targeting.',
      iconClass: 'text-blue-600',
      bgClass: 'bg-blue-50',
      borderClass: 'border-blue-200',
    },
    {
      icon: LayoutTemplate,
      title: 'Professional templates',
      description:
        'Choose from clean and modern resume templates designed to present your experience clearly.',
      iconClass: 'text-green-600',
      bgClass: 'bg-green-50',
      borderClass: 'border-green-200',
    },
    {
      icon: FileText,
      title: 'Easy resume editing',
      description:
        'Add and update your personal information, education, experience, projects and skills from one place.',
      iconClass: 'text-orange-600',
      bgClass: 'bg-orange-50',
      borderClass: 'border-orange-200',
    },
    {
      icon: Download,
      title: 'Professional PDF export',
      description:
        'Preview your resume and download a polished PDF that is ready to share with recruiters and employers.',
      iconClass: 'text-pink-600',
      bgClass: 'bg-pink-50',
      borderClass: 'border-pink-200',
    },
    {
      icon: WandSparkles,
      title: 'Create resumes faster',
      description:
        'Build and manage your resume efficiently with a streamlined workflow designed to save time.',
      iconClass: 'text-indigo-600',
      bgClass: 'bg-indigo-50',
      borderClass: 'border-indigo-200',
    },
  ]

  return (
    <section
      id="features"
      className="relative overflow-hidden bg-white py-20 sm:py-24 scroll-mt-12"
    >
      {/* Background decoration */}
      <div className="absolute left-1/2 top-40 -z-0 h-72 w-72 -translate-x-1/2 rounded-full bg-green-100/50 blur-3xl" />

      <div className="relative z-10 mx-auto max-w-7xl px-6 md:px-10 lg:px-16">

        {/* Section heading */}
        <div className="flex flex-col items-center text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-green-200 bg-green-50 px-5 py-2 text-sm font-medium text-green-700">
            <Sparkles className="h-4 w-4" />
            <span>Powerful resume tools</span>
          </div>

          <Title
            title="Everything you need to build a better resume"
            description="Create a professional, job-ready resume with AI assistance, modern templates, easy editing and fast PDF export."
          />
        </div>

        {/* Main feature area */}
        <div className="mt-14 grid items-center gap-12 lg:grid-cols-[0.9fr_1.1fr]">

          {/* Left visual */}
          <div className="relative mx-auto w-full max-w-lg">
            <div className="absolute -left-6 top-10 h-40 w-40 rounded-full bg-green-200/40 blur-3xl" />
            <div className="absolute -right-6 bottom-10 h-40 w-40 rounded-full bg-blue-200/30 blur-3xl" />

            <div className="relative overflow-hidden rounded-3xl border border-slate-200 bg-slate-50 p-4 shadow-xl shadow-slate-200/50">

              {/* Browser header */}
              <div className="flex items-center gap-2 rounded-t-2xl border border-slate-200 bg-white px-4 py-3">
                <span className="h-2.5 w-2.5 rounded-full bg-red-300" />
                <span className="h-2.5 w-2.5 rounded-full bg-yellow-300" />
                <span className="h-2.5 w-2.5 rounded-full bg-green-300" />

                <div className="ml-4 h-7 flex-1 rounded-full border border-slate-200 bg-slate-50" />
              </div>

              {/* Resume preview mockup */}
              <div className="grid min-h-[390px] grid-cols-[34%_66%] overflow-hidden rounded-b-2xl border-x border-b border-slate-200 bg-white">

                {/* Resume sidebar */}
                <div className="bg-slate-50 p-5">
                  <div className="mx-auto mb-5 h-16 w-16 rounded-full bg-green-100" />

                  <div className="mb-6 space-y-2">
                    <div className="h-2.5 w-20 rounded-full bg-slate-300" />
                    <div className="h-2 w-24 rounded-full bg-slate-200" />
                    <div className="h-2 w-16 rounded-full bg-slate-200" />
                  </div>

                  <div className="space-y-4">
                    <div>
                      <div className="mb-2 h-2 w-16 rounded-full bg-green-300" />
                      <div className="space-y-1.5">
                        <div className="h-1.5 w-full rounded-full bg-slate-200" />
                        <div className="h-1.5 w-5/6 rounded-full bg-slate-200" />
                        <div className="h-1.5 w-4/6 rounded-full bg-slate-200" />
                      </div>
                    </div>

                    <div>
                      <div className="mb-2 h-2 w-14 rounded-full bg-green-300" />
                      <div className="space-y-1.5">
                        <div className="h-1.5 w-full rounded-full bg-slate-200" />
                        <div className="h-1.5 w-4/5 rounded-full bg-slate-200" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Resume content */}
                <div className="p-7">
                  <div className="mb-7">
                    <div className="h-5 w-40 rounded bg-slate-700" />
                    <div className="mt-2 h-2.5 w-28 rounded bg-green-300" />
                    <div className="mt-4 h-1.5 w-full rounded-full bg-slate-200" />
                    <div className="mt-2 h-1.5 w-11/12 rounded-full bg-slate-200" />
                  </div>

                  <div className="space-y-7">
                    <div>
                      <div className="mb-3 flex items-center gap-2">
                        <div className="h-2.5 w-24 rounded-full bg-slate-400" />
                        <div className="h-px flex-1 bg-slate-200" />
                      </div>

                      <div className="space-y-2">
                        <div className="h-2 w-3/4 rounded-full bg-slate-200" />
                        <div className="h-2 w-full rounded-full bg-slate-200" />
                        <div className="h-2 w-5/6 rounded-full bg-slate-200" />
                      </div>
                    </div>

                    <div>
                      <div className="mb-3 flex items-center gap-2">
                        <div className="h-2.5 w-20 rounded-full bg-slate-400" />
                        <div className="h-px flex-1 bg-slate-200" />
                      </div>

                      <div className="space-y-2">
                        <div className="h-2 w-full rounded-full bg-slate-200" />
                        <div className="h-2 w-10/12 rounded-full bg-slate-200" />
                        <div className="h-2 w-4/5 rounded-full bg-slate-200" />
                      </div>
                    </div>

                    <div>
                      <div className="mb-3 flex items-center gap-2">
                        <div className="h-2.5 w-16 rounded-full bg-slate-400" />
                        <div className="h-px flex-1 bg-slate-200" />
                      </div>

                      <div className="flex gap-2">
                        <span className="h-6 w-16 rounded-full bg-green-50" />
                        <span className="h-6 w-20 rounded-full bg-green-50" />
                        <span className="h-6 w-14 rounded-full bg-green-50" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* AI badge */}
              <div className="absolute -right-4 top-24 hidden rounded-2xl border border-green-200 bg-white p-4 shadow-lg sm:block">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-50">
                    <Sparkles className="h-5 w-5 text-green-600" />
                  </div>

                  <div>
                    <p className="text-sm font-semibold text-slate-800">
                      AI Assistance
                    </p>
                    <p className="text-xs text-slate-500">
                      Improve your content
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Feature cards */}
          <div className="grid gap-4 sm:grid-cols-2">
            {features.map((feature, index) => {
              const Icon = feature.icon

              return (
                <div
                  key={index}
                  className={`group rounded-2xl border ${feature.borderClass} bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-slate-200/60`}
                >
                  <div
                    className={`mb-5 flex h-11 w-11 items-center justify-center rounded-xl ${feature.bgClass}`}
                  >
                    <Icon className={`h-5 w-5 ${feature.iconClass}`} />
                  </div>

                  <h3 className="text-base font-semibold text-slate-800">
                    {feature.title}
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-slate-500">
                    {feature.description}
                  </p>
                </div>
              )
            })}
          </div>
        </div>

        {/* Bottom highlights */}
        <div className="mt-14 flex flex-wrap items-center justify-center gap-x-8 gap-y-4 border-t border-slate-100 pt-8">
          {[
            'AI-assisted writing',
            'Modern templates',
            'Easy editing',
            'PDF export',
          ].map((item) => (
            <div
              key={item}
              className="flex items-center gap-2 text-sm text-slate-600"
            >
              <CheckCircle2 className="h-4 w-4 text-green-500" />
              <span>{item}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Features
