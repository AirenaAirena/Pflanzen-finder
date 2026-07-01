import React from 'react'
import { Routes, Route } from 'react-router-dom'
import OnboardingPage from './pages/OnboardingPage'
import HomePage1 from './pages/HomePage1'
import SettingsPage from './pages/SettingsPage'
import IdentifyPage from './pages/IdentifyPage'
import ResultPage from './pages/ResultPage'
import DetailPage from './pages/DetailPage'
import FavoritesPage from './pages/FavoritesPage'
import SearchPage from './pages/SearchPage'
import PlantDetailPage from './pages/PlantDetailPage'
import PlantIdentifierPage from './pages/PlantIdentifierPage'
import PlantDiseasePage from './pages/PlantDiseasePage'

function App() {
  return (
    <Routes>
      <Route path="/" element={<OnboardingPage />} />
      <Route path="/home" element={<HomePage1 />} />
      <Route path="/settings" element={<SettingsPage />} />
      <Route path="/identify" element={<IdentifyPage />} />

      <Route path="/result" element={<ResultPage />} />
      <Route path="/detail" element={<DetailPage />} />
      <Route path="/favorites" element={<FavoritesPage />} />
      <Route path="/search" element={<SearchPage />} />
      <Route path="/plant/:id" element={<PlantDetailPage />} />
      <Route path="/plant-identifier" element={<PlantIdentifierPage />} />
      <Route path="/disease-result" element={<PlantDiseasePage />} />
    </Routes>
  )
}

export default App
