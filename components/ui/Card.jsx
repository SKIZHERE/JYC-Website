export default function Card({ children, className = "", as: Tag = "div", ...rest }) {
  return (
    <Tag
      className={`jyc-card transition-all duration-300 hover:-translate-y-1 hover:shadow-lift ${className}`}
      {...rest}
    >
      {children}
    </Tag>
  )
}