import { useEffect, useRef, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { searchPlants } from '../api/plants'
import PageHeader from '../components/PageHeader'
import '../styles/SearchPage.css'

function SearchPage() {
  const navigate = useNavigate()
  const inputRef = useRef(null)
  const debounceRef = useRef(null)
  const abortRef = useRef(null)
  const [loading, setLoading] = useState(false)

  const [plants, setPlants] = useState([])
  const [searchParams, setSearchParams] = useSearchParams()
  const [query, setQuery] = useState(searchParams.get('q') || '')
  const [error, setError] = useState(false)

  const fetchPlants = async (value) => {
    if (!value || value.trim().length <= 1) {
      setPlants([])

      return
    }
    if (abortRef.current) abortRef.current.abort()

    const controller = new AbortController()
    abortRef.current = controller
    setLoading(true)
    try {
      const result = await searchPlants(value, {
        signal: controller.signal,
      })
      if (abortRef.current === controller) {
        setPlants(result)
        setError(false)
      }
    } catch (err) {
      if (err.name !== 'AbortError' && abortRef.current === controller) {
        setError(true)
      }
    } finally {
      if (abortRef.current === controller) {
        setLoading(false)
      }
    }
  }

  const handleChange = (e) => {
    const value = e.target.value
    setQuery(value)

    if (debounceRef.current) {
      clearTimeout(debounceRef.current)
    }

    debounceRef.current = setTimeout(() => {
      setSearchParams(value ? { q: value } : {})
    }, 500)
  }

  useEffect(() => {
    const q = searchParams.get('q') || ''
    setQuery(q)
    if (q.trim().length > 1) {
      fetchPlants(q)
    } else {
      setPlants([])
    }
  }, [searchParams])

  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  useEffect(() => {
    return () => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current)
      }

      if (abortRef.current) {
        abortRef.current.abort()
      }
    }
  }, [])

  return (
    <div className="search-page">
      {/* TOP BAR */}
      <PageHeader title="Search Plant" />
      {/* SEARCH INPUT */}
      <div className="search-wrapper">
        <div className="search-input search-bar">
          <input
            ref={inputRef}
            type="text"
            placeholder="Search plants..."
            value={query}
            onChange={handleChange}
          />
        </div>
      </div>

      {error && (
        <div className="error-state">
          Something went wrong, please try again
        </div>
      )}
      {!loading && !error && query.trim().length > 1 && plants.length === 0 && (
        <div className="empty-state">No plants found</div>
      )}
      {loading && <div className="loading">Loading...</div>}

      <div className="plant-list">
        {plants.map((plant) => (
          <div
            className="plant-card"
            key={plant.id}
            onClick={() => {
              navigate(`/plant/${plant.id}`)
            }}
          >
            <img src={plant.image} alt={plant.name} />

            <div className="plant-info">
              <div className="title">{plant.name}</div>
              <div className="subtitle">{plant.description}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
export default SearchPage
