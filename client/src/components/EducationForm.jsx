import {
  CalendarDays,
  GraduationCap,
  Plus,
  School,
  Trash2,
  BookOpen
} from 'lucide-react'
import React from 'react'

const EducationForm = ({ data, onChange }) => {

  const addEducation = () => {
    const newEducation = {
      institution: '',
      degree: '',
      field: '',
      graduation_date: '',
      gpa: ''
    }

    onChange([...(data || []), newEducation])
  }

  const removeEducation = (index) => {
    const updated = data.filter((_, i) => i !== index)
    onChange(updated)
  }

  const updateEducation = (index, field, value) => {
    const updated = [...data]

    updated[index] = {
      ...updated[index],
      [field]: value
    }

    onChange(updated)
  }

  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">

        <div className="flex items-start gap-3">

          <div className="flex items-center justify-center size-10 rounded-xl bg-green-50 text-green-600 shrink-0">
            <GraduationCap className="size-5" />
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-900">
              Education
            </h3>

            <p className="text-sm text-gray-500 mt-1">
              Add your academic background and qualifications.
            </p>
          </div>

        </div>

        <button
          type="button"
          onClick={addEducation}
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
          Add Education
        </button>

      </div>

      {/* Empty State */}
      {(!data || data.length === 0) ? (

        <div className="
          border border-dashed
          border-gray-300
          rounded-xl
          bg-gray-50/70
          py-12
          px-6
          text-center
        ">

          <div className="
            mx-auto
            flex items-center justify-center
            size-14
            rounded-full
            bg-white
            border border-gray-200
            text-gray-400
            shadow-sm
          ">
            <GraduationCap className="size-6" />
          </div>

          <h4 className="mt-4 text-sm font-semibold text-gray-800">
            No education added yet
          </h4>

          <p className="mt-1 text-sm text-gray-500 max-w-sm mx-auto">
            Add your school, college, university or other relevant
            educational qualifications.
          </p>

          <button
            type="button"
            onClick={addEducation}
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
            Add your first education
          </button>

        </div>

      ) : (

        /* Education Cards */
        <div className="space-y-5">

          {data.map((education, index) => (

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
              <div className="
                flex items-center justify-between
                px-5 py-4
                bg-gray-50/70
                border-b border-gray-100
              ">

                <div className="flex items-center gap-3">

                  <div className="
                    flex items-center justify-center
                    size-9
                    rounded-lg
                    bg-white
                    border border-gray-200
                    text-green-600
                  ">
                    <GraduationCap className="size-4" />
                  </div>

                  <div>
                    <p className="text-sm font-semibold text-gray-900">
                      Education #{index + 1}
                    </p>

                    <p className="text-xs text-gray-500 mt-0.5">
                      {education.degree || 'Add your degree'}
                    </p>
                  </div>

                </div>

                <button
                  type="button"
                  onClick={() => removeEducation(index)}
                  className="
                    flex items-center justify-center
                    size-8
                    rounded-lg
                    text-gray-400
                    hover:text-red-600
                    hover:bg-red-50
                    transition-colors
                  "
                  title="Remove education"
                  aria-label={`Remove education ${index + 1}`}
                >
                  <Trash2 className="size-4" />
                </button>

              </div>

              {/* Card Body */}
              <div className="p-5 space-y-5">

                {/* Institution + Degree */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                  {/* Institution */}
                  <div className="space-y-1.5">

                    <label className="
                      flex items-center gap-2
                      text-sm font-medium text-gray-700
                    ">
                      <School className="size-4 text-gray-400" />
                      Institution
                      <span className="text-red-500">*</span>
                    </label>

                    <input
                      type="text"
                      value={education.institution || ''}
                      onChange={(e) =>
                        updateEducation(
                          index,
                          'institution',
                          e.target.value
                        )
                      }
                      placeholder="e.g. ABES Engineering College"
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

                  {/* Degree */}
                  <div className="space-y-1.5">

                    <label className="
                      flex items-center gap-2
                      text-sm font-medium text-gray-700
                    ">
                      <GraduationCap className="size-4 text-gray-400" />
                      Degree
                      <span className="text-red-500">*</span>
                    </label>

                    <input
                      type="text"
                      value={education.degree || ''}
                      onChange={(e) =>
                        updateEducation(
                          index,
                          'degree',
                          e.target.value
                        )
                      }
                      placeholder="e.g. B.Tech"
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

                {/* Field + Graduation */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                  {/* Field */}
                  <div className="space-y-1.5">

                    <label className="
                      flex items-center gap-2
                      text-sm font-medium text-gray-700
                    ">
                      <BookOpen className="size-4 text-gray-400" />
                      Field of Study
                    </label>

                    <input
                      type="text"
                      value={education.field || ''}
                      onChange={(e) =>
                        updateEducation(
                          index,
                          'field',
                          e.target.value
                        )
                      }
                      placeholder="e.g. Artificial Intelligence & Machine Learning"
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

                  {/* Graduation Date */}
                  <div className="space-y-1.5">

                    <label className="
                      flex items-center gap-2
                      text-sm font-medium text-gray-700
                    ">
                      <CalendarDays className="size-4 text-gray-400" />
                      Graduation Date
                    </label>

                    <input
                      type="month"
                      value={education.graduation_date || ''}
                      onChange={(e) =>
                        updateEducation(
                          index,
                          'graduation_date',
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

                </div>

                {/* GPA */}
                <div className="max-w-md space-y-1.5">

                  <label className="
                    flex items-center gap-2
                    text-sm font-medium text-gray-700
                  ">
                    GPA / Percentage
                    <span className="text-xs font-normal text-gray-400">
                      (optional)
                    </span>
                  </label>

                  <input
                    type="text"
                    value={education.gpa || ''}
                    onChange={(e) =>
                      updateEducation(
                        index,
                        'gpa',
                        e.target.value
                      )
                    }
                    placeholder="e.g. 8.5 CGPA or 85%"
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

                  <p className="text-xs text-gray-400">
                    Only include your GPA or percentage if it strengthens
                    your resume.
                  </p>

                </div>

              </div>

            </div>

          ))}

        </div>

      )}

      {/* Resume Tip */}
      {data && data.length > 0 && (
        <div className="
          rounded-xl
          border border-green-100
          bg-green-50/50
          px-4 py-3
        ">

          <div className="flex items-start gap-3">

            <div className="
              flex items-center justify-center
              size-8
              rounded-lg
              bg-green-100
              text-green-600
              shrink-0
            ">
              <GraduationCap className="size-4" />
            </div>

            <div>

              <p className="text-sm font-medium text-green-900">
                Resume tip
              </p>

              <p className="
                text-xs
                text-green-700/80
                mt-1
                leading-relaxed
              ">
                Put your most recent or highest-level education first.
                Include your field of study and graduation date, and add
                your GPA only when it is relevant or competitive.
              </p>

            </div>

          </div>

        </div>
      )}

    </div>
  )
}

export default EducationForm
