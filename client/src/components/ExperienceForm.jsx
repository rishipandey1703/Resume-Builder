import {
  Briefcase,
  CalendarDays,
  Building2,
  Loader2,
  Plus,
  Sparkles,
  Trash2,
  CheckCircle2
} from 'lucide-react'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import api from '../configs/api'
import toast from 'react-hot-toast'

const ExperienceForm = ({ data, onChange }) => {

  const { token } = useSelector(state => state.auth)

  const [generatingIndex, setGeneratingIndex] = useState(-1)

  const maxDescriptionLength = 1200

  const addExperience = () => {
    const newExperience = {
      company: '',
      position: '',
      start_date: '',
      end_date: '',
      description: '',
      is_current: false
    }

    onChange([...(data || []), newExperience])
  }

  const removeExperience = (index) => {
    const updated = data.filter((_, i) => i !== index)
    onChange(updated)
  }

  const updateExperience = (index, field, value) => {
    const updated = [...data]

    updated[index] = {
      ...updated[index],
      [field]: value
    }

    onChange(updated)
  }

  const handleCurrentChange = (index, checked) => {
    const updated = [...data]

    updated[index] = {
      ...updated[index],
      is_current: checked,
      end_date: checked ? '' : updated[index].end_date
    }

    onChange(updated)
  }

  const generateDescription = async (index) => {
    const experience = data[index]

    if (!experience.company?.trim()) {
      toast.error('Please enter the company name first.')
      return
    }

    if (!experience.position?.trim()) {
      toast.error('Please enter the job title first.')
      return
    }

    if (!experience.description?.trim()) {
      toast.error('Write a short description first so AI can improve it.')
      return
    }

    try {
      setGeneratingIndex(index)

      const prompt = `
Improve the following professional resume job description.

Company:
${experience.company}

Position:
${experience.position}

Existing description:
${experience.description}

Requirements:
- Make it professional and ATS-friendly.
- Use concise, strong action-oriented language.
- Focus on responsibilities, skills, contributions and measurable achievements when they are already provided.
- Do not invent companies, responsibilities, technologies, achievements, numbers, qualifications or experience.
- Preserve the factual meaning of the original description.
- Return only the improved job description.
      `.trim()

      const response = await api.post(
        '/api/ai/enhance-job-desc',
        {
          userContent: prompt
        },
        {
          headers: {
            Authorization: token
          }
        }
      )

      const enhancedContent = response?.data?.enhancedContent

      if (!enhancedContent) {
        throw new Error('No enhanced job description was returned.')
      }

      updateExperience(
        index,
        'description',
        enhancedContent
      )

      toast.success('Job description enhanced successfully.')

    } catch (error) {

      console.error('AI Job Description Error:', error)
      console.error('Response:', error?.response?.data)

      toast.error(
        error?.response?.data?.message ||
        error?.message ||
        'Failed to enhance job description.'
      )

    } finally {
      setGeneratingIndex(-1)
    }
  }

  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">

        <div className="flex items-start gap-3">

          <div className="flex items-center justify-center size-10 rounded-xl bg-blue-50 text-blue-600 shrink-0">
            <Briefcase className="size-5" />
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-900">
              Professional Experience
            </h3>

            <p className="text-sm text-gray-500 mt-1">
              Add your work experience, internships and relevant professional roles.
            </p>
          </div>

        </div>

        <button
          type="button"
          onClick={addExperience}
          className="
            inline-flex items-center justify-center gap-2
            px-4 py-2
            text-sm font-medium
            bg-green-50
            text-green-700
            border border-green-200
            rounded-lg
            hover:bg-green-100
            hover:border-green-300
            transition-all
            shrink-0
          "
        >
          <Plus className="size-4" />
          Add Experience
        </button>

      </div>

      {/* Empty State */}
      {(!data || data.length === 0) ? (

        <div className="border border-dashed border-gray-300 rounded-xl bg-gray-50/70 py-12 px-6 text-center">

          <div className="mx-auto flex items-center justify-center size-14 rounded-full bg-white border border-gray-200 text-gray-400 shadow-sm">
            <Briefcase className="size-6" />
          </div>

          <h4 className="mt-4 text-sm font-semibold text-gray-800">
            No experience added yet
          </h4>

          <p className="mt-1 text-sm text-gray-500 max-w-sm mx-auto">
            Add your internships, jobs, freelance work or other relevant
            professional experience.
          </p>

          <button
            type="button"
            onClick={addExperience}
            className="
              mt-5
              inline-flex items-center gap-2
              px-4 py-2
              rounded-lg
              bg-green-600
              hover:bg-green-700
              text-white
              text-sm
              font-medium
              transition-colors
            "
          >
            <Plus className="size-4" />
            Add your first experience
          </button>

        </div>

      ) : (

        /* Experience Cards */
        <div className="space-y-5">

          {data.map((experience, index) => {

            const descriptionLength =
              experience.description?.length || 0

            const isGenerating = generatingIndex === index

            return (
              <div
                key={index}
                className="
                  rounded-xl
                  border border-gray-200
                  bg-white
                  overflow-hidden
                  shadow-sm
                  hover:shadow-md
                  transition-shadow
                "
              >

                {/* Card Header */}
                <div className="flex items-center justify-between px-5 py-4 bg-gray-50/70 border-b border-gray-100">

                  <div className="flex items-center gap-3">

                    <div className="flex items-center justify-center size-9 rounded-lg bg-white border border-gray-200 text-blue-600">
                      <Briefcase className="size-4" />
                    </div>

                    <div>
                      <p className="text-sm font-semibold text-gray-900">
                        Experience #{index + 1}
                      </p>

                      <p className="text-xs text-gray-500 mt-0.5">
                        {experience.position || 'Add your job title'}
                      </p>
                    </div>

                  </div>

                  <button
                    type="button"
                    onClick={() => removeExperience(index)}
                    className="
                      flex items-center justify-center
                      size-8
                      rounded-lg
                      text-gray-400
                      hover:text-red-600
                      hover:bg-red-50
                      transition-colors
                    "
                    title="Remove experience"
                    aria-label={`Remove experience ${index + 1}`}
                  >
                    <Trash2 className="size-4" />
                  </button>

                </div>

                {/* Card Body */}
                <div className="p-5 space-y-5">

                  {/* Company + Position */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                    {/* Company */}
                    <div className="space-y-1.5">

                      <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                        <Building2 className="size-4 text-gray-400" />
                        Company
                        <span className="text-red-500">*</span>
                      </label>

                      <input
                        type="text"
                        value={experience.company || ''}
                        onChange={(e) =>
                          updateExperience(
                            index,
                            'company',
                            e.target.value
                          )
                        }
                        placeholder="e.g. Microsoft"
                        className="
                          w-full
                          px-3.5 py-2.5
                          text-sm
                          text-gray-800
                          bg-white
                          border border-gray-300
                          rounded-lg
                          outline-none
                          placeholder:text-gray-400
                          transition-all
                          focus:border-green-500
                          focus:ring-4
                          focus:ring-green-500/10
                        "
                      />

                    </div>

                    {/* Position */}
                    <div className="space-y-1.5">

                      <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                        <Briefcase className="size-4 text-gray-400" />
                        Job Title
                        <span className="text-red-500">*</span>
                      </label>

                      <input
                        type="text"
                        value={experience.position || ''}
                        onChange={(e) =>
                          updateExperience(
                            index,
                            'position',
                            e.target.value
                          )
                        }
                        placeholder="e.g. Software Engineer"
                        className="
                          w-full
                          px-3.5 py-2.5
                          text-sm
                          text-gray-800
                          bg-white
                          border border-gray-300
                          rounded-lg
                          outline-none
                          placeholder:text-gray-400
                          transition-all
                          focus:border-green-500
                          focus:ring-4
                          focus:ring-green-500/10
                        "
                      />

                    </div>

                  </div>

                  {/* Dates */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                    {/* Start Date */}
                    <div className="space-y-1.5">

                      <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                        <CalendarDays className="size-4 text-gray-400" />
                        Start Date
                      </label>

                      <input
                        type="month"
                        value={experience.start_date || ''}
                        onChange={(e) =>
                          updateExperience(
                            index,
                            'start_date',
                            e.target.value
                          )
                        }
                        className="
                          w-full
                          px-3.5 py-2.5
                          text-sm
                          text-gray-800
                          bg-white
                          border border-gray-300
                          rounded-lg
                          outline-none
                          transition-all
                          focus:border-green-500
                          focus:ring-4
                          focus:ring-green-500/10
                        "
                      />

                    </div>

                    {/* End Date */}
                    <div className="space-y-1.5">

                      <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                        <CalendarDays className="size-4 text-gray-400" />
                        End Date
                      </label>

                      <input
                        type="month"
                        value={experience.end_date || ''}
                        onChange={(e) =>
                          updateExperience(
                            index,
                            'end_date',
                            e.target.value
                          )
                        }
                        disabled={experience.is_current}
                        className="
                          w-full
                          px-3.5 py-2.5
                          text-sm
                          text-gray-800
                          bg-white
                          border border-gray-300
                          rounded-lg
                          outline-none
                          transition-all
                          focus:border-green-500
                          focus:ring-4
                          focus:ring-green-500/10
                          disabled:bg-gray-100
                          disabled:text-gray-400
                          disabled:cursor-not-allowed
                        "
                      />

                    </div>

                  </div>

                  {/* Current Job Toggle */}
                  <label
                    className="
                      flex items-center gap-3
                      w-fit
                      cursor-pointer
                      select-none
                    "
                  >

                    <input
                      type="checkbox"
                      checked={experience.is_current || false}
                      onChange={(e) =>
                        handleCurrentChange(
                          index,
                          e.target.checked
                        )
                      }
                      className="sr-only peer"
                    />

                    <div
                      className="
                        relative
                        w-10 h-5
                        rounded-full
                        bg-gray-300
                        peer-checked:bg-green-600
                        transition-colors
                      "
                    >
                      <div
                        className="
                          absolute
                          top-0.5 left-0.5
                          size-4
                          bg-white
                          rounded-full
                          shadow-sm
                          transition-transform
                          peer-checked:translate-x-5
                        "
                      />
                    </div>

                    <span className="flex items-center gap-1.5 text-sm text-gray-700">
                      <CheckCircle2 className="size-4 text-green-600" />
                      I currently work here
                    </span>

                  </label>

                  {/* Description */}
                  <div className="space-y-2">

                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">

                      <label className="text-sm font-medium text-gray-700">
                        Job Description
                      </label>

                      <button
                        type="button"
                        onClick={() => generateDescription(index)}
                        disabled={
                          isGenerating ||
                          !experience.company?.trim() ||
                          !experience.position?.trim() ||
                          !experience.description?.trim()
                        }
                        className="
                          inline-flex items-center justify-center gap-1.5
                          px-3 py-1.5
                          text-xs
                          font-medium
                          rounded-lg
                          bg-purple-50
                          text-purple-700
                          border border-purple-200
                          hover:bg-purple-100
                          hover:border-purple-300
                          transition-all
                          disabled:opacity-50
                          disabled:cursor-not-allowed
                        "
                      >

                        {isGenerating ? (
                          <>
                            <Loader2 className="size-3.5 animate-spin" />
                            Enhancing...
                          </>
                        ) : (
                          <>
                            <Sparkles className="size-3.5" />
                            Enhance with AI
                          </>
                        )}

                      </button>

                    </div>

                    <div className="relative">

                      <textarea
                        value={experience.description || ''}
                        onChange={(e) => {

                          if (
                            e.target.value.length <=
                            maxDescriptionLength
                          ) {
                            updateExperience(
                              index,
                              'description',
                              e.target.value
                            )
                          }

                        }}
                        rows={6}
                        maxLength={maxDescriptionLength}
                        placeholder="Describe your responsibilities, projects, technologies used and achievements..."
                        className="
                          w-full
                          px-4 py-3.5
                          pr-20
                          text-sm
                          text-gray-800
                          bg-white
                          border border-gray-300
                          rounded-xl
                          outline-none
                          resize-none
                          placeholder:text-gray-400
                          transition-all
                          focus:border-green-500
                          focus:ring-4
                          focus:ring-green-500/10
                        "
                      />

                      <div className="absolute bottom-3 right-3 px-2 py-1 rounded-md bg-white/90 text-xs text-gray-400">
                        {descriptionLength}/{maxDescriptionLength}
                      </div>

                    </div>

                    <div className="flex items-start gap-2 text-xs text-gray-500">

                      <Sparkles className="size-3.5 text-purple-500 mt-0.5 shrink-0" />

                      <p>
                        Write what you actually did first. AI can improve
                        the wording and make it more concise and
                        ATS-friendly.
                      </p>

                    </div>

                  </div>

                </div>

              </div>
            )
          })}

        </div>

      )}

      {/* Bottom Tip */}
      {data && data.length > 0 && (
        <div className="rounded-xl border border-green-100 bg-green-50/50 px-4 py-3">

          <div className="flex items-start gap-3">

            <div className="flex items-center justify-center size-8 rounded-lg bg-green-100 text-green-600 shrink-0">
              <Briefcase className="size-4" />
            </div>

            <div>
              <p className="text-sm font-medium text-green-900">
                Resume tip
              </p>

              <p className="text-xs text-green-700/80 mt-1 leading-relaxed">
                Start each achievement with a strong action verb such as
                developed, designed, implemented, optimized, analyzed or
                automated. Add measurable results whenever they are
                genuinely available.
              </p>
            </div>

          </div>

        </div>
      )}

    </div>
  )
}

export default ExperienceForm
