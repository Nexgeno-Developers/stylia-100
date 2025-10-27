// Header.tsx - Updated
'use client'

import React from 'react'
import { Button } from '@/components/ui'
import { ROUTES } from '@/lib/constants'
import Link from 'next/link'
import { HeartIcon, SearchIcon, UserIcon } from 'lucide-react'
import Image from 'next/image'
import { useHeader } from '@/lib/contexts/HeaderContext'

export const Header: React.FC = () => {
  const { textColor } = useHeader()

  const textColorClass = textColor === 'white' ? 'text-white' : 'text-black'
  const hoverColorClass =
    textColor === 'white' ? 'hover:text-gray-300' : 'hover:text-gray-600'
  const logoFilterClass =
    textColor === 'white' ? 'brightness-0 invert' : 'brightness-0'
  const iconHoverClass =
    textColor === 'white' ? 'hover:bg-white/10' : 'hover:bg-black/10'

  return (
    <header className="absolute top-0 left-0 right-0 z-50 bg-transparent">
      <div className="px-[4vw]">
        <div className="flex justify-between items-center pt-[1.4vw]">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link
              href={ROUTES.HOME}
              className={`text-[1vw] ${textColorClass} font-kumbh-sans font-medium uppercase`}
            >
              <Image
                src="/images/logo.png"
                alt="Stylia"
                width={150}
                height={64}
                className={`w-[15vw] h-auto ${logoFilterClass}`}
              />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex space-x-6 xl:space-x-8">
            <Link
              href={ROUTES.HOME}
              className={`${textColorClass} ${hoverColorClass} transition-all duration-300 px-[0.9vw] py-[0.2vw] text-[1.3vw] font-kumbh-sans font-medium uppercase`}
            >
              Home
            </Link>
            <Link
              href={ROUTES.NEW_ARRIVALS}
              className={`${textColorClass} ${hoverColorClass} transition-all duration-300 px-[0.9vw] py-[0.2vw] text-[1.3vw] font-kumbh-sans font-medium uppercase`}
            >
              New Arrivals
            </Link>
            <Link
              href={ROUTES.WOMEN}
              className={`${textColorClass} ${hoverColorClass} transition-all duration-300 px-[0.9vw] py-[0.2vw] text-[1.3vw] font-kumbh-sans font-medium uppercase`}
            >
              Women
            </Link>
            <Link
              href={ROUTES.COLLECTIONS}
              className={`${textColorClass} ${hoverColorClass} transition-all duration-300 px-[0.9vw] py-[0.2vw] text-[1.3vw] font-kumbh-sans font-medium uppercase`}
            >
              Collections
            </Link>
            <Link
              href={ROUTES.SALE}
              className={`${textColorClass} ${hoverColorClass} transition-all duration-300 px-[0.9vw] py-[0.2vw] text-[1.3vw] font-kumbh-sans font-medium uppercase`}
            >
              Sale
            </Link>
            <Link
              href={ROUTES.CONTACT}
              className={`${textColorClass} ${hoverColorClass} transition-all duration-300 px-[0.9vw] py-[0.2vw] text-[1.3vw] font-kumbh-sans font-medium uppercase`}
            >
              Contact
            </Link>
          </nav>

          {/* Actions */}
          <div className="flex items-center space-x-[1.5vw]">
            <button
              className={`${iconHoverClass} ${textColorClass} rounded-2xl hover:scale-105 transition-all duration-300 p-2 cursor-pointer`}
            >
              <UserIcon
                className={`w-[1.8vw] h-[1.8vw] ${textColorClass} hover:scale-105 transition-all duration-300`}
              />
            </button>
            <button
              className={`${iconHoverClass} ${textColorClass} hover:scale-105 rounded-2xl transition-all duration-300 p-2 cursor-pointer`}
            >
              <SearchIcon
                className={`w-[1.8vw] h-[1.8vw] ${textColorClass} hover:scale-105  transition-all duration-300`}
              />
            </button>
            <button
              className={`${iconHoverClass} ${textColorClass} rounded-2xl hover:scale-105 transition-all duration-300 p-2 cursor-pointer`}
            >
              <HeartIcon
                className={`w-[1.8vw] h-[1.8vw] ${textColorClass} hover:scale-105  transition-all duration-300`}
              />
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden ml-2">
            <button
              type="button"
              className={`${textColorClass} ${hoverColorClass} focus:outline-none p-2`}
            >
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}
