import { getCategoryEmoji } from '../../utils/formatters'

type CategoryIconProps = {
  category: string
  size?: number
  className?: string
}

const CategoryIcon = ({
  category,
  size = 40,
  className = '',
}: CategoryIconProps) => {
  return (
    <div
      className={`d-flex align-items-center justify-content-center rounded-circle bg-light ${className}`}
      style={{
        width: size,
        height: size,
        fontSize: size * 0.6,
        flexShrink: 0,
      }}
    >
      {getCategoryEmoji(category)}
    </div>
  )
}

export default CategoryIcon
