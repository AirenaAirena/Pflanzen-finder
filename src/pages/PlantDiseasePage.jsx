import { useLocation, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import PageHeader from '../components/PageHeader'
import '../styles/PlantDiseasePage.css'

export default function PlantDiseasePage() {
  const { state } = useLocation()
  const navigate = useNavigate()
  const [diseases, setDiseases] = useState([])
  const [loading, setLoading] = useState(true)

  const result = state?.result

  useEffect(() => {
    const fetchDiseases = async () => {
      try {
        // Get plant name from Plant.id result
        const name = result?.suggestions?.[0]?.plant_name || 'plant'

        const response = await fetch(
          `https://perenual.com/api/pest-disease-list?key=${import.meta.env.VITE_PERENUAL_API_KEY}&page=1`,
        )
        const data = await response.json()
        setDiseases(data.data || [])
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchDiseases()
  }, [])

  return (
    <div className="disease-page">
      <PageHeader title="Plant Disease" />

      <main className="disease-list">
        {loading && <p className="disease-loading">Loading...</p>}

        {!loading && diseases.length === 0 && (
          <p className="disease-empty">No diseases found for this plant.</p>
        )}

        {diseases.map((disease) => (
          <div key={disease.id} className="disease-card">
            <img
              src={
                disease.images?.[0]?.thumbnail ||
                disease.images?.[0]?.small_url ||
                ''
              }
              alt={disease.common_name}
              className="disease-img"
            />
            <div className="disease-info">
              <h3 className="disease-name">{disease.common_name}</h3>
              <p className="disease-label">KINGDOM</p>
              <p className="disease-value">{disease.family}</p>
              <p className="disease-label">DESCRIPTION</p>
              <p className="disease-desc">
                {disease.description?.[0]?.description?.slice(0, 80)}...
              </p>
            </div>
          </div>
        ))}
      </main>
    </div>
  )
}
