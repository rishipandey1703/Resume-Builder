import React from 'react'
import Title from './Title'
import {
  Sparkles,
  Target,
  FileCheck2,
  LayoutTemplate,
  Download,
  BriefcaseBusiness,
  CheckCircle2,
} from 'lucide-react'

const Testimonial = () => {
  const cardsData = [
    {
      icon: Sparkles,
      title: 'Write better with AI',
      description:
        'Get help creating professional summaries and improving your resume content without starting from scratch.',
      color: 'violet',
      label: 'AI assistance',
    },
    {
      icon: Target,
      title: 'Target the right job',
      description:
        'Use a job description to understand what skills and keywords matter for the position you want.',
      color: 'blue',
      label: 'Job matching',
    },
    {
      icon: FileCheck2,
      title: 'Keep your resume professional',
      description:
        'Organize your education, experience, projects and skills in a clean, structured format.',
      color: 'green',
      label: 'Professional structure',
    },
    {
      icon: LayoutTemplate,
      title: 'Choose your style',
      description:
        'Select a modern template and customize the look of your resume to match your professional profile.',
      color: 'orange',
      label: 'Modern templates',
    },
    {
      icon: Download,
      title: 'Ready to download',
      description:
        'Preview your completed resume and export it as a professional PDF when you are ready to apply.',
      color: 'pink',
      label: 'PDF export',
    },
    {
      icon: BriefcaseBusiness,
      title: 'Built for job seekers',
      description:
        'Create resumes for internships, placements, job applications and different career opportunities.',
      color: 'indigo',
      label: 'Career ready',
    },
  ]

  const colorStyles = {
    violet: {
      icon: 'bg-violet-50 text-violet-600',
      border: 'border-violet-100',
      badge: 'bg-violet-50 text-violet-700',
    },
    blue: {
      icon: 'bg-blue-50 text-blue-600',
      border: 'border-blue-100',
      badge: 'bg-blue-50 text-blue-700',
    },
    green: {
      icon: 'bg-green-50 text-green-600',
      border: 'border-green-100',
      badge: 'bg-green-50 text-green-700',
    },
    orange: {
      icon: 'bg-orange-50 text-orange-600',
      border: 'border-orange-100',
      badge: 'bg-orange-50 text-orange-700',
    },
    pink: {
      icon: 'bg-pink-50 text-pink-600',
      border: 'border-pink-100',
      badge: 'bg-pink-50 text-pink-700',
    },
    indigo: {
      icon: 'bg-indigo-50 text-indigo-600',
      border: 'border-indigo-100',
      badge: 'bg-indigo-50 text-indigo-700',
    },
  }

  const CreateCard = ({ card }) => {
    const Icon = card.icon
    const styles = colorStyles[card.color]

    return (
      <div
        className={`
          group mx-3 w-[300px] shrink-0 rounded-2xl border
          ${styles.border}
          bg-white p-6
          shadow-sm
          transition-all duration-300
          hover:-translate-y-1 hover:shadow-lg hover:shadow-slate-200/60
        `}
      >
        {/* Icon */}
        <div className="flex items-start justify-between">
          <div
            className={`flex h-11 w-11 items-center justify-center rounded-xl ${styles.icon}`}
          >
            <Icon className="h-5 w-5" />
          </div>

          <span
            className={`rounded-full px-3 py-1 text-[11px] font-medium ${styles.badge}`}
          >
            {card.label}
          </span>
        </div>

        {/* Content */}
        <div className="mt-6">
          <h3 className="text-base font-semibold text-slate-800">
            {card.title}
          </h3>

          <p className="mt-2 text-sm leading-6 text-slate-500">
            {card.description}
          </p>
        </div>

        {/* Bottom indicator */}
        <div className="mt-5 flex items-center gap-2 text-xs font-medium text-green-600">
          <CheckCircle2 className="h-4 w-4" />
          <span>Designed for your job search</span>
        </div>
      </div>
    )
  }

  return (
    <section
      id="testimonials"
      className="relative overflow-hidden bg-white py-20 sm:py-24 scroll-mt-12"
    >
      {/* Background decoration */}
      <div className="absolute left-1/2 top-32 -z-0 h-72 w-72 -translate-x-1/2 rounded-full bg-green-100/40 blur-3xl" />

      {/* Heading */}
      <div className="relative z-10 mx-auto flex max-w-4xl flex-col items-center px-6 text-center">
        <div className="inline-flex items-center gap-2 rounded-full border border-green-200 bg-green-50 px-5 py-2 text-sm font-medium text-green-700">
          <Sparkles className="h-4 w-4" />
          <span>Built for your job search</span>
        </div>

        <Title
          title="Everything you need to move closer to your next opportunity"
          description="From AI-assisted writing to professional templates and PDF export, build a resume that clearly presents your skills and experience."
        />
      </div>

      {/* First scrolling row */}
      <div className="relative z-10 mt-12 w-full overflow-hidden">
        <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-20 bg-gradient-to-r from-white to-transparent md:w-32" />

        <div className="marquee-inner flex w-max">
          {[...cardsData, ...cardsData].map((card, index) => (
            <CreateCard
              key={`row-one-${index}`}
              card={card}
            />
          ))}
        </div>

        <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-20 bg-gradient-to-l from-white to-transparent md:w-32" />
      </div>

      {/* Second scrolling row */}
      <div className="relative z-10 mt-2 w-full overflow-hidden">
        <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-20 bg-gradient-to-r from-white to-transparent md:w-32" />

        <div className="marquee-inner marquee-reverse flex w-max">
          {[...cardsData.slice().reverse(), ...cardsData.slice().reverse()].map(
            (card, index) => (
              <CreateCard
                key={`row-two-${index}`}
                card={card}
              />
            )
          )}
        </div>

        <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-20 bg-gradient-to-l from-white to-transparent md:w-32" />
      </div>

      {/* Bottom statement */}
      <div className="relative z-10 mx-auto mt-12 flex max-w-3xl items-center justify-center px-6">
        <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-sm text-slate-500">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 text-green-500" />
            <span>Professional formatting</span>
          </div>

          <div className="flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 text-green-500" />
            <span>AI-powered assistance</span>
          </div>

          <div className="flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 text-green-500" />
            <span>Application-ready PDF</span>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes resumeBuilderMarquee {
          0% {
            transform: translateX(0);
          }

          100% {
            transform: translateX(-50%);
          }
        }

        .marquee-inner {
          animation: resumeBuilderMarquee 32s linear infinite;
        }

        .marquee-reverse {
          animation-direction: reverse;
        }

        .marquee-inner:hover {
          animation-play-state: paused;
        }

        @media (prefers-reduced-motion: reduce) {
          .marquee-inner {
            animation: none;
          }
        }
      `}</style>
    </section>
  )
}

export default Testimonial
