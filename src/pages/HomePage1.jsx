import { useState } from 'react'
// import OnboardingSlide from '../components/onboarding/OnboardingSlide.jsx'
// import OnboardingDots from '../components/onboarding/OnboardingDots.jsx'
import '../styles/HomePage1.css'

function HomePage1() {
  return (
    <div className="home">
      <header className="home-header">
        <div>
          <h1>Welcome to</h1>
          <h2>Plant Identifier</h2>
        </div>

        <a href="/settings" class="setting-icon" target="_self">
          <img src="../src/assets/img/setting.svg" alt="setting" />
        </a>
      </header>

      <div className="container trans">
        <div className="search-bar">
          <input type="text" placeholder="Search For Plants" />
        </div>
        <div className="help-banner">
          <h3>Do you need Help</h3>
          <p>Click here</p>
        </div>

        <div className="actions">
          <button className="action-btn">
            <img
              src="../src/assets/img/photo.svg"
              alt="photo"
              className="actions-icon"
            />
            <span>Scan and Identify</span>
          </button>
          <button className="action-btn">
            <img
              src="../src/assets/img/camera.svg"
              alt="camera"
              className="actions-icon"
            />
            <span> Photo Identify</span>
          </button>
        </div>

        <div className="disease-banner">
          <h3>Plant Disease</h3>
        </div>
      </div>
    </div>
  )
}

export default HomePage1
