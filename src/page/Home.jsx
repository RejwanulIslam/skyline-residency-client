import AboutBuilding from '../component/AboutBuilding'
import AutoCarousel from '../component/carousel/AutoCarousel'
import Cuppon from '../component/Cuppon'
import GoogleMap from '../component/GoogleMap'

export default function Home() {
  return (
    <div>
      <AutoCarousel></AutoCarousel>
      <AboutBuilding></AboutBuilding>
      <Cuppon></Cuppon>
      <GoogleMap></GoogleMap>

    </div>
  )
}
