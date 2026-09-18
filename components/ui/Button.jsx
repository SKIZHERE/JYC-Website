import Link from "next/link"

const VARIANTS = {
  primary:
    "bg-jyc-accent-red text-white hover:shadow-gold-glow hover:-translate-y-0.5",
  secondary:
    "border border-jyc-accent-gold text-jyc-accent-gold hover:bg-jyc-accent-gold hover:text-white hover:-translate-y-0.5",
  ghost:
    "text-jyc-text-primary hover:bg-jyc-bg-elevated hover:text-jyc-accent-gold",
}

const SIZES = {
  sm: "px-4 py-2 text-sm",
  md: "px-6 py-2.5 text-sm",
  lg: "px-8 py-3.5 text-base",
}

export default function Button({
  children,
  href,
  onClick,
  variant = "primary",
  size = "md",
  className = "",
  type = "button",
  target,
  rel,
  ...rest
}) {
  const classes = `inline-flex items-center justify-center gap-2 rounded-lg font-semibold transition-all duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-jyc-accent-gold ${VARIANTS[variant]} ${SIZES[size]} ${className}`

  if (href) {
    const external = target === "_blank"
    return (
      <Link
        href={href}
        className={classes}
        target={external ? "_blank" : undefined}
        rel={external ? "noopener noreferrer" : undefined}
        {...rest}
      >
        {children}
      </Link>
    )
  }

  return (
    <button type={type} onClick={onClick} className={classes} {...rest}>
      {children}
    </button>
  )
}