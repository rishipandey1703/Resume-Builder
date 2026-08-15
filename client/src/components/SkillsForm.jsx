import {
  Code2,
  Plus,
  Sparkles,
  X,
  Check
} from 'lucide-react'
import React, { useState } from 'react'

const SkillsForm = ({ data, onChange }) => {

  const [newSkill, setNewSkill] = useState('')

  const skills = Array.isArray(data) ? data : []

  const addSkill = () => {
    const skill = newSkill.trim()

    if (!skill) return

    const alreadyExists = skills.some(
      existingSkill =>
        existingSkill.toLowerCase() === skill.toLowerCase()
    )

    if (alreadyExists) {
      setNewSkill('')
      return
    }

    onChange([...skills, skill])
    setNewSkill('')
  }

  const removeSkill = (indexToRemove) => {
    onChange(
      skills.filter((_, index) => index !== indexToRemove)
    )
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      addSkill()
    }
  }

  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="flex items-start gap-3">

        <div className="
          flex items-center justify-center
          size-10
          rounded-xl
          bg-blue-50
          text-blue-600
          shrink-0
        ">
          <Code2 className="size-5" />
        </div>

        <div>
          <h3 className="text-lg font-semibold text-gray-900">
            Skills
          </h3>

          <p className="text-sm text-gray-500 mt-1">
            Add the technical and soft skills that best represent you.
          </p>
        </div>

      </div>

      {/* Add Skill */}
      <div>

        <label className="
          block
          text-sm
          font-medium
          text-gray-700
          mb-2
        ">
          Add a skill
        </label>

        <div className="flex flex-col sm:flex-row gap-2">

          <input
            type="text"
            value={newSkill}
            onChange={(e) => setNewSkill(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="e.g. Python, JavaScript, Machine Learning"
            className="
              flex-1
              h-11
              px-3.5
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

          <button
            type="button"
            onClick={addSkill}
            disabled={!newSkill.trim()}
            className="
              inline-flex
              items-center
              justify-center
              gap-2
              h-11
              px-5
              text-sm
              font-medium
              text-white
              bg-green-600
              rounded-lg
              hover:bg-green-700
              transition-colors
              disabled:opacity-50
              disabled:cursor-not-allowed
              shrink-0
            "
          >
            <Plus className="size-4" />
            Add Skill
          </button>

        </div>

        <p className="text-xs text-gray-400 mt-2">
          Press Enter to quickly add a skill.
        </p>

      </div>

      {/* Skills List */}
      {skills.length > 0 ? (

        <div>

          <div className="flex items-center justify-between mb-3">

            <p className="text-sm font-medium text-gray-700">
              Your skills
            </p>

            <span className="text-xs text-gray-400">
              {skills.length} skill{skills.length !== 1 ? 's' : ''}
            </span>

          </div>

          <div className="
            flex
            flex-wrap
            gap-2.5
            p-4
            rounded-xl
            border border-gray-200
            bg-gray-50/60
          ">

            {skills.map((skill, index) => (

              <div
                key={`${skill}-${index}`}
                className="
                  group
                  flex
                  items-center
                  gap-2
                  pl-3
                  pr-1.5
                  py-1.5
                  rounded-lg
                  bg-white
                  border border-gray-200
                  text-sm
                  text-gray-700
                  shadow-sm
                  hover:border-green-200
                  hover:bg-green-50
                  transition-colors
                "
              >

                <span>
                  {skill}
                </span>

                <button
                  type="button"
                  onClick={() => removeSkill(index)}
                  className="
                    flex
                    items-center
                    justify-center
                    size-5
                    rounded-md
                    text-gray-400
                    hover:text-red-600
                    hover:bg-red-50
                    transition-colors
                  "
                  title={`Remove ${skill}`}
                  aria-label={`Remove ${skill}`}
                >
                  <X className="size-3.5" />
                </button>

              </div>

            ))}

          </div>

        </div>

      ) : (

        /* Empty State */
        <div className="
          border border-dashed
          border-gray-300
          rounded-xl
          bg-gray-50/70
          py-10
          px-6
          text-center
        ">

          <div className="
            mx-auto
            flex items-center justify-center
            size-12
            rounded-full
            bg-white
            border border-gray-200
            text-gray-400
            shadow-sm
          ">
            <Sparkles className="size-5" />
          </div>

          <h4 className="mt-3 text-sm font-semibold text-gray-800">
            No skills added yet
          </h4>

          <p className="mt-1 text-sm text-gray-500">
            Add your technical and soft skills above.
          </p>

        </div>

      )}

      {/* Skill Suggestions */}
      <div className="
        rounded-xl
        border border-blue-100
        bg-blue-50/50
        px-4 py-4
      ">

        <div className="flex items-start gap-3">

          <div className="
            flex items-center justify-center
            size-8
            rounded-lg
            bg-blue-100
            text-blue-600
            shrink-0
          ">
            <Sparkles className="size-4" />
          </div>

          <div>

            <p className="text-sm font-medium text-blue-900">
              Skills tip
            </p>

            <p className="
              text-xs
              text-blue-700/80
              mt-1
              leading-relaxed
            ">
              Add around 8–12 relevant skills. Prioritize technologies
              and abilities that match the job you're targeting.
            </p>

          </div>

        </div>

        {/* Examples */}
        <div className="mt-4 flex flex-wrap gap-2">

          {[
            'Python',
            'C++',
            'Machine Learning',
            'SQL',
            'Git',
            'Problem Solving'
          ].map((skill) => (

            <button
              key={skill}
              type="button"
              onClick={() => {

                const alreadyExists = skills.some(
                  existingSkill =>
                    existingSkill.toLowerCase() ===
                    skill.toLowerCase()
                )

                if (!alreadyExists) {
                  onChange([...skills, skill])
                }

              }}
              disabled={skills.some(
                existingSkill =>
                  existingSkill.toLowerCase() ===
                  skill.toLowerCase()
              )}
              className="
                inline-flex
                items-center
                gap-1.5
                px-2.5
                py-1.5
                rounded-lg
                bg-white
                border border-blue-100
                text-xs
                text-blue-700
                hover:border-blue-300
                hover:bg-blue-100/50
                transition-colors
                disabled:opacity-50
                disabled:cursor-not-allowed
              "
            >

              {skills.some(
                existingSkill =>
                  existingSkill.toLowerCase() ===
                  skill.toLowerCase()
              ) ? (
                <Check className="size-3" />
              ) : (
                <Plus className="size-3" />
              )}

              {skill}

            </button>

          ))}

        </div>

      </div>

    </div>
  )
}

export default SkillsForm
