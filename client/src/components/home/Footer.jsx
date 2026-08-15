import React from 'react'
import {
  ArrowUpRight,
  Github,
  Instagram,
  Linkedin,
  Mail,
} from 'lucide-react'
import { Link } from 'react-router-dom'

const Footer = () => {
  const scrollToSection = (id) => {
    const element = document.getElementById(id)

    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      })
    }
  }

  return (
    <footer className="border-t border-slate-200 bg-slate-50">

      {/* Main Footer */}
      <div className="mx-auto max-w-7xl px-6 py-16 sm:px-10 lg:px-16">

        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4">

          {/* Brand */}
          <div className="lg:col-span-1">

            <Link
              to="/"
              className="inline-flex items-center"
              aria-label="Resume Builder home"
            >
              <img
                src="/logo.svg"
                alt="Resume Builder"
                className="h-10 w-auto"
              />
            </Link>

            <p className="mt-5 max-w-xs text-sm leading-6 text-slate-500">
              Build professional, job-ready resumes with AI assistance,
              modern templates, and simple tools designed to help you
              stand out.
            </p>

            <Link
              to="/app?state=register"
              className="group mt-6 inline-flex items-center gap-2 text-sm font-medium text-green-600 transition-colors hover:text-green-700"
            >
              Create your resume
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>

          </div>

          {/* Product */}
          <div>
            <h3 className="text-sm font-semibold text-slate-900">
              Product
            </h3>

            <ul className="mt-5 space-y-3 text-sm">

              <li>
                <Link
                  to="/"
                  className="text-slate-500 transition-colors hover:text-green-600"
                >
                  Home
                </Link>
              </li>

              <li>
                <button
                  type="button"
                  onClick={() => scrollToSection('features')}
                  className="text-slate-500 transition-colors hover:text-green-600"
                >
                  Features
                </button>
              </li>

              <li>
                <button
                  type="button"
                  onClick={() => scrollToSection('testimonials')}
                  className="text-slate-500 transition-colors hover:text-green-600"
                >
                  Testimonials
                </button>
              </li>

              <li>
                <Link
                  to="/app?state=register"
                  className="text-slate-500 transition-colors hover:text-green-600"
                >
                  Create Resume
                </Link>
              </li>

              <li>
                <Link
                  to="/app?state=login"
                  className="text-slate-500 transition-colors hover:text-green-600"
                >
                  Login
                </Link>
              </li>

            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-sm font-semibold text-slate-900">
              Resources
            </h3>

            <ul className="mt-5 space-y-3 text-sm">

              <li>
                <Link
                  to="/app"
                  className="text-slate-500 transition-colors hover:text-green-600"
                >
                  Dashboard
                </Link>
              </li>

              <li>
                <button
                  type="button"
                  onClick={() => scrollToSection('cta')}
                  className="text-slate-500 transition-colors hover:text-green-600"
                >
                  Get Started
                </button>
              </li>

              <li>
                <a
                  href="mailto:pandeyrishi275@gmail.com"
                  className="text-slate-500 transition-colors hover:text-green-600"
                >
                  Support
                </a>
              </li>

              <li>
                <a
                  href="mailto:pandeyrishi275@gmail.com"
                  className="text-slate-500 transition-colors hover:text-green-600"
                >
                  Contact
                </a>
              </li>

            </ul>
          </div>

          {/* Connect */}
          <div>
            <h3 className="text-sm font-semibold text-slate-900">
              Connect
            </h3>

            <p className="mt-5 max-w-xs text-sm leading-6 text-slate-500">
              Have feedback or need help? Feel free to get in touch.
            </p>

            {/* Email */}
            <a
              href="mailto:pandeyrishi275@gmail.com"
              className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-slate-700 transition-colors hover:text-green-600"
            >
              <Mail className="h-4 w-4" />
              pandeyrishi275@gmail.com
            </a>

            {/* Social Links */}
            <div className="mt-6 flex items-center gap-3">

              {/* GitHub */}
              <a
                href="https://github.com/rishipandey1703"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-500 transition-all hover:border-green-200 hover:bg-green-50 hover:text-green-600"
              >
                <Github className="h-4 w-4" />
              </a>

              {/* LinkedIn */}
              <a
                href="https://www.linkedin.com/in/rishi-pandey-stu/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-500 transition-all hover:border-green-200 hover:bg-green-50 hover:text-green-600"
              >
                <Linkedin className="h-4 w-4" />
              </a>

              {/* Instagram */}
              <a
                href="https://www.instagram.com/i.m.rishi45/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-500 transition-all hover:border-green-200 hover:bg-green-50 hover:text-green-600"
              >
                <Instagram className="h-4 w-4" />
              </a>

            </div>

          </div>

        </div>

        {/* Bottom Section */}
        <div className="mt-14 flex flex-col gap-4 border-t border-slate-200 pt-6 sm:flex-row sm:items-center sm:justify-between">

          <p className="text-xs text-slate-400">
            © {new Date().getFullYear()} Resume Builder. All rights reserved.
          </p>

          <div className="flex items-center gap-5 text-xs">

            <button
              type="button"
              className="text-slate-400 transition-colors hover:text-slate-600"
            >
              Privacy
            </button>

            <button
              type="button"
              className="text-slate-400 transition-colors hover:text-slate-600"
            >
              Terms
            </button>

          </div>

        </div>

      </div>

    </footer>
  )
}

export default Footer
