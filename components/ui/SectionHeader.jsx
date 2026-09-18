export default function SectionHeader({ title, subtitle, align = "center" }) {
  const alignment =
    align === "center" ? "items-center text-center" : "items-start text-left"

  return (
    <div className={`flex flex-col ${alignment} gap-3`}>
      <h2 className="jyc-h2">{title}</h2>
      <span className="h-1 w-14 rounded-full bg-jyc-accent-gold" />
      {subtitle ? (
        <p className="max-w-2xl text-base leading-relaxed text-jyc-text-muted sm:text-lg">
          {subtitle}
        </p>
      ) : null}
    </div>
  )
}