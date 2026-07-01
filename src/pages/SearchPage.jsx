import { useEffect, useRef } from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { searchPlants } from '../api/plants'
import { useSearchParams } from 'react-router-dom'
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
      <header className="top-bar">
        <button className="back-btn" onClick={() => navigate(-1)}>
          <svg
            className="back-arrow"
            width="30"
            height="23"
            viewBox="0 0 30 23"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M27.1717 9.46661H6.73813L12.8336 3.37112C13.6064 2.59831 13.6064 1.35243 12.8336 0.579613C12.0608 -0.193204 10.8149 -0.193204 10.0421 0.579613L0.579592 10.0421C0.485076 10.1366 0.406132 10.2394 0.335109 10.3418C0.303691 10.3891 0.287849 10.4363 0.256165 10.4838C0.216826 10.5469 0.17722 10.61 0.153726 10.6811C0.129964 10.7442 0.114387 10.8073 0.0906252 10.8783C0.0747843 10.9335 0.0512864 10.9887 0.0354448 11.0518C-0.0118149 11.3042 -0.0118149 11.5721 0.0354448 11.8246C0.0512864 11.8877 0.0668628 11.9429 0.0906252 11.998C0.106467 12.0611 0.122044 12.1322 0.153726 12.1953C0.185144 12.2663 0.224749 12.3294 0.256165 12.3925C0.279926 12.4397 0.303424 12.487 0.335109 12.5345C0.406132 12.6449 0.492727 12.7473 0.579592 12.8342L10.0421 22.2967C10.4284 22.683 10.9332 22.8723 11.4377 22.8723C11.9422 22.8723 12.4471 22.683 12.8333 22.2967C13.6061 21.5239 13.6061 20.278 12.8333 19.5052L6.73779 13.4097L27.1714 13.4095C28.2597 13.4095 29.1428 12.5263 29.1428 11.438C29.1428 10.3497 28.2597 9.46656 27.1714 9.46656L27.1717 9.46661Z"
              fill="white"
            />
          </svg>
        </button>
        <h1 className="back-text">Search Plant</h1>
      </header>

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
