import React from 'react'
import { Routes, Route } from 'react-router-dom'
import OnboardingPage from './pages/OnboardingPage'
import HomePage1 from './pages/HomePage1'
import IdentifyPage from './pages/IdentifyPage'
import ResultPage from './pages/ResultPage'
import DetailPage from './pages/DetailPage'
import FavoritesPage from './pages/FavoritesPage'

function App() {
  return (
    <Routes>
      <Route path="/" element={<OnboardingPage />} />
      <Route path="/home" element={<HomePage1 />} />
      <Route path="/identify" element={<IdentifyPage />} />

      <Route path="/result" element={<ResultPage />} />
      <Route path="/detail" element={<DetailPage />} />
      <Route path="/favorites" element={<FavoritesPage />} />
    </Routes>
  )
}

export default App
