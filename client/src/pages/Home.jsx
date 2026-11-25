import BrandStory from '../components/home/BrandStory'
import ShopByColour from '../components/home/ShopByColour'
import SnugDifference from '../components/home/SnugDifference'
import SnugExperience from '../components/home/SnugExperience'
import CustomerReviews from '../components/home/CustomerReviews'
import WorldOfSnug from '../components/home/WorldOfSnug'
import HeroSection from '../components/hero/HeroSection'
import NewArrivals from '../components/hero/NewArrivals'

export default function Home() {
  return (
    <>
      <HeroSection />
      <NewArrivals />
      <BrandStory />
      <ShopByColour />
      <SnugDifference />
      <SnugExperience />
      <CustomerReviews />
      <WorldOfSnug />
    </>
  )
}
