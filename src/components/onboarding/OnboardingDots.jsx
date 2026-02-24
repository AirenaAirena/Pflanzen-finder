export default function OnboardingDots({ total, current }) {
  return (
    <div className="dots">
      {Array.from({ length: total }).map((_, index) => (
        <span
          key={index}
          className={index === current ? 'dot active' : 'dot'}
        />
      ))}
    </div>
  )
}
