import { useNavigate } from 'react-router-dom'
import '../styles/HelpPage.css'
import PageHeader from '../components/PageHeader'

import help1 from '../assets/img/help1.jpg'
import help2 from '../assets/img/help2.jpg'
import help3 from '../assets/img/help3.jpg'

const articles = [
  {
    id: 1,
    image: help1,
    title: 'How to Identify a Plant?',
    description:
      'Take a look at the shape of the leaf when identifying flowers by their leaves.',
  },
  {
    id: 2,
    image: help2,
    title: 'Plant Disease',
    description:
      'Plant disease is an impairment of the normal state of a plant that interrupts or modifies its vital functions.',
  },
  {
    id: 3,
    image: help3,
    title: 'How to Care for Your Plant?',
    description:
      'Learn the basics of watering, sunlight, and soil to keep your plants healthy and thriving.',
  },
]

export default function HelpPage() {
  const navigate = useNavigate()

  return (
    <div className="help-page">
      <PageHeader title="Help" />
      <main className="help-list">
        {articles.map((article) => (
          <div key={article.id} className="help-card">
            <img src={article.image} alt={article.title} className="help-img" />
            <div className="help-info">
              <h3 className="help-title">{article.title}</h3>
              <p className="help-desc">{article.description}</p>
            </div>
          </div>
        ))}
      </main>
    </div>
  )
}
