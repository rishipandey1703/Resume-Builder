import { Loader2, Sparkles, FileText } from 'lucide-react'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import api from '../configs/api'
import toast from 'react-hot-toast'

const ProfessionalSummaryForm = ({ data, onChange, setResumeData }) => {

  const { token } = useSelector(state => state.auth)
  const [isGenerating, setIsGenerating] = useState(false)

  const summary = data || ''
  const characterCount = summary.length
  const maxCharacters = 1000

  const generateSummary = async () => {

    if (!summary.trim()) {
      toast.error('Please write a short summary first.')
      return
    }

    try {
      setIsGenerating(true)

      const prompt = `Enhance my professional summary while keeping it truthful, concise, professional, ATS-friendly, and suitable for a resume. Do not invent qualifications, experience, achievements, or skills.

Professional Summary:
"${summary}"`

      const response = await api.post(
        '/api/ai/enhance-pro-sum',
        { userContent: prompt },
        {
          headers: {
            Authorization: token
          }
        }
      )

      const enhancedContent = response?.data?.enhancedContent

      if (!enhancedContent) {
        throw new Error('No enhanced summary was returned.')
      }

      setResumeData(prev => ({
        ...prev,
        professional_summary: enhancedContent
      }))

      toast.success('Professional summary enhanced successfully.')

    } catch (error) {

      toast.error(
        error?.response?.data?.message ||
        error?.message ||
        'Unable to enhance the summary right now.'
      )

    } finally {
      setIsGenerating(false)
    }
  }

  const handleChange = (e) => {
    const value = e.target.value

    if (value.length <= maxCharacters) {
      onChange(value)
    }
  }

  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">

        <div>
          <div className="flex items-center gap-2">
            <div className="flex items-center justify-center size-9 rounded-lg bg-blue-50 text-blue-600">
              <FileText className="size-5" />
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900">
                Professional Summary
              </h3>

              <p className="text-sm text-gray-500 mt-0.5">
                Introduce yourself and highlight your strongest qualifications.
              </p>
            </div>
          </div>
        </div>

        {/* AI Enhance Button */}
        <button
          type="button"
          disabled={isGenerating || !summary.trim()}
          onClick={generateSummary}
          className="
            inline-flex items-center justify-center gap-2
            px-4 py-2
            rounded-lg
            text-sm font-medium
            bg-purple-50 text-purple-700
            border border-purple-200
            hover:bg-purple-100
            hover:border-purple-300
            transition-all
            disabled:opacity-50
            disabled:cursor-not-allowed
            shrink-0
          "
        >
          {isGenerating ? (
            <>
              <Loader2 className="size-4 animate-spin" />
              Enhancing...
            </>
          ) : (
            <>
              <Sparkles className="size-4" />
              AI Enhance
            </>
          )}
        </button>

      </div>

      {/* Textarea */}
      <div>

        <div className="relative">

          <textarea
            value={summary}
            onChange={handleChange}
            rows={8}
            maxLength={maxCharacters}
            className="
              w-full
              px-4
              py-3.5
              text-sm
              text-gray-800
              bg-white
              border
              border-gray-300
              rounded-xl
              outline-none
              resize-none
              placeholder:text-gray-400
              transition-all
              focus:border-green-500
              focus:ring-4
              focus:ring-green-500/10
            "
            placeholder="Example: Motivated B.Tech student specializing in Artificial Intelligence and Machine Learning with a strong foundation in Python and C++. Experienced in developing practical projects and solving complex problems using modern technologies. Passionate about building intelligent, scalable solutions and continuously improving technical skills."
          />

          {/* Character Counter */}
          <div className="absolute bottom-3 right-3 px-2 py-1 rounded-md bg-white/90 text-xs text-gray-400">
            {characterCount}/{maxCharacters}
          </div>

        </div>

        {/* Tip */}
        <div className="mt-3 flex items-start gap-2 text-xs text-gray-500">
          <Sparkles className="size-4 text-green-500 shrink-0 mt-0.5" />

          <p>
            <span className="font-medium text-gray-600">
              Resume tip:
            </span>{' '}
            Keep your summary to 3–4 sentences. Focus on your specialization,
            strongest skills, relevant experience, and the type of role you
            are targeting.
          </p>
        </div>

      </div>

      {/* AI Explanation */}
      <div className="rounded-xl border border-purple-100 bg-purple-50/50 px-4 py-3">
        <div className="flex items-start gap-3">

          <div className="flex items-center justify-center size-8 rounded-lg bg-purple-100 text-purple-600 shrink-0">
            <Sparkles className="size-4" />
          </div>

          <div>
            <p className="text-sm font-medium text-purple-900">
              Use AI to improve your summary
            </p>

            <p className="text-xs text-purple-700/80 mt-1 leading-relaxed">
              AI can improve clarity, wording and professionalism while
              keeping the information you provide as the basis for your
              summary.
            </p>
          </div>

        </div>
      </div>

    </div>
  )
}

export default ProfessionalSummaryForm
