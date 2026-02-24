export default function OnboardingSlide({ data }) {
  return (
    <div className="slide">
      <img src={data.image} alt={data.title} />
      <h2>{data.title}</h2>
      <p>{data.description}</p>
    </div>
  )
}
