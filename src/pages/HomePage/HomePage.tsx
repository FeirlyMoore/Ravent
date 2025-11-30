import Header from '@/components/layout/Header'
import HeroSection from '@/components/sections/HeroSection'
import ContrastSection from '@/components/sections/ContrastSection'
import CategorySlider from '@/components/sections/CategorySlider'
import EventGrid from '@/components/sections/EventGrid'

const HomePage = () => {
  return (
    <>
      <Header />
      <main className="pt-16 sm:pt-20">
        <HeroSection />
        <ContrastSection />
        <CategorySlider />
        <EventGrid />
      </main>
    </>
  )
}

export default HomePage
