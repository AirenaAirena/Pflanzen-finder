import { useState } from 'react'
import OnboardingSlide from '../components/onboarding/OnboardingSlide.jsx'
import OnboardingDots from '../components/onboarding/OnboardingDots.jsx'
import '../styles/onboarding.css'
const slides = [
  {
    title: 'Identify Plants',
    description:
      "You can identify the plants you don't know through your camera",
    image: '/src/assets/img/slide1.png',
  },
  {
    title: 'Learn Many Plants Species',
    description:
      "Let's learn about the many plant species that exist in the world",
    image: '/src/assets/img/slide2.png',
  },
  {
    title: 'Read Many Articles About Plant',
    description:
      "Let's learn more about beautiful plants and read many articles about plants and gardening",
    image: '/src/assets/img/slide3.png',
  },
]

export default function Onboarding() {
  const [current, setCurrent] = useState(0)

  const nextSlide = () => {
    if (current < slides.length - 1) {
      setCurrent(current + 1)
    } else {
      console.log('Go to Home page')
    }
  }

  return (
    <div className="onboarding">
      <OnboardingSlide data={slides[current]} />
      <OnboardingDots total={slides.length} current={current} />
      <button className="onboarding-btn" onClick={nextSlide}>
        NEXT
      </button>
    </div>
  )
}
