import { CTASection } from '@/components/sections/CTASection'
import { HeroSection } from '@/components/sections/HeroSection'
import { ServicesGrid } from '@/components/sections/ServicesGrid'
import { StatsSection } from '@/components/sections/StatsSection'

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <StatsSection />
      <ServicesGrid />
      <CTASection />
    </>
  )
}
