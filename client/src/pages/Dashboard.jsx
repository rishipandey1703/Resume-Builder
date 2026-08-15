import {
  FilePenLineIcon,
  LoaderCircleIcon,
  PencilIcon,
  PlusIcon,
  TrashIcon,
  UploadCloudIcon,
  XIcon,
  FileText,
  Sparkles,
  Clock3,
  MoreHorizontal,
  AlertTriangle,
  Search,
} from 'lucide-react'
import React, { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import api from '../configs/api'
import toast from 'react-hot-toast'
import pdfToText from 'react-pdftotext'

const Dashboard = () => {
  const { user, token } = useSelector((state) => state.auth)

  const [allResumes, setAllResumes] = useState([])

  const [showCreateResume, setShowCreateResume] = useState(false)
  const [showUploadResume, setShowUploadResume] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)

  const [title, setTitle] = useState('')
  const [resume, setResume] = useState(null)

  const [editResumeId, setEditResumeId] = useState('')
  const [deleteResumeId, setDeleteResumeId] = useState('')

  const [isLoading, setIsLoading] = useState(false)
  const [isLoadingResumes, setIsLoadingResumes] = useState(true)
  const [isDeleting, setIsDeleting] = useState(false)

  const [searchQuery, setSearchQuery] = useState('')

  const fileInputRef = useRef(null)

  const navigate = useNavigate()

  const colors = [
    '#16a34a',
    '#0284c7',
    '#7c3aed',
    '#d97706',
    '#dc2626',
  ]

  /* --------------------------------------------------
     Load all resumes
  -------------------------------------------------- */

  const loadAllResumes = async () => {
    if (!token) return

    setIsLoadingResumes(true)

    try {
      const { data } = await api.get('/api/users/resumes', {
        headers: {
          Authorization: token,
        },
      })

      setAllResumes(
        Array.isArray(data.resumes) ? data.resumes : []
      )
    } catch (error) {
      toast.error(
        error?.response?.data?.message ||
          error.message ||
          'Unable to load resumes'
      )
    } finally {
      setIsLoadingResumes(false)
    }
  }

  useEffect(() => {
    loadAllResumes()
  }, [token])

  /* --------------------------------------------------
     Keyboard handling
  -------------------------------------------------- */

  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key !== 'Escape') return

      if (isLoading || isDeleting) return

      if (showDeleteModal) {
        closeDeleteModal()
      } else if (showCreateResume) {
        closeCreateModal()
      } else if (showUploadResume) {
        closeUploadModal()
      } else if (editResumeId) {
        closeEditModal()
      }
    }

    window.addEventListener('keydown', handleEscape)

    return () => {
      window.removeEventListener('keydown', handleEscape)
    }
  }, [
    showDeleteModal,
    showCreateResume,
    showUploadResume,
    editResumeId,
    isLoading,
    isDeleting,
  ])

  /* --------------------------------------------------
     Modal helpers
  -------------------------------------------------- */

  const openCreateModal = () => {
    setTitle('')
    setShowCreateResume(true)
  }

  const closeCreateModal = () => {
    if (isLoading) return

    setShowCreateResume(false)
    setTitle('')
  }

  const openUploadModal = () => {
    setTitle('')
    setResume(null)
    setShowUploadResume(true)
  }

  const closeUploadModal = () => {
    if (isLoading) return

    setShowUploadResume(false)
    setTitle('')
    setResume(null)

    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  const closeEditModal = () => {
    if (isLoading) return

    setEditResumeId('')
    setTitle('')
  }

  const openDeleteModal = (resumeId) => {
    if (isDeleting) return

    setDeleteResumeId(resumeId)
    setShowDeleteModal(true)
  }

  const closeDeleteModal = () => {
    if (isDeleting) return

    setShowDeleteModal(false)
    setDeleteResumeId('')
  }

  /* --------------------------------------------------
     Create new resume
  -------------------------------------------------- */

  const createResume = async (event) => {
    event.preventDefault()

    if (isLoading) return

    const trimmedTitle = title.trim()

    if (!trimmedTitle) {
      toast.error('Please enter a resume title')
      return
    }

    try {
      setIsLoading(true)

      const { data } = await api.post(
        '/api/resumes/create',
        {
          title: trimmedTitle,
        },
        {
          headers: {
            Authorization: token,
          },
        }
      )

      setAllResumes((prev) => [...prev, data.resume])

      setTitle('')
      setShowCreateResume(false)

      toast.success('Resume created successfully')

      navigate(`/app/builder/${data.resume._id}`)
    } catch (error) {
      toast.error(
        error?.response?.data?.message ||
          error.message ||
          'Unable to create resume'
      )
    } finally {
      setIsLoading(false)
    }
  }

  /* --------------------------------------------------
     Upload existing PDF resume
  -------------------------------------------------- */

  const uploadResume = async (event) => {
    event.preventDefault()

    if (isLoading) return

    const trimmedTitle = title.trim()

    if (!trimmedTitle) {
      toast.error('Please enter a resume title')
      return
    }

    if (!resume) {
      toast.error('Please select a PDF resume')
      return
    }

    if (resume.type !== 'application/pdf') {
      toast.error('Only PDF files are supported')
      return
    }

    const maxFileSize = 5 * 1024 * 1024

    if (resume.size > maxFileSize) {
      toast.error('PDF size must be less than 5 MB')
      return
    }

    setIsLoading(true)

    try {
      toast.loading('Reading your PDF...', {
        id: 'resume-upload',
      })

      const resumeText = await pdfToText(resume)

      if (!resumeText || !resumeText.trim()) {
        throw new Error(
          'Could not extract readable text from this PDF. Please try another PDF.'
        )
      }

      toast.loading('AI is analyzing your resume...', {
        id: 'resume-upload',
      })

      const { data } = await api.post(
        '/api/ai/upload-resume',
        {
          title: trimmedTitle,
          resumeText,
        },
        {
          headers: {
            Authorization: token,
          },
        }
      )

      toast.success('Resume uploaded successfully', {
        id: 'resume-upload',
      })

      setTitle('')
      setResume(null)
      setShowUploadResume(false)

      if (fileInputRef.current) {
        fileInputRef.current.value = ''
      }

      navigate(`/app/builder/${data.resumeId}`)
    } catch (error) {
      toast.error(
        error?.response?.data?.message ||
          error.message ||
          'Unable to upload resume',
        {
          id: 'resume-upload',
        }
      )
    } finally {
      setIsLoading(false)
    }
  }

  /* --------------------------------------------------
     Edit resume title
  -------------------------------------------------- */

  const editTitle = async (event) => {
    event.preventDefault()

    if (isLoading) return

    const trimmedTitle = title.trim()

    if (!trimmedTitle) {
      toast.error('Please enter a resume title')
      return
    }

    try {
      setIsLoading(true)

      const { data } = await api.put(
        '/api/resumes/update',
        {
          resumeId: editResumeId,
          resumeData: {
            title: trimmedTitle,
          },
        },
        {
          headers: {
            Authorization: token,
          },
        }
      )

      setAllResumes((prev) =>
        prev.map((resume) =>
          resume._id === editResumeId
            ? {
                ...resume,
                title: trimmedTitle,
              }
            : resume
        )
      )

      closeEditModal()

      toast.success(
        data.message || 'Resume title updated'
      )
    } catch (error) {
      toast.error(
        error?.response?.data?.message ||
          error.message ||
          'Unable to update resume'
      )
    } finally {
      setIsLoading(false)
    }
  }

  /* --------------------------------------------------
     Delete resume
  -------------------------------------------------- */

  const deleteResume = async () => {
    if (!deleteResumeId || isDeleting) return

    try {
      setIsDeleting(true)

      const { data } = await api.delete(
        `/api/resumes/delete/${deleteResumeId}`,
        {
          headers: {
            Authorization: token,
          },
        }
      )

      setAllResumes((prev) =>
        prev.filter(
          (resume) => resume._id !== deleteResumeId
        )
      )

      setShowDeleteModal(false)
      setDeleteResumeId('')

      toast.success(
        data.message || 'Resume deleted successfully'
      )
    } catch (error) {
      toast.error(
        error?.response?.data?.message ||
          error.message ||
          'Unable to delete resume'
      )
    } finally {
      setIsDeleting(false)
    }
  }

  /* --------------------------------------------------
     File selection
  -------------------------------------------------- */

  const handleFileChange = (event) => {
    const selectedFile = event.target.files?.[0]

    if (!selectedFile) {
      setResume(null)
      return
    }

    if (
      selectedFile.type !== 'application/pdf' &&
      !selectedFile.name.toLowerCase().endsWith('.pdf')
    ) {
      toast.error('Please select a PDF file')
      event.target.value = ''
      setResume(null)
      return
    }

    if (selectedFile.size > 5 * 1024 * 1024) {
      toast.error('PDF size must be less than 5 MB')
      event.target.value = ''
      setResume(null)
      return
    }

    setResume(selectedFile)
  }

  /* --------------------------------------------------
     Date formatting
  -------------------------------------------------- */

  const formatDate = (date) => {
    if (!date) return 'Recently'

    const parsedDate = new Date(date)

    if (Number.isNaN(parsedDate.getTime())) {
      return 'Recently'
    }

    return parsedDate.toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    })
  }

  /* --------------------------------------------------
     Filter resumes
  -------------------------------------------------- */

  const filteredResumes = allResumes.filter((resume) =>
    (resume.title || 'Untitled Resume')
      .toLowerCase()
      .includes(searchQuery.trim().toLowerCase())
  )

  const userName = user?.name?.trim() || 'there'

  const selectedDeleteResume = allResumes.find(
    (resume) => resume._id === deleteResumeId
  )

  return (
    <div className="min-h-[calc(100vh-64px)] bg-slate-50">

      {/* ==================================================
          Dashboard Header
      ================================================== */}

      <section className="border-b border-slate-200 bg-white">

        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">

          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">

            <div>

              <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-green-100 bg-green-50 px-3 py-1 text-xs font-medium text-green-700">
                <Sparkles className="h-3.5 w-3.5" />
                Resume workspace
              </div>

              <h1 className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
                Welcome back, {userName}
              </h1>

              <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500 sm:text-base">
                Create, edit and manage your professional
                resumes from one place.
              </p>

            </div>

            <div className="flex flex-wrap gap-3">

              <button
                type="button"
                onClick={openUploadModal}
                className="inline-flex h-11 items-center justify-center gap-2 rounded-full border border-slate-200 bg-white px-5 text-sm font-medium text-slate-700 shadow-sm transition-all hover:border-green-200 hover:bg-green-50 hover:text-green-700 active:scale-95"
              >
                <UploadCloudIcon className="h-4 w-4" />
                Upload Resume
              </button>

              <button
                type="button"
                onClick={openCreateModal}
                className="inline-flex h-11 items-center justify-center gap-2 rounded-full bg-green-600 px-5 text-sm font-medium text-white shadow-sm ring-1 ring-green-500 transition-all hover:bg-green-700 hover:shadow-md active:scale-95"
              >
                <PlusIcon className="h-4 w-4" />
                Create Resume
              </button>

            </div>

          </div>

        </div>

      </section>

      {/* ==================================================
          Dashboard Content
      ================================================== */}

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">

        {/* Stats */}

        <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-3">

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">

            <div className="flex items-center justify-between">

              <div>

                <p className="text-sm text-slate-500">
                  Total resumes
                </p>

                <p className="mt-1 text-2xl font-semibold text-slate-900">
                  {allResumes.length}
                </p>

              </div>

              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-50 text-green-600">
                <FileText className="h-5 w-5" />
              </div>

            </div>

          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">

            <div className="flex items-center justify-between">

              <div>

                <p className="text-sm text-slate-500">
                  Workspace
                </p>

                <p className="mt-1 text-2xl font-semibold text-slate-900">
                  Active
                </p>

              </div>

              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                <Clock3 className="h-5 w-5" />
              </div>

            </div>

          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">

            <div className="flex items-center justify-between">

              <div>

                <p className="text-sm text-slate-500">
                  AI assistance
                </p>

                <p className="mt-1 text-2xl font-semibold text-slate-900">
                  Enabled
                </p>

              </div>

              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-50 text-purple-600">
                <Sparkles className="h-5 w-5" />
              </div>

            </div>

          </div>

        </div>

        {/* Resume section header */}

        <div className="mb-5 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

          <div>

            <h2 className="text-lg font-semibold text-slate-900 sm:text-xl">
              Your resumes
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Select a resume to continue editing.
            </p>

          </div>

          {allResumes.length > 0 && (
            <div className="relative w-full sm:w-64">

              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

              <input
                type="search"
                value={searchQuery}
                onChange={(event) =>
                  setSearchQuery(event.target.value)
                }
                placeholder="Search resumes..."
                className="h-10 w-full rounded-full border border-slate-200 bg-white pl-9 pr-4 text-sm text-slate-700 outline-none transition-all placeholder:text-slate-400 focus:border-green-500 focus:ring-4 focus:ring-green-500/10"
              />

            </div>
          )}

        </div>

        {/* Loading */}

        {isLoadingResumes ? (

          <div className="flex min-h-[280px] items-center justify-center rounded-2xl border border-slate-200 bg-white">

            <div className="flex flex-col items-center gap-3 text-slate-500">

              <LoaderCircleIcon className="h-7 w-7 animate-spin text-green-600" />

              <p className="text-sm">
                Loading your resumes...
              </p>

            </div>

          </div>

        ) : allResumes.length === 0 ? (

          /* Empty State */

          <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-14 text-center shadow-sm">

            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-green-50 text-green-600">
              <FileText className="h-7 w-7" />
            </div>

            <h3 className="mt-5 text-lg font-semibold text-slate-900">
              No resumes yet
            </h3>

            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">
              Start from scratch with our resume builder or
              upload an existing PDF and let AI help you turn
              it into an editable resume.
            </p>

            <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">

              <button
                type="button"
                onClick={openCreateModal}
                className="inline-flex h-11 items-center justify-center gap-2 rounded-full bg-green-600 px-6 text-sm font-medium text-white transition-all hover:bg-green-700 active:scale-95"
              >
                <PlusIcon className="h-4 w-4" />
                Create your first resume
              </button>

              <button
                type="button"
                onClick={openUploadModal}
                className="inline-flex h-11 items-center justify-center gap-2 rounded-full border border-slate-200 bg-white px-6 text-sm font-medium text-slate-700 transition-all hover:border-green-200 hover:bg-green-50 hover:text-green-700 active:scale-95"
              >
                <UploadCloudIcon className="h-4 w-4" />
                Upload existing PDF
              </button>

            </div>

          </div>

        ) : filteredResumes.length === 0 ? (

          /* Search Empty State */

          <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-14 text-center">

            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100 text-slate-400">
              <Search className="h-6 w-6" />
            </div>

            <h3 className="mt-4 text-base font-semibold text-slate-900">
              No resumes found
            </h3>

            <p className="mt-1 text-sm text-slate-500">
              Try a different search term.
            </p>

            <button
              type="button"
              onClick={() => setSearchQuery('')}
              className="mt-5 text-sm font-medium text-green-600 hover:text-green-700"
            >
              Clear search
            </button>

          </div>

        ) : (

          /* Resume Cards */

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">

            {filteredResumes.map((resume, index) => {

              const baseColor =
                colors[index % colors.length]

              return (

                <div
                  key={resume._id || index}
                  onClick={() =>
                    navigate(`/app/builder/${resume._id}`)
                  }
                  role="button"
                  tabIndex={0}
                  onKeyDown={(event) => {

                    if (
                      event.key === 'Enter' ||
                      event.key === ' '
                    ) {
                      event.preventDefault()

                      navigate(
                        `/app/builder/${resume._id}`
                      )
                    }

                  }}
                  className="group relative min-h-[210px] cursor-pointer overflow-hidden rounded-2xl border bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg focus:outline-none focus:ring-4 focus:ring-green-500/10"
                  style={{
                    borderColor: `${baseColor}30`,
                  }}
                >

                  {/* Decorative background */}

                  <div
                    className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full blur-2xl opacity-30 transition-opacity duration-300 group-hover:opacity-50"
                    style={{
                      backgroundColor: baseColor,
                    }}
                  />

                  {/* Top row */}

                  <div className="relative flex items-start justify-between">

                    <div
                      className="flex h-11 w-11 items-center justify-center rounded-xl"
                      style={{
                        backgroundColor: `${baseColor}15`,
                        color: baseColor,
                      }}
                    >
                      <FilePenLineIcon className="h-5 w-5" />
                    </div>

                    <div
                      onClick={(event) =>
                        event.stopPropagation()
                      }
                      className="flex items-center gap-1"
                    >

                      <button
                        type="button"
                        aria-label={`Edit ${resume.title}`}
                        onClick={() => {

                          setEditResumeId(resume._id)
                          setTitle(resume.title || '')

                        }}
                        className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-700"
                      >
                        <PencilIcon className="h-4 w-4" />
                      </button>

                      <button
                        type="button"
                        aria-label={`Delete ${resume.title}`}
                        onClick={() =>
                          openDeleteModal(resume._id)
                        }
                        className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 transition-colors hover:bg-red-50 hover:text-red-600"
                      >
                        <TrashIcon className="h-4 w-4" />
                      </button>

                    </div>

                  </div>

                  {/* Resume information */}

                  <div className="relative mt-8">

                    <h3 className="truncate text-base font-semibold text-slate-900">
                      {resume.title || 'Untitled Resume'}
                    </h3>

                    <div className="mt-3 flex items-center gap-2 text-xs text-slate-400">

                      <Clock3 className="h-3.5 w-3.5" />

                      <span>
                        Updated {formatDate(resume.updatedAt)}
                      </span>

                    </div>

                  </div>

                  {/* Open indicator */}

                  <div
                    className="absolute bottom-5 right-5 flex h-8 w-8 items-center justify-center rounded-full opacity-0 transition-all duration-300 group-hover:opacity-100"
                    style={{
                      backgroundColor: `${baseColor}12`,
                      color: baseColor,
                    }}
                  >
                    <MoreHorizontal className="h-4 w-4" />
                  </div>

                </div>

              )
            })}

          </div>

        )}

      </main>

      {/* ==================================================
          CREATE RESUME MODAL
      ================================================== */}

      {showCreateResume && (

        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/50 px-4 backdrop-blur-sm"
          onMouseDown={closeCreateModal}
        >

          <form
            onSubmit={createResume}
            onMouseDown={(event) =>
              event.stopPropagation()
            }
            className="relative w-full max-w-md rounded-2xl border border-slate-200 bg-white p-6 shadow-2xl sm:p-7"
          >

            <button
              type="button"
              onClick={closeCreateModal}
              disabled={isLoading}
              className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <XIcon className="h-5 w-5" />
            </button>

            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-green-50 text-green-600">
              <PlusIcon className="h-5 w-5" />
            </div>

            <h2 className="mt-5 text-xl font-semibold text-slate-900">
              Create a new resume
            </h2>

            <p className="mt-1 text-sm leading-6 text-slate-500">
              Give your resume a name so you can easily find
              it later.
            </p>

            <label className="mt-6 block text-sm font-medium text-slate-700">
              Resume title
            </label>

            <input
              autoFocus
              type="text"
              value={title}
              onChange={(event) =>
                setTitle(event.target.value)
              }
              placeholder="e.g. Software Engineer Resume"
              maxLength={80}
              disabled={isLoading}
              className="mt-2 h-11 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm text-slate-900 outline-none transition-all placeholder:text-slate-400 focus:border-green-500 focus:ring-4 focus:ring-green-500/10 disabled:bg-slate-50"
              required
            />

            <button
              type="submit"
              disabled={isLoading}
              className="mt-5 flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-green-600 text-sm font-medium text-white transition-colors hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-70"
            >

              {isLoading && (
                <LoaderCircleIcon className="h-4 w-4 animate-spin" />
              )}

              {isLoading
                ? 'Creating...'
                : 'Create Resume'}

            </button>

          </form>

        </div>

      )}

      {/* ==================================================
          UPLOAD RESUME MODAL
      ================================================== */}

      {showUploadResume && (

        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/50 px-4 backdrop-blur-sm"
          onMouseDown={closeUploadModal}
        >

          <form
            onSubmit={uploadResume}
            onMouseDown={(event) =>
              event.stopPropagation()
            }
            className="relative w-full max-w-md rounded-2xl border border-slate-200 bg-white p-6 shadow-2xl sm:p-7"
          >

            <button
              type="button"
              onClick={closeUploadModal}
              disabled={isLoading}
              className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <XIcon className="h-5 w-5" />
            </button>

            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
              <UploadCloudIcon className="h-5 w-5" />
            </div>

            <h2 className="mt-5 text-xl font-semibold text-slate-900">
              Upload an existing resume
            </h2>

            <p className="mt-1 text-sm leading-6 text-slate-500">
              Upload a PDF and we'll extract its content for
              editing with your resume builder.
            </p>

            <label className="mt-6 block text-sm font-medium text-slate-700">
              Resume title
            </label>

            <input
              type="text"
              value={title}
              onChange={(event) =>
                setTitle(event.target.value)
              }
              placeholder="e.g. My Existing Resume"
              maxLength={80}
              disabled={isLoading}
              className="mt-2 h-11 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm text-slate-900 outline-none transition-all placeholder:text-slate-400 focus:border-green-500 focus:ring-4 focus:ring-green-500/10 disabled:bg-slate-50"
              required
            />

            <input
              ref={fileInputRef}
              type="file"
              id="resume-input"
              accept="application/pdf,.pdf"
              hidden
              onChange={handleFileChange}
            />

            <label
              htmlFor="resume-input"
              className={`mt-4 flex min-h-[150px] cursor-pointer flex-col items-center justify-center rounded-xl border border-dashed px-5 py-8 text-center transition-all ${
                resume
                  ? 'border-green-300 bg-green-50/50'
                  : 'border-slate-300 bg-slate-50 hover:border-green-400 hover:bg-green-50/40'
              }`}
            >

              {resume ? (

                <>
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-100 text-green-600">
                    <FileText className="h-6 w-6" />
                  </div>

                  <p className="mt-3 max-w-full truncate text-sm font-medium text-green-700">
                    {resume.name}
                  </p>

                  <p className="mt-1 text-xs text-slate-400">
                    {(resume.size / (1024 * 1024)).toFixed(2)} MB
                  </p>
                </>

              ) : (

                <>
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white text-slate-400 shadow-sm">
                    <UploadCloudIcon className="h-6 w-6" />
                  </div>

                  <p className="mt-3 text-sm font-medium text-slate-700">
                    Select a PDF resume
                  </p>

                  <p className="mt-1 text-xs text-slate-400">
                    Maximum file size: 5 MB
                  </p>
                </>

              )}

            </label>

            <button
              type="submit"
              disabled={isLoading}
              className="mt-5 flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-green-600 text-sm font-medium text-white transition-colors hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-70"
            >

              {isLoading && (
                <LoaderCircleIcon className="h-4 w-4 animate-spin" />
              )}

              {isLoading
                ? 'Processing Resume...'
                : 'Upload & Continue'}

            </button>

          </form>

        </div>

      )}

      {/* ==================================================
          EDIT TITLE MODAL
      ================================================== */}

      {editResumeId && (

        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/50 px-4 backdrop-blur-sm"
          onMouseDown={closeEditModal}
        >

          <form
            onSubmit={editTitle}
            onMouseDown={(event) =>
              event.stopPropagation()
            }
            className="relative w-full max-w-md rounded-2xl border border-slate-200 bg-white p-6 shadow-2xl sm:p-7"
          >

            <button
              type="button"
              onClick={closeEditModal}
              disabled={isLoading}
              className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <XIcon className="h-5 w-5" />
            </button>

            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-purple-50 text-purple-600">
              <PencilIcon className="h-5 w-5" />
            </div>

            <h2 className="mt-5 text-xl font-semibold text-slate-900">
              Rename resume
            </h2>

            <p className="mt-1 text-sm leading-6 text-slate-500">
              Update the title of your resume.
            </p>

            <label className="mt-6 block text-sm font-medium text-slate-700">
              Resume title
            </label>

            <input
              autoFocus
              type="text"
              value={title}
              onChange={(event) =>
                setTitle(event.target.value)
              }
              placeholder="Enter resume title"
              maxLength={80}
              disabled={isLoading}
              className="mt-2 h-11 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm text-slate-900 outline-none transition-all placeholder:text-slate-400 focus:border-green-500 focus:ring-4 focus:ring-green-500/10 disabled:bg-slate-50"
              required
            />

            <button
              type="submit"
              disabled={isLoading}
              className="mt-5 flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-green-600 text-sm font-medium text-white transition-colors hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-70"
            >

              {isLoading && (
                <LoaderCircleIcon className="h-4 w-4 animate-spin" />
              )}

              {isLoading
                ? 'Saving...'
                : 'Save Changes'}

            </button>

          </form>

        </div>

      )}

      {/* ==================================================
          DELETE CONFIRMATION MODAL
      ================================================== */}

      {showDeleteModal && (

        <div
          className="fixed inset-0 z-[110] flex items-center justify-center bg-slate-950/60 px-4 backdrop-blur-sm"
          onMouseDown={closeDeleteModal}
        >

          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="delete-resume-title"
            onMouseDown={(event) =>
              event.stopPropagation()
            }
            className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-6 shadow-2xl sm:p-7"
          >

            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-red-50 text-red-600">
              <AlertTriangle className="h-6 w-6" />
            </div>

            <h2
              id="delete-resume-title"
              className="mt-5 text-xl font-semibold text-slate-900"
            >
              Delete this resume?
            </h2>

            <p className="mt-2 text-sm leading-6 text-slate-500">
              You're about to permanently delete{' '}
              <span className="font-medium text-slate-700">
                "{selectedDeleteResume?.title || 'this resume'}"
              </span>
              . This action cannot be undone.
            </p>

            <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">

              <button
                type="button"
                onClick={closeDeleteModal}
                disabled={isDeleting}
                className="h-11 rounded-xl border border-slate-200 bg-white px-5 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={deleteResume}
                disabled={isDeleting}
                className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-red-600 px-5 text-sm font-medium text-white transition-colors hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-70"
              >

                {isDeleting && (
                  <LoaderCircleIcon className="h-4 w-4 animate-spin" />
                )}

                {isDeleting
                  ? 'Deleting...'
                  : 'Delete Resume'}

              </button>

            </div>

          </div>

        </div>

      )}

    </div>
  )
}

export default Dashboard
