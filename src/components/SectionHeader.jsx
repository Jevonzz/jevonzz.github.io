export default function SectionHeader({ index, eyebrow, title, children }) {
  return (
    <div className="reveal max-w-3xl">
      <p className="eyebrow">
        {index && <span className="text-accent">{index}</span>}
        <span className="h-px w-8 bg-line" aria-hidden="true" />
        {eyebrow}
      </p>
      <h2 className="heading">{title}</h2>
      {children && <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted">{children}</p>}
    </div>
  )
}
