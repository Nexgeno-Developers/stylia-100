// Updated home page with new structure
import {
  HeroSection,
  PerfectFitSection,
  KnowMoreSection,
  StyliaDiscoverSection,
  CallToActionSection,
  LookbookSection,
  RedefiningFashionSection,
  TrendingNowSection,
  ProductShowcase,
  StyliaMagazineSection,
} from '@/sections/home'

export default function Home() {
  return (
    <main>
      <HeroSection />
      <PerfectFitSection />
      <KnowMoreSection />
      <StyliaDiscoverSection />
      <RedefiningFashionSection />
      <LookbookSection />
      <TrendingNowSection />
      <ProductShowcase />
      <StyliaMagazineSection />
      {/* <CallToActionSection /> */}
    </main>
  )
}
