import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import OnboardingSlide from '../components/onboarding/OnboardingSlide.jsx'
import OnboardingDots from '../components/onboarding/OnboardingDots.jsx'
import slide1 from '../assets/img/slide1.png'
import slide2 from '../assets/img/slide2.png'
import slide3 from '../assets/img/slide3.png'
import '../styles/onboarding.css'
const slides = [
  {
    title: 'Identify Plants',
    description:
      "You can identify the plants you don't know through your camera",
    image: slide1,
  },
  {
    title: 'Learn Many Plants Species',
    description:
      "Let's learn about the many plant species that exist in the world",
    image: slide2,
  },
  {
    title: 'Read Many Articles About Plant',
    description:
      "Let's learn more about beautiful plants and read many articles about plants and gardening",
    image: slide3,
  },
]

export default function Onboarding() {
  const [current, setCurrent] = useState(0)
  const navigate = useNavigate()

  const nextSlide = () => {
    if (current < slides.length - 1) {
      setCurrent(current + 1)
    } else {
      navigate('/home')
    }
  }

  return (
    <div className="container">
      <div className="onboarding">
        <OnboardingSlide data={slides[current]} />
        <OnboardingDots total={slides.length} current={current} />
        <button className="onboarding-btn" onClick={nextSlide}>
          NEXT
        </button>
      </div>
    </div>
  )
}
