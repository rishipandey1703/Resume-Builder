import {
    BriefcaseBusiness,
    Globe,
    Linkedin,
    Mail,
    MapPin,
    Phone,
    User,
    Upload,
    Image as ImageIcon,
} from 'lucide-react'
import React, { useEffect, useState } from 'react'

const PersonalInfoForm = ({
    data,
    onChange,
    removeBackground,
    setRemoveBackground,
}) => {

    const [imagePreview, setImagePreview] = useState(null)

    const handleChange = (field, value) => {
        onChange({
            ...data,
            [field]: value
        })
    }

    /*
     * Create a temporary preview URL only when the selected image changes.
     * This avoids creating a new object URL on every render.
     */
    useEffect(() => {
        if (!data?.image) {
            setImagePreview(null)
            return
        }

        if (typeof data.image === 'string') {
            setImagePreview(data.image)
            return
        }

        if (data.image instanceof File) {
            const objectUrl = URL.createObjectURL(data.image)
            setImagePreview(objectUrl)

            return () => {
                URL.revokeObjectURL(objectUrl)
            }
        }

        setImagePreview(null)
    }, [data?.image])

    const handleImageChange = (e) => {
        const file = e.target.files?.[0]

        if (!file) return

        if (!['image/jpeg', 'image/png'].includes(file.type)) {
            alert('Please upload a JPG or PNG image.')
            e.target.value = ''
            return
        }

        // Keep the existing backend flow: store the File object in resume data.
        handleChange('image', file)
    }

    const fields = [
        {
            key: 'full_name',
            label: 'Full Name',
            icon: User,
            type: 'text',
            required: true,
            placeholder: 'e.g. Rishi Pandey',
            description: 'Use the name you want employers to see on your resume.',
        },
        {
            key: 'email',
            label: 'Email Address',
            icon: Mail,
            type: 'email',
            required: true,
            placeholder: 'e.g. you@example.com',
        },
        {
            key: 'phone',
            label: 'Phone Number',
            icon: Phone,
            type: 'tel',
            placeholder: 'e.g. +91 98765 43210',
        },
        {
            key: 'location',
            label: 'Location',
            icon: MapPin,
            type: 'text',
            placeholder: 'e.g. Ghaziabad, Uttar Pradesh',
        },
        {
            key: 'profession',
            label: 'Professional Title',
            icon: BriefcaseBusiness,
            type: 'text',
            placeholder: 'e.g. B.Tech CSE (AI & ML) Student',
        },
        {
            key: 'linkedin',
            label: 'LinkedIn Profile',
            icon: Linkedin,
            type: 'url',
            placeholder: 'https://linkedin.com/in/your-profile',
        },
        {
            key: 'website',
            label: 'Personal Website',
            icon: Globe,
            type: 'url',
            placeholder: 'https://yourwebsite.com',
        },
    ]

    return (
        <div className="w-full">

            {/* Header */}
            <div className="mb-7">
                <div className="flex items-center gap-3">
                    <div className="flex items-center justify-center size-10 rounded-xl bg-green-50 border border-green-100">
                        <User className="size-5 text-green-600" />
                    </div>

                    <div>
                        <h3 className="text-lg font-semibold text-slate-900">
                            Personal Information
                        </h3>

                        <p className="text-sm text-slate-500 mt-0.5">
                            Add the contact details you want employers to see.
                        </p>
                    </div>
                </div>
            </div>

            {/* Profile image section */}
            <div className="rounded-2xl border border-slate-200 bg-slate-50/70 p-5 mb-7">

                <div className="flex flex-col sm:flex-row sm:items-center gap-5">

                    {/* Image */}
                    <label
                        htmlFor="profile-image"
                        className="relative shrink-0 cursor-pointer group"
                    >
                        {imagePreview ? (
                            <div className="relative">
                                <img
                                    src={imagePreview}
                                    alt="Profile preview"
                                    className="size-20 rounded-2xl object-cover border border-slate-200 shadow-sm"
                                />

                                <div className="absolute inset-0 rounded-2xl bg-black/45 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                    <Upload className="size-5 text-white" />
                                </div>
                            </div>
                        ) : (
                            <div className="size-20 rounded-2xl border-2 border-dashed border-slate-300 bg-white flex flex-col items-center justify-center gap-1 text-slate-400 group-hover:border-green-400 group-hover:text-green-600 transition-colors">
                                <ImageIcon className="size-6" />
                                <span className="text-[10px] font-medium">
                                    Add photo
                                </span>
                            </div>
                        )}

                        <input
                            id="profile-image"
                            type="file"
                            accept="image/jpeg,image/png"
                            className="hidden"
                            onChange={handleImageChange}
                        />
                    </label>

                    {/* Image information */}
                    <div className="flex-1">
                        <div className="flex items-center gap-2">
                            <h4 className="text-sm font-semibold text-slate-800">
                                Profile Photo
                            </h4>

                            <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-white border border-slate-200 text-slate-500">
                                Optional
                            </span>
                        </div>

                        <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">
                            Add a professional photo to personalize your resume.
                            JPG and PNG images are supported.
                        </p>

                        <label
                            htmlFor="profile-image"
                            className="inline-flex items-center gap-2 mt-3 px-3.5 py-2 rounded-lg bg-white border border-slate-200 text-xs font-medium text-slate-700 hover:border-green-300 hover:text-green-700 hover:bg-green-50 transition-colors cursor-pointer"
                        >
                            <Upload className="size-3.5" />
                            {imagePreview ? 'Change photo' : 'Upload photo'}
                        </label>
                    </div>

                    {/* Background removal */}
                    {typeof data?.image === 'object' && data?.image && (
                        <div className="sm:border-l sm:border-slate-200 sm:pl-5 pt-4 sm:pt-0">
                            <p className="text-xs font-semibold text-slate-700 mb-2">
                                Remove background
                            </p>

                            <label className="inline-flex items-center gap-3 cursor-pointer select-none">

                                <input
                                    type="checkbox"
                                    className="sr-only peer"
                                    checked={removeBackground}
                                    onChange={() =>
                                        setRemoveBackground(
                                            prev => !prev
                                        )
                                    }
                                />

                                <div className="relative w-10 h-5 rounded-full bg-slate-300 peer-checked:bg-green-500 transition-colors duration-200">
                                    <span className="absolute left-0.5 top-0.5 size-4 rounded-full bg-white shadow-sm transition-transform duration-200 peer-checked:translate-x-5" />
                                </div>

                                <span className="text-xs text-slate-600">
                                    {removeBackground ? 'Enabled' : 'Disabled'}
                                </span>

                            </label>

                            <p className="text-[11px] text-slate-400 mt-1.5 max-w-[180px]">
                                Automatically remove the background from your
                                uploaded photo.
                            </p>
                        </div>
                    )}

                </div>
            </div>

            {/* Form fields */}
            <div className="space-y-5">

                {fields.map((field) => {
                    const Icon = field.icon

                    return (
                        <div key={field.key} className="space-y-2">

                            {/* Label */}
                            <label
                                htmlFor={`personal-${field.key}`}
                                className="flex items-center gap-2 text-sm font-medium text-slate-700"
                            >
                                <Icon className="size-4 text-slate-400" />

                                <span>{field.label}</span>

                                {field.required && (
                                    <span className="text-red-500">
                                        *
                                    </span>
                                )}
                            </label>

                            {/* Input */}
                            <div className="relative">
                                <input
                                    id={`personal-${field.key}`}
                                    type={field.type}
                                    value={data?.[field.key] || ''}
                                    onChange={(e) =>
                                        handleChange(
                                            field.key,
                                            e.target.value
                                        )
                                    }
                                    placeholder={field.placeholder}
                                    required={field.required}
                                    autoComplete={
                                        field.key === 'full_name'
                                            ? 'name'
                                            : field.key === 'email'
                                                ? 'email'
                                                : field.key === 'phone'
                                                    ? 'tel'
                                                    : 'off'
                                    }
                                    className="w-full h-11 px-3.5 rounded-xl border border-slate-200 bg-white text-sm text-slate-800 placeholder:text-slate-400 outline-none transition-all duration-200 focus:border-green-500 focus:ring-4 focus:ring-green-500/10 hover:border-slate-300"
                                />
                            </div>

                            {/* Optional helper text */}
                            {field.description && (
                                <p className="text-[11px] text-slate-400">
                                    {field.description}
                                </p>
                            )}

                        </div>
                    )
                })}

            </div>

            {/* Bottom tip */}
            <div className="mt-7 rounded-xl border border-green-100 bg-green-50/60 px-4 py-3">
                <div className="flex gap-3">
                    <div className="shrink-0 mt-0.5">
                        <div className="size-5 rounded-full bg-green-100 flex items-center justify-center">
                            <span className="text-[11px] font-bold text-green-700">
                                i
                            </span>
                        </div>
                    </div>

                    <p className="text-xs leading-relaxed text-green-800">
                        <span className="font-semibold">
                            Resume tip:
                        </span>{' '}
                        Keep your name, email and phone number accurate and
                        professional. These are the details recruiters are most
                        likely to use when contacting you.
                    </p>
                </div>
            </div>

        </div>
    )
}

export default PersonalInfoForm
