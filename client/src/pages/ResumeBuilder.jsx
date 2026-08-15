import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import {
  ArrowLeft,
  Briefcase,
  ChevronLeft,
  ChevronRight,
  Download,
  Eye,
  EyeOff,
  FileText,
  Folder,
  GraduationCap,
  Save,
  Share2,
  Sparkles,
  User,
  CheckCircle2,
  Loader2
} from 'lucide-react'

import PersonalInfoForm from '../components/PersonalInfoForm'
import ResumePreview from '../components/ResumePreview'
import TemplateSelector from '../components/TemplateSelector'
import ColorPicker from '../components/ColorPicker'
import ProfessionalSummaryForm from '../components/ProfessionalSummaryForm'
import ExperienceForm from '../components/ExperienceForm'
import EducationForm from '../components/EducationForm'
import ProjectForm from '../components/ProjectForm'
import SkillsForm from '../components/SkillsForm'

import { useSelector } from 'react-redux'
import api from '../configs/api'
import toast from 'react-hot-toast'


const ResumeBuilder = () => {

  const { resumeId } = useParams()
  const { token } = useSelector(state => state.auth)

  const [resumeData, setResumeData] = useState({
    _id: '',
    title: '',
    personal_info: {},
    professional_summary: '',
    experience: [],
    education: [],
    project: [],
    skills: [],
    template: 'classic',
    accent_color: '#3B82F6',
    public: false
  })

  const [activeSectionIndex, setActiveSectionIndex] = useState(0)
  const [removeBackground, setRemoveBackground] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [isChangingVisibility, setIsChangingVisibility] = useState(false)


  const sections = [
    {
      id: 'personal',
      name: 'Personal Info',
      shortName: 'Personal',
      icon: User
    },
    {
      id: 'summary',
      name: 'Professional Summary',
      shortName: 'Summary',
      icon: FileText
    },
    {
      id: 'experience',
      name: 'Experience',
      shortName: 'Experience',
      icon: Briefcase
    },
    {
      id: 'education',
      name: 'Education',
      shortName: 'Education',
      icon: GraduationCap
    },
    {
      id: 'projects',
      name: 'Projects',
      shortName: 'Projects',
      icon: Folder
    },
    {
      id: 'skills',
      name: 'Skills',
      shortName: 'Skills',
      icon: Sparkles
    }
  ]


  const activeSection = sections[activeSectionIndex]


  const loadExistingResume = async () => {

    try {

      setIsLoading(true)

      const { data } = await api.get(
        '/api/resumes/get/' + resumeId,
        {
          headers: {
            Authorization: token
          }
        }
      )

      if (data.resume) {

        setResumeData(data.resume)

        if (data.resume.title) {
          document.title = `${data.resume.title} | Resume Builder`
        }

      }

    } catch (error) {

      console.error('Error loading resume:', error)

      toast.error(
        error.response?.data?.message ||
        'Failed to load resume'
      )

    } finally {

      setIsLoading(false)

    }
  }


  useEffect(() => {

    if (resumeId && token) {
      loadExistingResume()
    }

  }, [resumeId, token])


  const updateResumeData = (key, value) => {

    setResumeData(prev => ({
      ...prev,
      [key]: value
    }))

  }


  const goToNextSection = () => {

    setActiveSectionIndex(prevIndex =>
      Math.min(
        prevIndex + 1,
        sections.length - 1
      )
    )

  }


  const goToPreviousSection = () => {

    setActiveSectionIndex(prevIndex =>
      Math.max(
        prevIndex - 1,
        0
      )
    )

  }


  const changeResumeVisibility = async () => {

    if (isChangingVisibility) return

    try {

      setIsChangingVisibility(true)

      const formData = new FormData()

      formData.append('resumeId', resumeId)

      formData.append(
        'resumeData',
        JSON.stringify({
          public: !resumeData.public
        })
      )

      const { data } = await api.put(
        '/api/resumes/update',
        formData,
        {
          headers: {
            Authorization: token
          }
        }
      )

      setResumeData(data.resume)

      toast.success(
        data.message ||
        `Resume is now ${data.resume?.public ? 'public' : 'private'}`
      )

    } catch (error) {

      console.error(
        'Error changing resume visibility:',
        error
      )

      toast.error(
        error.response?.data?.message ||
        'Failed to change resume visibility'
      )

    } finally {

      setIsChangingVisibility(false)

    }
  }


  const handleShare = async () => {

    const frontendUrl =
      window.location.href.split('/app/')[0]

    const resumeUrl =
      `${frontendUrl}/view/${resumeId}`


    try {

      if (navigator.share) {

        await navigator.share({
          title: resumeData.title || 'My Resume',
          text: 'Check out my resume',
          url: resumeUrl
        })

      } else {

        await navigator.clipboard.writeText(resumeUrl)

        toast.success('Resume link copied to clipboard')

      }

    } catch (error) {

      if (error.name !== 'AbortError') {

        try {

          await navigator.clipboard.writeText(resumeUrl)

          toast.success('Resume link copied to clipboard')

        } catch {

          toast.error('Unable to share resume link')

        }

      }

    }
  }


  const downloadResume = () => {

    window.print()

  }


  const saveResume = async () => {

    if (isSaving) return

    try {

      setIsSaving(true)

      let updatedResumeData =
        structuredClone(resumeData)


      /*
       * Browser File objects cannot be stored
       * inside the resume JSON.
       */
      if (
        updatedResumeData.personal_info &&
        typeof updatedResumeData.personal_info.image === 'object'
      ) {

        delete updatedResumeData.personal_info.image

      }


      const formData = new FormData()

      formData.append(
        'resumeId',
        resumeId
      )

      formData.append(
        'resumeData',
        JSON.stringify(updatedResumeData)
      )


      formData.append(
        'removeBackground',
        removeBackground
          ? 'true'
          : 'false'
      )


      /*
       * Only send an image when the user
       * selected a new browser File.
       */
      if (
        resumeData.personal_info &&
        typeof resumeData.personal_info.image === 'object'
      ) {

        formData.append(
          'image',
          resumeData.personal_info.image
        )

      }


      const { data } = await api.put(
        '/api/resumes/update',
        formData,
        {
          headers: {
            Authorization: token
          }
        }
      )


      setResumeData(data.resume)

      setRemoveBackground(false)

      return data

    } catch (error) {

      console.error(
        'Error saving resume:',
        error
      )

      throw error

    } finally {

      setIsSaving(false)

    }

  }


  const handleSave = async () => {

    if (isSaving) return

    try {

      await toast.promise(
        saveResume(),
        {
          loading: 'Saving resume...',
          success: 'Resume saved successfully!',
          error: 'Failed to save resume'
        }
      )

    } catch (error) {

      console.error(error)

    }

  }


  if (isLoading) {

    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">

        <div className="flex flex-col items-center gap-4">

          <div className="size-12 rounded-2xl bg-green-100 flex items-center justify-center">

            <Loader2 className="size-6 text-green-600 animate-spin" />

          </div>

          <div className="text-center">

            <p className="font-semibold text-slate-800">
              Loading your resume
            </p>

            <p className="text-sm text-slate-500 mt-1">
              Preparing your workspace...
            </p>

          </div>

        </div>

      </div>
    )

  }


  return (

    <div className="min-h-screen bg-slate-50">

      {/* TOP HEADER */}

      <div className="sticky top-0 z-40 bg-white/95 backdrop-blur border-b border-slate-200">

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="h-16 flex items-center justify-between gap-4">

            <Link
              to="/app"
              className="inline-flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-slate-900 transition"
            >

              <ArrowLeft className="size-4" />

              <span className="hidden sm:inline">
                Dashboard
              </span>

            </Link>


            <div className="flex-1 min-w-0 text-center">

              <p className="text-xs text-slate-400 uppercase tracking-wider">
                Resume Workspace
              </p>

              <h1 className="font-semibold text-slate-900 truncate max-w-[280px] sm:max-w-md mx-auto">
                {resumeData.title || 'Untitled Resume'}
              </h1>

            </div>


            <div className="flex items-center gap-2">

              <button
                onClick={handleSave}
                disabled={isSaving}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-green-600 hover:bg-green-700 disabled:opacity-60 disabled:cursor-not-allowed text-white text-sm font-medium transition shadow-sm"
              >

                {isSaving ? (
                  <Loader2 className="size-4 animate-spin" />
                ) : (
                  <Save className="size-4" />
                )}

                <span className="hidden sm:inline">
                  {isSaving ? 'Saving...' : 'Save'}
                </span>

              </button>

            </div>

          </div>

        </div>

      </div>


      {/* MAIN CONTENT */}

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">

        <div className="grid lg:grid-cols-12 gap-6 xl:gap-8">


          {/* LEFT EDITOR */}

          <section className="lg:col-span-5 xl:col-span-5">

            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">


              {/* EDITOR HEADER */}

              <div className="px-5 pt-5 pb-4 border-b border-slate-100">

                <div className="flex items-center justify-between gap-3 mb-4">

                  <div>

                    <p className="text-xs font-medium uppercase tracking-wider text-green-600">
                      Resume Builder
                    </p>

                    <h2 className="text-lg font-semibold text-slate-900 mt-1">
                      Build your resume
                    </h2>

                  </div>


                  <div className="flex items-center gap-2">

                    <TemplateSelector
                      selectedTemplate={resumeData.template}
                      onChange={(template) =>
                        updateResumeData(
                          'template',
                          template
                        )
                      }
                    />

                    <ColorPicker
                      selectedColor={resumeData.accent_color}
                      onChange={(color) =>
                        updateResumeData(
                          'accent_color',
                          color
                        )
                      }
                    />

                  </div>

                </div>


                {/* PROGRESS */}

                <div className="flex items-center justify-between text-xs mb-2">

                  <span className="font-medium text-slate-600">
                    Section {activeSectionIndex + 1} of {sections.length}
                  </span>

                  <span className="text-slate-400">
                    {Math.round(
                      ((activeSectionIndex + 1) /
                        sections.length) *
                      100
                    )}% complete
                  </span>

                </div>


                <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">

                  <div
                    className="h-full bg-gradient-to-r from-green-500 to-green-600 rounded-full transition-all duration-500"
                    style={{
                      width: `${
                        ((activeSectionIndex + 1) /
                          sections.length) *
                        100
                      }%`
                    }}
                  />

                </div>

              </div>


              {/* SECTION NAVIGATION */}

              <div className="px-4 py-3 border-b border-slate-100 overflow-x-auto">

                <div className="flex gap-1 min-w-max">

                  {sections.map((section, index) => {

                    const Icon = section.icon

                    const isActive =
                      index === activeSectionIndex

                    const isCompleted =
                      index < activeSectionIndex

                    return (

                      <button
                        key={section.id}
                        type="button"
                        onClick={() =>
                          setActiveSectionIndex(index)
                        }
                        className={`
                          relative flex items-center gap-2
                          px-3 py-2 rounded-xl
                          text-xs font-medium
                          transition-all
                          ${
                            isActive
                              ? 'bg-green-50 text-green-700 ring-1 ring-green-200'
                              : 'text-slate-500 hover:text-slate-800 hover:bg-slate-50'
                          }
                        `}
                      >

                        {isCompleted ? (
                          <CheckCircle2 className="size-4 text-green-500" />
                        ) : (
                          <Icon className="size-4" />
                        )}

                        <span>
                          {section.shortName}
                        </span>

                      </button>

                    )

                  })}

                </div>

              </div>


              {/* FORM */}

              <div className="p-5">

                <div className="mb-5">

                  <div className="flex items-center gap-3">

                    <div className="size-10 rounded-xl bg-green-50 flex items-center justify-center">

                      {React.createElement(
                        activeSection.icon,
                        {
                          className:
                            'size-5 text-green-600'
                        }
                      )}

                    </div>

                    <div>

                      <h3 className="font-semibold text-slate-900">
                        {activeSection.name}
                      </h3>

                      <p className="text-xs text-slate-500 mt-0.5">
                        Add information to your resume
                      </p>

                    </div>

                  </div>

                </div>


                <div className="space-y-6">

                  {activeSection.id === 'personal' && (

                    <PersonalInfoForm
                      data={resumeData.personal_info}
                      onChange={(data) =>
                        updateResumeData(
                          'personal_info',
                          data
                        )
                      }
                      removeBackground={removeBackground}
                      setRemoveBackground={
                        setRemoveBackground
                      }
                    />

                  )}


                  {activeSection.id === 'summary' && (

                    <ProfessionalSummaryForm
                      data={
                        resumeData.professional_summary
                      }
                      onChange={(data) =>
                        updateResumeData(
                          'professional_summary',
                          data
                        )
                      }
                      setResumeData={setResumeData}
                    />

                  )}


                  {activeSection.id === 'experience' && (

                    <ExperienceForm
                      data={resumeData.experience}
                      onChange={(data) =>
                        updateResumeData(
                          'experience',
                          data
                        )
                      }
                    />

                  )}


                  {activeSection.id === 'education' && (

                    <EducationForm
                      data={resumeData.education}
                      onChange={(data) =>
                        updateResumeData(
                          'education',
                          data
                        )
                      }
                    />

                  )}


                  {activeSection.id === 'projects' && (

                    <ProjectForm
                      data={resumeData.project}
                      onChange={(data) =>
                        updateResumeData(
                          'project',
                          data
                        )
                      }
                    />

                  )}


                  {activeSection.id === 'skills' && (

                    <SkillsForm
                      data={resumeData.skills}
                      onChange={(data) =>
                        updateResumeData(
                          'skills',
                          data
                        )
                      }
                    />

                  )}

                </div>


                {/* NAVIGATION */}

                <div className="mt-7 pt-5 border-t border-slate-100 flex items-center justify-between gap-3">

                  <button
                    type="button"
                    onClick={goToPreviousSection}
                    disabled={activeSectionIndex === 0}
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-slate-200 text-sm font-medium text-slate-600 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition"
                  >

                    <ChevronLeft className="size-4" />

                    Previous

                  </button>


                  <button
                    type="button"
                    onClick={handleSave}
                    disabled={isSaving}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-green-600 hover:bg-green-700 text-white text-sm font-medium disabled:opacity-60 transition shadow-sm"
                  >

                    {isSaving ? (
                      <Loader2 className="size-4 animate-spin" />
                    ) : (
                      <Save className="size-4" />
                    )}

                    {isSaving
                      ? 'Saving...'
                      : 'Save Changes'}

                  </button>


                  <button
                    type="button"
                    onClick={goToNextSection}
                    disabled={
                      activeSectionIndex ===
                      sections.length - 1
                    }
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-sm font-medium disabled:opacity-40 disabled:cursor-not-allowed transition"
                  >

                    Next

                    <ChevronRight className="size-4" />

                  </button>

                </div>

              </div>

            </div>

          </section>


          {/* RIGHT PREVIEW */}

          <section className="lg:col-span-7 xl:col-span-7">

            <div className="lg:sticky lg:top-24">

              {/* PREVIEW TOOLBAR */}

              <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-3 mb-4">

                <div className="flex flex-wrap items-center justify-between gap-3">

                  <div>

                    <p className="text-sm font-semibold text-slate-800">
                      Live Preview
                    </p>

                    <p className="text-xs text-slate-500 mt-0.5">
                      Changes appear here automatically
                    </p>

                  </div>


                  <div className="flex items-center gap-2">

                    {resumeData.public && (

                      <button
                        type="button"
                        onClick={handleShare}
                        className="inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-blue-50 text-blue-700 hover:bg-blue-100 text-xs font-medium transition"
                      >

                        <Share2 className="size-4" />

                        <span className="hidden sm:inline">
                          Share
                        </span>

                      </button>

                    )}


                    <button
                      type="button"
                      onClick={changeResumeVisibility}
                      disabled={isChangingVisibility}
                      className={`
                        inline-flex items-center gap-2
                        px-3 py-2 rounded-xl
                        text-xs font-medium
                        transition
                        disabled:opacity-60
                        ${
                          resumeData.public
                            ? 'bg-green-50 text-green-700 hover:bg-green-100'
                            : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                        }
                      `}
                    >

                      {isChangingVisibility ? (
                        <Loader2 className="size-4 animate-spin" />
                      ) : resumeData.public ? (
                        <Eye className="size-4" />
                      ) : (
                        <EyeOff className="size-4" />
                      )}

                      {resumeData.public
                        ? 'Public'
                        : 'Private'}

                    </button>


                    <button
                      type="button"
                      onClick={downloadResume}
                      className="inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-green-600 hover:bg-green-700 text-white text-xs font-medium transition shadow-sm"
                    >

                      <Download className="size-4" />

                      <span className="hidden sm:inline">
                        Download
                      </span>

                    </button>

                  </div>

                </div>

              </div>


              {/* RESUME PAPER */}

              <div className="bg-slate-200/70 rounded-2xl border border-slate-200 p-3 sm:p-5 overflow-auto">

                <div className="min-w-0">

                  <ResumePreview
                    data={resumeData}
                    template={resumeData.template}
                    accentColor={
                      resumeData.accent_color
                    }
                  />

                </div>

              </div>


              {/* PREVIEW FOOTER */}

              <div className="flex items-center justify-center gap-2 mt-3 text-xs text-slate-400">

                <Eye className="size-3.5" />

                <span>
                  Preview updates as you edit
                </span>

              </div>

            </div>

          </section>

        </div>

      </main>


      {/* PRINT STYLES */}

      <style>{`

        @media print {

          body {
            background: white !important;
          }

          body * {
            visibility: hidden;
          }

          .resume-preview,
          .resume-preview * {
            visibility: visible;
          }

          .resume-preview {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
          }

        }

      `}</style>

    </div>
  )
}


export default ResumeBuilder
