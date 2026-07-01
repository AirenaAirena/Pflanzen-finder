import { Link, useNavigate } from 'react-router-dom'
import '../styles/HomePage1.css'

function HomePage1() {
  const navigate = useNavigate()

  return (
    <div className="home">
      <header className="home-header">
        <div>
          <h1>Welcome to</h1>
          <h2>Plant Identifier</h2>
        </div>

        <Link to="/settings" className="setting-icon">
          <img src="../src/assets/img/setting.svg" alt="setting" />
        </Link>
      </header>

      <div className="container trans">
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search For Plants"
            onFocus={() => navigate('/search')}
          />
        </div>
        <div className="help-banner" onClick={() => navigate('/help')}>
          <h3>Do you need Help</h3>
          <p>Click here</p>
        </div>

        <div className="actions">
          <button
            className="action-btn"
            onClick={() => navigate('/plant-identifier')}
          >
            <img
              src="../src/assets/img/photo.svg"
              alt="photo"
              className="actions-icon"
            />
            <span>Scan and Identify</span>
          </button>

          <button
            className="action-btn"
            onClick={() => navigate('/plant-identifier')}
          >
            <img
              src="../src/assets/img/camera.svg"
              alt="camera"
              className="actions-icon"
            />
            <span> Photo Identify</span>
          </button>
        </div>

        <div
          className="disease-banner"
          onClick={() => navigate('/identify', { state: { mode: 'disease' } })}
        >
          <h3>Plant Disease</h3>
        </div>
      </div>
    </div>
  )
}

export default HomePage1
