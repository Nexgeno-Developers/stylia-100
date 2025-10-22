import React from 'react'
import Image from 'next/image'

export const Display: React.FC = () => {
  return (
    <section className="h-[600px] sm:h-[700px] md:h-[800px] lg:h-[930px] relative overflow-hidden">
        <Image
          src="/images/display/display.png" // 🖼️ replace with your actual image path in /public
          alt="Display Section"
          fill
          priority
          className="object-cover"
        />

    </section>
  )
}
