import { Ref, SVGProps, forwardRef, memo } from 'react'

const SvgArrowBack = (
  props: SVGProps<SVGSVGElement>,
  ref: Ref<SVGSVGElement>
) => (
  <svg
    fill='none'
    height='1em'
    ref={ref}
    viewBox='0 0 20 20'
    width='1em'
    xmlns='http://www.w3.org/2000/svg'
    {...props}
  >
    <path
      fillRule='evenodd'
      clipRule='evenodd'
      d='M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z'
      fill='currentColor'
    />
  </svg>
)

const ForwardRef = forwardRef(SvgArrowBack)
const Memo = memo(ForwardRef)

export default Memo
