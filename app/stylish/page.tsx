import { Header } from '@/components/layout'
import {
  HeroSection,
  Display,
  StyliaAbout,
  LuxuryGallery,
  ExpertiseSection,
  StyleCTASection,
  ClienteleSection,
  TestimonialsSection,
} from '@/sections/stylish'

export default function StylishPage() {
  return (
    <main>
      <HeroSection />
      <Display />
      <StyliaAbout />
      <LuxuryGallery />
      <ExpertiseSection />
      <TestimonialsSection />
      <ClienteleSection />
      <StyleCTASection />
    </main>
  )
}
