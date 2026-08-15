import {
  Check,
  ChevronDown,
  Palette,
  Sparkles
} from 'lucide-react'
import React, { useEffect, useRef, useState } from 'react'

const ColorPicker = ({ selectedColor, onChange }) => {

  const colors = [
    { name: 'Blue', value: '#3B82F6' },
    { name: 'Indigo', value: '#6366F1' },
    { name: 'Purple', value: '#8B5CF6' },
    { name: 'Green', value: '#10B981' },
    { name: 'Red', value: '#EF4444' },
    { name: 'Orange', value: '#F97316' },
    { name: 'Teal', value: '#14B8A6' },
    { name: 'Pink', value: '#EC4899' },
    { name: 'Gray', value: '#6B7280' },
    { name: 'Black', value: '#1F2937'
    }
  ]

  const [isOpen, setIsOpen] = useState(false)
  const pickerRef = useRef(null)

  const selected =
    colors.find(color => color.value === selectedColor) ||
    colors[0]

  /* Close when clicking outside */
  useEffect(() => {

    const handleClickOutside = (event) => {
      if (
        pickerRef.current &&
        !pickerRef.current.contains(event.target)
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

  /* Close with Escape */
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

  const handleColorSelect = (color) => {
    onChange(color.value)
    setIsOpen(false)
  }

  return (
    <div
      ref={pickerRef}
      className="relative"
    >

      {/* Color Button */}
      <button
        type="button"
        onClick={() => setIsOpen(prev => !prev)}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        className="
          flex items-center gap-2
          px-3 py-2
          rounded-lg
          border border-purple-200
          bg-gradient-to-br from-purple-50 to-purple-100
          text-purple-700
          text-sm
          font-medium
          hover:border-purple-300
          hover:bg-purple-100
          transition-all
        "
      >

        {/* Current Color */}
        <span
          className="size-4 rounded-full border border-white shadow-sm ring-1 ring-purple-200"
          style={{
            backgroundColor: selected.value
          }}
        />

        <Palette className="size-4" />

        <span className="hidden sm:inline">
          Accent
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
            left-0
            top-full
            mt-2
            w-[280px]
            max-w-[calc(100vw-2rem)]
            p-3
            z-50
            bg-white
            rounded-xl
            border border-gray-200
            shadow-xl
            shadow-gray-200/60
          "
        >

          {/* Header */}
          <div className="flex items-center gap-3 px-1 pb-3">

            <div className="
              flex items-center justify-center
              size-8
              rounded-lg
              bg-purple-50
              text-purple-600
            ">
              <Palette className="size-4" />
            </div>

            <div>
              <p className="text-sm font-semibold text-gray-900">
                Accent Color
              </p>

              <p className="text-xs text-gray-500 mt-0.5">
                Choose a color for your resume.
              </p>
            </div>

          </div>

          {/* Color Grid */}
          <div
            className="grid grid-cols-5 gap-2"
            role="listbox"
            aria-label="Resume accent colors"
          >

            {colors.map((color) => {

              const isSelected =
                selectedColor === color.value

              return (
                <button
                  type="button"
                  key={color.value}
                  role="option"
                  aria-selected={isSelected}
                  aria-label={`Select ${color.name}`}
                  onClick={() =>
                    handleColorSelect(color)
                  }
                  className="
                    group
                    flex
                    flex-col
                    items-center
                    gap-1.5
                    p-1.5
                    rounded-lg
                    hover:bg-gray-50
                    transition-colors
                  "
                >

                  <div
                    className={`
                      relative
                      flex
                      items-center
                      justify-center
                      size-10
                      rounded-full
                      border-2
                      transition-all
                      ${
                        isSelected
                          ? 'border-white ring-2 ring-offset-1'
                          : 'border-white group-hover:ring-2 group-hover:ring-gray-200'
                      }
                    `}
                    style={{
                      backgroundColor: color.value,
                      '--tw-ring-color': isSelected
                        ? color.value
                        : undefined
                    }}
                  >

                    {isSelected && (
                      <Check
                        className="size-4 text-white drop-shadow"
                        strokeWidth={3}
                      />
                    )}

                  </div>

                  <span
                    className={`
                      text-[10px]
                      font-medium
                      ${
                        isSelected
                          ? 'text-gray-900'
                          : 'text-gray-500'
                      }
                    `}
                  >
                    {color.name}
                  </span>

                </button>
              )
            })}

          </div>

          {/* Current Selection */}
          <div className="
            flex items-center justify-between
            mt-3
            pt-3
            border-t border-gray-100
          ">

            <div className="flex items-center gap-2">

              <span
                className="size-5 rounded-full border border-white shadow-sm ring-1 ring-gray-200"
                style={{
                  backgroundColor: selected.value
                }}
              />

              <span className="text-xs text-gray-600">
                {selected.name}
              </span>

            </div>

            <span className="text-[10px] text-gray-400 uppercase">
              {selected.value}
            </span>

          </div>

          {/* Tip */}
          <div className="
            flex items-start gap-2
            mt-3
            px-3 py-2.5
            rounded-lg
            bg-purple-50
            border border-purple-100
          ">

            <Sparkles className="
              size-3.5
              text-purple-500
              mt-0.5
              shrink-0
            " />

            <p className="
              text-[11px]
              leading-relaxed
              text-purple-700
            ">
              <span className="font-semibold">
                Tip:
              </span>{' '}
              Blue, green and dark tones usually work well for
              professional and ATS-friendly resumes.
            </p>

          </div>

        </div>
      )}

    </div>
  )
}

export default ColorPicker
