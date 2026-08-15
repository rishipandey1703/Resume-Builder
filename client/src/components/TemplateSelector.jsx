import {
  Check,
  ChevronDown,
  Layout,
  Sparkles
} from 'lucide-react'
import React, { useEffect, useRef, useState } from 'react'

const TemplateSelector = ({ selectedTemplate, onChange }) => {

  const [isOpen, setIsOpen] = useState(false)
  const selectorRef = useRef(null)

  const templates = [
    {
      id: 'classic',
      name: 'Classic',
      description:
        'A clean, traditional resume format with clear sections and professional typography.',
      badge: 'Professional'
    },
    {
      id: 'modern',
      name: 'Modern',
      description:
        'A sleek layout with strategic color accents and a contemporary visual style.',
      badge: 'Popular'
    },
    {
      id: 'minimal-image',
      name: 'Minimal Image',
      description:
        'A clean, modern layout with a profile image and balanced typography.',
      badge: 'Visual'
    },
    {
      id: 'minimal',
      name: 'Minimal',
      description:
        'An ultra-clean design that keeps attention on your skills and experience.',
      badge: 'ATS Friendly'
    }
  ]

  const selected =
    templates.find(template => template.id === selectedTemplate) ||
    templates[0]

  /* Close dropdown when clicking outside */
  useEffect(() => {

    const handleClickOutside = (event) => {
      if (
        selectorRef.current &&
        !selectorRef.current.contains(event.target)
      ) {
        setIsOpen(false)
      }
    }

    document.addEventListener(
      'mousedown',
      handleClickOutside
    )

    return () => {
      document.removeEventListener(
        'mousedown',
        handleClickOutside
      )
    }

  }, [])

  /* Close dropdown with Escape */
  useEffect(() => {

    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        setIsOpen(false)
      }
    }

    document.addEventListener(
      'keydown',
      handleEscape
    )

    return () => {
      document.removeEventListener(
        'keydown',
        handleEscape
      )
    }

  }, [])

  const handleSelect = (templateId) => {
    onChange(templateId)
    setIsOpen(false)
  }

  return (
    <div
      ref={selectorRef}
      className="relative"
    >

      {/* Selector Button */}
      <button
        type="button"
        onClick={() => setIsOpen(prev => !prev)}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        className="
          flex items-center gap-2
          px-3 py-2
          rounded-lg
          border border-blue-200
          bg-gradient-to-br from-blue-50 to-blue-100
          text-blue-700
          text-sm
          font-medium
          hover:border-blue-300
          hover:bg-blue-100
          transition-all
        "
      >

        <Layout className="size-4" />

        <span className="hidden sm:inline">
          {selected.name}
        </span>

        <ChevronDown
          className={`
            size-3.5
            transition-transform
            ${isOpen ? 'rotate-180' : ''}
          `}
        />

      </button>

      {/* Dropdown */}
      {isOpen && (

        <div
          className="
            absolute
            right-0
            top-full
            mt-2
            w-[320px]
            max-w-[calc(100vw-2rem)]
            p-2
            z-50
            bg-white
            rounded-xl
            border border-gray-200
            shadow-xl
            shadow-gray-200/60
          "
        >

          {/* Dropdown Header */}
          <div className="px-3 pt-2 pb-3">

            <div className="flex items-center gap-2">

              <div className="
                flex items-center justify-center
                size-8
                rounded-lg
                bg-blue-50
                text-blue-600
              ">
                <Layout className="size-4" />
              </div>

              <div>
                <p className="text-sm font-semibold text-gray-900">
                  Choose a template
                </p>

                <p className="text-xs text-gray-500 mt-0.5">
                  Pick the style that fits your profile.
                </p>
              </div>

            </div>

          </div>

          {/* Template Options */}
          <div
            className="space-y-2 max-h-[420px] overflow-y-auto pr-1"
            role="listbox"
          >

            {templates.map((template) => {

              const isSelected =
                selectedTemplate === template.id

              return (
                <button
                  type="button"
                  key={template.id}
                  role="option"
                  aria-selected={isSelected}
                  onClick={() =>
                    handleSelect(template.id)
                  }
                  className={`
                    relative
                    w-full
                    text-left
                    p-3
                    rounded-xl
                    border
                    transition-all
                    ${
                      isSelected
                        ? 'border-blue-400 bg-blue-50'
                        : 'border-gray-200 bg-white hover:border-blue-200 hover:bg-gray-50'
                    }
                  `}
                >

                  {/* Selected Check */}
                  {isSelected && (
                    <div className="
                      absolute
                      top-3
                      right-3
                      flex items-center justify-center
                      size-5
                      rounded-full
                      bg-blue-600
                    ">
                      <Check className="size-3 text-white" />
                    </div>
                  )}

                  <div className="pr-8">

                    <div className="flex items-center gap-2">

                      <h4 className="
                        text-sm
                        font-semibold
                        text-gray-800
                      ">
                        {template.name}
                      </h4>

                      <span
                        className={`
                          text-[10px]
                          px-1.5
                          py-0.5
                          rounded-full
                          font-medium
                          ${
                            isSelected
                              ? 'bg-blue-100 text-blue-700'
                              : 'bg-gray-100 text-gray-500'
                          }
                        `}
                      >
                        {template.badge}
                      </span>

                    </div>

                    {/* Template Preview */}
                    <div
                      className={`
                        mt-2
                        h-16
                        rounded-lg
                        border
                        overflow-hidden
                        p-2
                        ${
                          isSelected
                            ? 'border-blue-100 bg-white'
                            : 'border-gray-100 bg-gray-50'
                        }
                      `}
                    >

                      {/* Mini visual representation */}
                      {template.id === 'classic' && (
                        <div className="space-y-1.5">
                          <div className="h-2 w-28 bg-gray-700 rounded-sm" />
                          <div className="h-1 w-20 bg-gray-300 rounded-sm" />
                          <div className="grid grid-cols-3 gap-2 mt-2">
                            <div className="col-span-1 space-y-1">
                              <div className="h-1 w-full bg-gray-300" />
                              <div className="h-1 w-4/5 bg-gray-200" />
                            </div>
                            <div className="col-span-2 space-y-1">
                              <div className="h-1 w-full bg-gray-300" />
                              <div className="h-1 w-5/6 bg-gray-200" />
                              <div className="h-1 w-3/4 bg-gray-200" />
                            </div>
                          </div>
                        </div>
                      )}

                      {template.id === 'modern' && (
                        <div className="flex gap-2">
                          <div className="w-1/4 rounded bg-blue-200" />
                          <div className="flex-1 space-y-1.5">
                            <div className="h-2 w-24 bg-gray-700 rounded-sm" />
                            <div className="h-1 w-16 bg-gray-300 rounded-sm" />
                            <div className="h-1 w-full bg-gray-200 rounded-sm mt-2" />
                            <div className="h-1 w-5/6 bg-gray-200 rounded-sm" />
                          </div>
                        </div>
                      )}

                      {template.id === 'minimal-image' && (
                        <div className="flex gap-3 items-center">
                          <div className="size-9 rounded-full bg-gray-200 shrink-0" />
                          <div className="flex-1 space-y-1.5">
                            <div className="h-2 w-28 bg-gray-700 rounded-sm" />
                            <div className="h-1 w-20 bg-gray-300 rounded-sm" />
                            <div className="h-1 w-full bg-gray-200 rounded-sm mt-2" />
                          </div>
                        </div>
                      )}

                      {template.id === 'minimal' && (
                        <div className="space-y-2">
                          <div className="h-2 w-32 bg-gray-700 rounded-sm" />
                          <div className="h-px w-full bg-gray-200" />
                          <div className="grid grid-cols-2 gap-2">
                            <div className="h-1 bg-gray-200 rounded-sm" />
                            <div className="h-1 bg-gray-200 rounded-sm" />
                          </div>
                        </div>
                      )}

                    </div>

                    <p className="
                      text-xs
                      leading-relaxed
                      text-gray-500
                      mt-2
                    ">
                      {template.description}
                    </p>

                  </div>

                </button>
              )
            })}

          </div>

          {/* Bottom Tip */}
          <div className="
            flex items-start gap-2
            mt-2
            px-3 py-2.5
            rounded-lg
            bg-purple-50
            border border-purple-100
          ">

            <Sparkles className="size-3.5 text-purple-500 mt-0.5 shrink-0" />

            <p className="text-[11px] leading-relaxed text-purple-700">
              <span className="font-semibold">
                Tip:
              </span>{' '}
              Choose a clean template for ATS-heavy applications
              and a more visual template when design matters.
            </p>

          </div>

        </div>
      )}

    </div>
  )
}

export default TemplateSelector
