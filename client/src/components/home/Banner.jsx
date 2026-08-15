import React from 'react'
import { Sparkles } from 'lucide-react'

const Banner = () => {
    return (
        <div className="w-full px-4 py-2.5 bg-gradient-to-r from-[#ABFF7E] via-[#F3FFE9] to-[#FDFEFF] text-green-900">
            <div className="flex items-center justify-center gap-2 text-xs sm:text-sm font-medium text-center">

                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-green-600 text-white shadow-sm">
                    <Sparkles className="size-3.5" />
                    <span>New</span>
                </span>

                <span>
                    AI-powered resume enhancement is now available
                </span>

            </div>
        </div>
    )
}

export default Banner
