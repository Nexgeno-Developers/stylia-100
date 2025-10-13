// Header.tsx - Updated
import React from 'react'
import { Button } from '@/components/ui'
import { ROUTES } from '@/lib/constants'
import Link from 'next/link'
import { HeartIcon, SearchIcon, UserIcon } from 'lucide-react'
import Image from 'next/image'

export const Header: React.FC = () => {
  return (
    <header className="absolute top-0 left-0 right-0 z-50 bg-transparent">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-24 sm:h-28 lg:h-32">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link
              href={ROUTES.HOME}
              className="text-2xl text-white font-kumbh-sans font-medium uppercase"
            >
              <Image
                src="/images/logo.png"
                alt="Stylia"
                width={150}
                height={64}
                className="sm:w-[180px] lg:w-[218px] h-auto brightness-0 invert"
              />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex space-x-6 xl:space-x-8">
            <Link
              href={ROUTES.HOME}
              className="text-white hover:text-gray-300 transition-all duration-300 px-2 py-2 text-base xl:text-lg font-kumbh-sans font-medium uppercase"
            >
              Home
            </Link>
            <Link
              href={ROUTES.NEW_ARRIVALS}
              className="text-white hover:text-gray-300 transition-all duration-300 px-2 py-2 text-base xl:text-lg font-kumbh-sans font-medium uppercase"
            >
              New Arrivals
            </Link>
            <Link
              href={ROUTES.WOMEN}
              className="text-white hover:text-gray-300 transition-all duration-300 px-2 py-2 text-base xl:text-lg font-kumbh-sans font-medium uppercase"
            >
              Women
            </Link>
            <Link
              href={ROUTES.COLLECTIONS}
              className="text-white hover:text-gray-300 transition-all duration-300 px-2 py-2 text-base xl:text-lg font-kumbh-sans font-medium uppercase"
            >
              Collections
            </Link>
            <Link
              href={ROUTES.SALE}
              className="text-white hover:text-gray-300 transition-all duration-300 px-2 py-2 text-base xl:text-lg font-kumbh-sans font-medium uppercase"
            >
              Sale
            </Link>
            <Link
              href={ROUTES.CONTACT}
              className="text-white hover:text-gray-300 transition-all duration-300 px-2 py-2 text-base xl:text-lg font-kumbh-sans font-medium uppercase"
            >
              Contact
            </Link>
          </nav>

          {/* Actions */}
          <div className="flex items-center space-x-2 sm:space-x-4">
            <Button
              variant="ghost"
              size="sm"
              className="hover:bg-white/10 hover:text-white transition-all duration-300 p-2"
            >
              <UserIcon className="h-5 w-5 text-white hover:scale-110 transition-all duration-300" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="hover:bg-white/10 hover:text-white transition-all duration-300 p-2"
            >
              <SearchIcon className="h-5 w-5 text-white hover:scale-110 transition-all duration-300" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="hover:bg-white/10 hover:text-white transition-all duration-300 p-2"
            >
              <HeartIcon className="h-5 w-5 text-white hover:scale-110 transition-all duration-300" />
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden ml-2">
            <button
              type="button"
              className="text-white hover:text-gray-300 focus:outline-none p-2"
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
