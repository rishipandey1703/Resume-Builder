import {
  FolderGit2,
  Plus,
  Trash2,
  Tag,
  FileText
} from 'lucide-react'
import React from 'react'

const ProjectForm = ({ data, onChange }) => {

  const addProject = () => {
    const newProject = {
      name: '',
      type: '',
      description: ''
    }

    onChange([...(data || []), newProject])
  }

  const removeProject = (index) => {
    const updated = data.filter((_, i) => i !== index)
    onChange(updated)
  }

  const updateProject = (index, field, value) => {
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

          <div className="
            flex items-center justify-center
            size-10
            rounded-xl
            bg-green-50
            text-green-600
            shrink-0
          ">
            <FolderGit2 className="size-5" />
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-900">
              Projects
            </h3>

            <p className="text-sm text-gray-500 mt-1">
              Showcase projects that demonstrate your skills and experience.
            </p>
          </div>

        </div>

        <button
          type="button"
          onClick={addProject}
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
          Add Project
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
            <FolderGit2 className="size-6" />
          </div>

          <h4 className="mt-4 text-sm font-semibold text-gray-800">
            No projects added yet
          </h4>

          <p className="mt-1 text-sm text-gray-500 max-w-sm mx-auto">
            Add your strongest academic, personal, hackathon, or professional
            projects to make your resume stand out.
          </p>

          <button
            type="button"
            onClick={addProject}
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
            Add your first project
          </button>

        </div>

      ) : (

        /* Project Cards */
        <div className="space-y-5">

          {data.map((project, index) => (

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
                    <FolderGit2 className="size-4" />
                  </div>

                  <div>
                    <p className="text-sm font-semibold text-gray-900">
                      Project #{index + 1}
                    </p>

                    <p className="text-xs text-gray-500 mt-0.5">
                      {project.name || 'Add your project details'}
                    </p>
                  </div>

                </div>

                <button
                  type="button"
                  onClick={() => removeProject(index)}
                  className="
                    flex items-center justify-center
                    size-8
                    rounded-lg
                    text-gray-400
                    hover:text-red-600
                    hover:bg-red-50
                    transition-colors
                  "
                  title="Remove project"
                  aria-label={`Remove project ${index + 1}`}
                >
                  <Trash2 className="size-4" />
                </button>

              </div>

              {/* Card Body */}
              <div className="p-5 space-y-5">

                {/* Project Name */}
                <div className="space-y-1.5">

                  <label className="
                    flex items-center gap-2
                    text-sm font-medium text-gray-700
                  ">
                    <FolderGit2 className="size-4 text-gray-400" />
                    Project Name
                    <span className="text-red-500">*</span>
                  </label>

                  <input
                    type="text"
                    value={project.name || ''}
                    onChange={(e) =>
                      updateProject(
                        index,
                        'name',
                        e.target.value
                      )
                    }
                    placeholder="e.g. Smart Safar"
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

                {/* Project Type */}
                <div className="space-y-1.5">

                  <label className="
                    flex items-center gap-2
                    text-sm font-medium text-gray-700
                  ">
                    <Tag className="size-4 text-gray-400" />
                    Project Type
                  </label>

                  <input
                    type="text"
                    value={project.type || ''}
                    onChange={(e) =>
                      updateProject(
                        index,
                        'type',
                        e.target.value
                      )
                    }
                    placeholder="e.g. AI / Web Application / Hackathon"
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

                {/* Description */}
                <div className="space-y-1.5">

                  <label className="
                    flex items-center gap-2
                    text-sm font-medium text-gray-700
                  ">
                    <FileText className="size-4 text-gray-400" />
                    Project Description
                    <span className="text-red-500">*</span>
                  </label>

                  <textarea
                    rows={5}
                    value={project.description || ''}
                    onChange={(e) =>
                      updateProject(
                        index,
                        'description',
                        e.target.value
                      )
                    }
                    placeholder="Describe what you built, the technologies you used, and the impact or results..."
                    className="
                      w-full
                      px-3.5 py-3
                      text-sm
                      text-gray-800
                      bg-white
                      border border-gray-300
                      rounded-lg
                      outline-none
                      placeholder:text-gray-400
                      transition-all
                      resize-none
                      leading-relaxed
                      focus:border-green-500
                      focus:ring-4
                      focus:ring-green-500/10
                    "
                  />

                  <div className="flex justify-between items-center gap-3">

                    <p className="text-xs text-gray-400">
                      Focus on your contribution, technologies, and measurable results.
                    </p>

                    <span className="text-xs text-gray-400 shrink-0">
                      {project.description?.length || 0} characters
                    </span>

                  </div>

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
              <FolderGit2 className="size-4" />
            </div>

            <div>

              <p className="text-sm font-medium text-green-900">
                Project tip
              </p>

              <p className="
                text-xs
                text-green-700/80
                mt-1
                leading-relaxed
              ">
                Highlight 2–4 of your strongest projects. Mention the
                technologies used, what you personally built, and the
                result or impact whenever possible.
              </p>

            </div>

          </div>

        </div>
      )}

    </div>
  )
}

export default ProjectForm
