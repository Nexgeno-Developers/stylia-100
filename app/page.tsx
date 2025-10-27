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
    <main className="overflow-x-hidden scroll-smooth">
      <section className="h-screen w-full">
        <HeroSection />
      </section>
      <div className="h-[5vw]"></div>
      <section className="h-screen w-full">
        <PerfectFitSection />
      </section>
      <div className="h-[5vw]"></div>
      <section className="h-screen w-full">
        <KnowMoreSection />
      </section>
      <section className="h-screen w-full">
        <StyliaDiscoverSection />
      </section>
      <section className="h-screen w-full">
        <RedefiningFashionSection />
      </section>
      <section className="h-screen w-full">
        <LookbookSection />
      </section>
      <section className="h-screen w-full">
        <TrendingNowSection />
      </section>
      <section className="h-screen w-full">
        <ProductShowcase />
      </section>
      <StyliaMagazineSection />
      {/* <section className="h-screen w-full">
        <CallToActionSection />
      </section> */}
    </main>
  )
}
