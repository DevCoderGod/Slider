import './Slide.scss'

type ourProps = {
  source: string
  position: string
  outside: boolean
  speed: number
}
const Slide = (props: ourProps) => {
  return (
    <img
      className="slide"
      src={props.source}
      alt=""
      style={{
        transform: props.position,
        transition: props.outside
          ? 'all 0s'
          : `all ${props.speed}s ease`,
      }}
    />
  )
}
export default Slide
