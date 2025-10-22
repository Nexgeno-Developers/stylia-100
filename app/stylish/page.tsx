import { Header } from '@/components/layout'
import { HeroSection, Display  ,StyliaAbout , LuxuryGallery } from '@/sections/stylish'

export default function StylishPage() {
  return (
    <main>
      <HeroSection />
      <Display />
      <StyliaAbout />
      <LuxuryGallery />
    </main>
  )
}
