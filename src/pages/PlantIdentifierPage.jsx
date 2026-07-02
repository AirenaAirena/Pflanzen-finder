import { useNavigate } from 'react-router-dom'
import PageHeader from '../components/PageHeader'
import leaf from '../assets/img/leaf.jpg'
import flower from '../assets/img/flower.jpg'
import fruit from '../assets/img/fruit.jpg'
import bark from '../assets/img/bark.jpg'
import '../styles/PlantIdentifierPage.css'

const categories = [
  {
    id: 'leaf',
    title: 'Leaf',
    image: leaf,
    gradient:
      'linear-gradient(to right, rgba(52, 211, 153, 0.95) 0%, rgba(52, 211, 153, 0) 100%)',
  },
  {
    id: 'flower',
    title: 'Flower',
    image: flower,
    gradient:
      'linear-gradient(to left, rgba(192, 132, 252, 1) 0%, rgba(192, 132, 252, 0) 100%)',
  },
  {
    id: 'fruit',
    title: 'Fruit',
    image: fruit,
    gradient:
      'linear-gradient(to right, rgba(251, 146, 60, 0.95) 0%, rgba(251, 146, 60, 0) 100%)',
  },
  {
    id: 'bark',
    title: 'Bark',
    image: bark,
    gradient:
      'linear-gradient(to left, rgba(30, 58, 138, 0.95) 0%, rgba(30, 58, 138, 0) 100%)',
  },
]

export default function PlantIdentifierPage() {
  const navigate = useNavigate()

  return (
    <div className="pi-screen">
      <PageHeader title="Plant Identifier" />

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
