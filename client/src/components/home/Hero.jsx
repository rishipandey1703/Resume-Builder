import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import {
    ArrowRight,
    CheckCircle2,
    FileText,
    Menu,
    Sparkles,
    X
} from 'lucide-react'

const Hero = () => {

    const { user } = useSelector(state => state.auth)

    const [menuOpen, setMenuOpen] = React.useState(false)

    const primaryAction = user
        ? '/app'
        : '/app?state=register'

    const primaryActionText = user
        ? 'Go to Dashboard'
        : 'Create your Resume'

    const closeMenu = () => {
        setMenuOpen(false)
    }

    return (
        <>
            <div className="min-h-screen bg-white">

                {/* Navigation */}
                <nav className="relative z-50 flex items-center justify-between w-full py-4 px-5 sm:px-6 md:px-16 lg:px-24 xl:px-40 text-sm">

                    {/* Logo */}
                    <Link
                        to="/"
                        className="flex items-center gap-2"
                        aria-label="Resume Builder Home"
                    >
                        <img
                            src="/logo.svg"
                            alt="Resume Builder"
                            className="h-10 sm:h-11 w-auto"
                        />
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center gap-8 text-slate-700">

                        <a
                            href="#home"
                            className="hover:text-green-600 transition-colors"
                        >
                            Home
                        </a>

                        <a
                            href="#features"
                            className="hover:text-green-600 transition-colors"
                        >
                            Features
                        </a>

                        <a
                            href="#testimonials"
                            className="hover:text-green-600 transition-colors"
                        >
                            Testimonials
                        </a>

                        <a
                            href="#cta"
                            className="hover:text-green-600 transition-colors"
                        >
                            Get Started
                        </a>

                    </div>

                    {/* Desktop Actions */}
                    <div className="hidden md:flex items-center gap-2">

                        {!user ? (
                            <>
                                <Link
                                    to="/app?state=login"
                                    className="px-5 py-2 border border-slate-300 hover:bg-slate-50 rounded-full text-slate-700 hover:text-slate-900 transition-all"
                                >
                                    Login
                                </Link>

                                <Link
                                    to="/app?state=register"
                                    className="px-6 py-2 bg-green-500 hover:bg-green-600 active:scale-95 rounded-full text-white transition-all"
                                >
                                    Get Started
                                </Link>
                            </>
                        ) : (
                            <Link
                                to="/app"
                                className="px-6 py-2 bg-green-500 hover:bg-green-600 active:scale-95 rounded-full text-white transition-all"
                            >
                                Dashboard
                            </Link>
                        )}

                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        type="button"
                        onClick={() => setMenuOpen(true)}
                        className="md:hidden p-2 text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
                        aria-label="Open menu"
                        aria-expanded={menuOpen}
                    >
                        <Menu className="size-6" />
                    </button>

                </nav>

                {/* Mobile Navigation */}
                <div
                    className={`
                        fixed inset-0 z-[100] bg-slate-950/80 backdrop-blur-sm
                        md:hidden transition-all duration-300
                        ${menuOpen
                            ? 'opacity-100 visible'
                            : 'opacity-0 invisible pointer-events-none'
                        }
                    `}
                    onClick={closeMenu}
                >

                    <div
                        className={`
                            absolute right-0 top-0 h-full w-[85%] max-w-sm
                            bg-white shadow-2xl p-7
                            transition-transform duration-300
                            ${menuOpen
                                ? 'translate-x-0'
                                : 'translate-x-full'
                            }
                        `}
                        onClick={e => e.stopPropagation()}
                    >

                        <div className="flex items-center justify-between">

                            <Link
                                to="/"
                                onClick={closeMenu}
                            >
                                <img
                                    src="/logo.svg"
                                    alt="Resume Builder"
                                    className="h-9 w-auto"
                                />
                            </Link>

                            <button
                                type="button"
                                onClick={closeMenu}
                                className="p-2 rounded-lg hover:bg-slate-100 text-slate-600"
                                aria-label="Close menu"
                            >
                                <X className="size-5" />
                            </button>

                        </div>

                        <div className="flex flex-col gap-6 mt-12">

                            <a
                                href="#home"
                                onClick={closeMenu}
                                className="text-lg font-medium text-slate-700 hover:text-green-600"
                            >
                                Home
                            </a>

                            <a
                                href="#features"
                                onClick={closeMenu}
                                className="text-lg font-medium text-slate-700 hover:text-green-600"
                            >
                                Features
                            </a>

                            <a
                                href="#testimonials"
                                onClick={closeMenu}
                                className="text-lg font-medium text-slate-700 hover:text-green-600"
                            >
                                Testimonials
                            </a>

                            <a
                                href="#cta"
                                onClick={closeMenu}
                                className="text-lg font-medium text-slate-700 hover:text-green-600"
                            >
                                Get Started
                            </a>

                        </div>

                        <div className="absolute bottom-8 left-7 right-7">

                            {!user ? (
                                <div className="flex flex-col gap-3">

                                    <Link
                                        to="/app?state=login"
                                        onClick={closeMenu}
                                        className="w-full py-3 text-center border border-slate-300 rounded-full text-slate-700"
                                    >
                                        Login
                                    </Link>

                                    <Link
                                        to="/app?state=register"
                                        onClick={closeMenu}
                                        className="w-full py-3 text-center bg-green-500 hover:bg-green-600 text-white rounded-full"
                                    >
                                        Create Resume
                                    </Link>

                                </div>
                            ) : (
                                <Link
                                    to="/app"
                                    onClick={closeMenu}
                                    className="block w-full py-3 text-center bg-green-500 hover:bg-green-600 text-white rounded-full"
                                >
                                    Go to Dashboard
                                </Link>
                            )}

                        </div>

                    </div>

                </div>

                {/* Hero Section */}
                <section
                    id="home"
                    className="relative overflow-hidden flex flex-col items-center justify-center px-5 sm:px-6 md:px-16 lg:px-24 xl:px-40 pt-20 sm:pt-24 pb-24"
                >

                    {/* Background Glow */}
                    <div className="absolute top-20 left-1/2 -translate-x-1/2 -z-10 w-72 h-72 sm:w-96 sm:h-96 bg-green-300 blur-[110px] opacity-25 rounded-full" />

                    {/* AI Badge */}
                    <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-green-50 border border-green-100 text-green-700 text-xs sm:text-sm font-medium">

                        <Sparkles className="size-4" />

                        AI-powered resume creation

                    </div>

                    {/* Main Heading */}
                    <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold max-w-5xl text-center mt-7 leading-tight md:leading-[1.1] tracking-tight text-slate-900">

                        Build a resume that gets you
                        <span className="block bg-gradient-to-r from-green-700 to-green-500 bg-clip-text text-transparent">
                            noticed.
                        </span>

                    </h1>

                    {/* Description */}
                    <p className="max-w-2xl text-center text-base sm:text-lg text-slate-600 mt-6 leading-relaxed">

                        Create professional, ATS-friendly resumes with
                        AI-powered assistance, modern templates, and
                        instant PDF export.

                    </p>

                    {/* CTA Buttons */}
                    <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 mt-8">

                        <Link
                            to={primaryAction}
                            className="w-full sm:w-auto bg-green-500 hover:bg-green-600 text-white rounded-full px-8 sm:px-9 h-12 flex items-center justify-center gap-2 ring-offset-2 ring-1 ring-green-400 transition-all active:scale-95 font-medium"
                        >

                            {primaryActionText}

                            <ArrowRight className="size-4" />

                        </Link>

                        <a
                            href="#features"
                            className="w-full sm:w-auto flex items-center justify-center gap-2 border border-slate-300 hover:border-green-400 hover:bg-green-50 transition-all rounded-full px-7 h-12 text-slate-700 font-medium"
                        >

                            <FileText className="size-4" />

                            Explore Features

                        </a>

                    </div>

                    {/* Trust / Benefits */}
                    <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3 mt-12 text-sm text-slate-500">

                        <div className="flex items-center gap-1.5">
                            <CheckCircle2 className="size-4 text-green-500" />
                            AI-assisted writing
                        </div>

                        <div className="flex items-center gap-1.5">
                            <CheckCircle2 className="size-4 text-green-500" />
                            Professional templates
                        </div>

                        <div className="flex items-center gap-1.5">
                            <CheckCircle2 className="size-4 text-green-500" />
                            PDF export
                        </div>

                    </div>

                    {/* Product Preview */}
                    <div className="relative mt-16 w-full max-w-5xl">

                        <div className="absolute inset-0 bg-green-200/30 blur-3xl -z-10 rounded-full" />

                        <div className="bg-white border border-slate-200 rounded-2xl shadow-2xl overflow-hidden">

                            {/* Fake browser header */}
                            <div className="h-10 bg-slate-50 border-b border-slate-200 flex items-center px-4 gap-1.5">

                                <span className="size-2.5 rounded-full bg-red-300" />
                                <span className="size-2.5 rounded-full bg-yellow-300" />
                                <span className="size-2.5 rounded-full bg-green-300" />

                                <div className="ml-4 h-5 flex-1 max-w-md mx-auto bg-white border border-slate-200 rounded-md" />

                            </div>

                            {/* Resume preview mockup */}
                            <div className="grid grid-cols-1 sm:grid-cols-3 min-h-[280px] sm:min-h-[360px]">

                                <div className="hidden sm:block bg-slate-50 border-r border-slate-100 p-7">

                                    <div className="size-16 rounded-full bg-green-100 mb-6" />

                                    <div className="h-3 w-24 bg-slate-300 rounded mb-3" />

                                    <div className="h-2 w-32 bg-slate-200 rounded mb-7" />

                                    <div className="h-2 w-full bg-slate-200 rounded mb-2" />
                                    <div className="h-2 w-5/6 bg-slate-200 rounded mb-2" />
                                    <div className="h-2 w-4/6 bg-slate-200 rounded mb-8" />

                                    <div className="h-2 w-20 bg-green-300 rounded mb-3" />
                                    <div className="h-2 w-full bg-slate-200 rounded mb-2" />
                                    <div className="h-2 w-4/5 bg-slate-200 rounded" />

                                </div>

                                <div className="sm:col-span-2 p-7 sm:p-10">

                                    <div className="h-5 w-40 bg-slate-300 rounded mb-3" />
                                    <div className="h-2 w-56 bg-green-200 rounded mb-8" />

                                    <div className="h-2 w-24 bg-green-300 rounded mb-4" />

                                    <div className="space-y-2 mb-8">
                                        <div className="h-2 w-full bg-slate-200 rounded" />
                                        <div className="h-2 w-11/12 bg-slate-200 rounded" />
                                        <div className="h-2 w-4/5 bg-slate-200 rounded" />
                                    </div>

                                    <div className="h-2 w-28 bg-green-300 rounded mb-4" />

                                    <div className="space-y-2">
                                        <div className="h-2 w-full bg-slate-200 rounded" />
                                        <div className="h-2 w-10/12 bg-slate-200 rounded" />
                                        <div className="h-2 w-9/12 bg-slate-200 rounded" />
                                        <div className="h-2 w-11/12 bg-slate-200 rounded" />
                                    </div>

                                </div>

                            </div>

                        </div>

                    </div>

                </section>

            </div>

            {/* Font */}
            <style>
                {`
                    @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap');

                    body {
                        font-family: 'Poppins', sans-serif;
                    }
                `}
            </style>
        </>
    )
}

export default Hero
