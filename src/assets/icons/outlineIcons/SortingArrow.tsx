import { MouseEvent } from 'react'

type Props = {
  direction: 'asc' | 'desc'
  active: boolean
  onClick?: (e: MouseEvent<SVGSVGElement>) => void
}
export const SortingArrow = ({ direction, active, onClick }: Props) => {
  const rotation = direction === 'asc' ? 'rotate-0' : 'rotate-180'
  const fill = active ? 'fill-light-100' : 'fill-dark-100'

  return (
    <svg
      onClick={onClick}
      className={`w-2.5 h-2.5 cursor-pointer ${rotation} ${fill} hover:fill-light-100 transition-transform`}
      viewBox='0 0 10 6'
      xmlns='http://www.w3.org/2000/svg'
    >
      <polygon points='0,6 5,0 10,6' />
    </svg>
  )
}
