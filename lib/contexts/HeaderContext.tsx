'use client'

import React, { createContext, useContext, useState, ReactNode } from 'react'

interface HeaderContextType {
  textColor: 'white' | 'black'
  setTextColor: (color: 'white' | 'black') => void
}

const HeaderContext = createContext<HeaderContextType | undefined>(undefined)

export const HeaderProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [textColor, setTextColor] = useState<'white' | 'black'>('white')

  return (
    <HeaderContext.Provider value={{ textColor, setTextColor }}>
      {children}
    </HeaderContext.Provider>
  )
}

export const useHeader = (): HeaderContextType => {
  const context = useContext(HeaderContext)
  if (context === undefined) {
    throw new Error('useHeader must be used within a HeaderProvider')
  }
  return context
}
