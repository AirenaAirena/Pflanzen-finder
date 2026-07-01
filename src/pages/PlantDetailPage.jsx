import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import '../styles/PlantDetailPage.css'

function PlantDetailPage() {
  const navigate = useNavigate()
  const { id } = useParams()
  const [plant, setPlant] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [reloadKey, setReloadKey] = useState(0)

  useEffect(() => {
    const controller = new AbortController()
    const load = async () => {
      try {
        setLoading(true)
        setError(false)
        const API_KEY = import.meta.env.VITE_PERENUAL_API_KEY
        const res = await fetch(
          `https://perenual.com/api/v2/species/details/${id}?key=${API_KEY}`,
          { signal: controller.signal },
        )

        if (!res.ok) {
          setError(true)
          return
        }

        const data = await res.json()
        setPlant({
          id: data.id,
          name: data.common_name,
          genus: data.scientific_name?.[0],
          family: data.family,
          description: data.description,
          image:
            data.default_image?.original_url ||
            'https://via.placeholder.com/600',
        })
      } catch (e) {
        if (e.name !== 'AbortError') setError(true)
      } finally {
        setLoading(false)
      }
    }

    load()
    return () => controller.abort()
  }, [id, reloadKey])

  const handleRetry = () => {
    setReloadKey((prev) => prev + 1)
  }

  if (loading) {
    return <div className="loading">Loading...</div>
  }

  if (error || !plant) {
    return (
      <div className="error-state">
        <button className="back-btn" onClick={() => navigate(-1)}>
          ←
        </button>
        <p>Something went wrong, please try again</p>
        <button className="retry-btn" onClick={handleRetry}>
          Retry
        </button>
      </div>
    )
  }

  return (
    <div className="plant-detail">
      {/* IMAGE HEADER */}
      <div className="plant-hero">
        <button className="back-btn" onClick={() => navigate(-1)}>
          ←
        </button>

        <img src={plant.image} alt={plant.name} />
      </div>

      {/* CONTENT */}
      <div className="plant-content">
        <h1>{plant.name}</h1>

        <div className="meta">
          <p>
            <b>Genus:</b> {plant.genus}
          </p>
          <p>
            <b>Family:</b> {plant.family}
          </p>
        </div>

        <p className="desc">{plant.description}</p>
      </div>
    </div>
  )
}

export default PlantDetailPage
