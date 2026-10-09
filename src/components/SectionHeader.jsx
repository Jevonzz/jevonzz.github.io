export default function SectionHeader({ eyebrow, title, children }) {
  return (
    <div className="reveal max-w-2xl">
      <p className="eyebrow">{eyebrow}</p>
      <h2 className="heading">{title}</h2>
      {children && <p className="mt-4 text-muted leading-relaxed">{children}</p>}
    </div>
  )
}
