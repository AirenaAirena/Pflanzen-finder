import { useNavigate } from 'react-router-dom'
import '../styles/PlantIdentifierPage.css'

const categories = [
  {
    id: 'leaf',
    title: 'Leaf',
    image: '/src/assets/img/leaf.jpg',
    gradient:
      'linear-gradient(to right, rgba(52, 211, 153, 0.95) 0%, rgba(52, 211, 153, 0) 100%)',
  },
  {
    id: 'flower',
    title: 'Flower',
    image: '/src/assets/img/flower.jpg',
    gradient:
      'linear-gradient(to left, rgba(192, 132, 252, 1) 0%, rgba(192, 132, 252, 0) 100%)',
  },
  {
    id: 'fruit',
    title: 'Fruit',
    image: '/src/assets/img/fruit.jpg',
    gradient:
      'linear-gradient(to right, rgba(251, 146, 60, 0.95) 0%, rgba(251, 146, 60, 0) 100%)',
  },
  {
    id: 'bark',
    title: 'Bark',
    image: '/src/assets/img/bark.jpg',
    gradient:
      'linear-gradient(to left, rgba(30, 58, 138, 0.95) 0%, rgba(30, 58, 138, 0) 100%)',
  },
]

export default function PlantIdentifierPage() {
  const navigate = useNavigate()

  return (
    <div className="pi-screen">
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
        <h1 className="back-text">Plant Identifier</h1>
      </header>

      <main className="pi-list">
        {categories.map((cat, index) => (
          <button
            key={cat.id}
            className="pi-card"
            style={{ backgroundImage: `${cat.gradient}, url(${cat.image})` }}
            onClick={() => navigate('/identify')}
          >
            <span className="pi-card-overlay" />
            <span
              className={`pi-card-title ${
                index % 2 === 0 ? 'pi-card-title-right' : 'pi-card-title-left'
              }`}
            >
              {cat.title}
            </span>
          </button>
        ))}
      </main>
    </div>
  )
}
