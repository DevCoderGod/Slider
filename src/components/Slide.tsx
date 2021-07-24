import './Slide.scss'

type ourProps = {
  id: string
  pos: string
  hidd: boolean
  speed: number
}
const Slide = (props: ourProps) => {
  let hidd: string = ''
  props.hidd ? (hidd = 'all 0s') : (hidd = `all ${props.speed}s ease`)
  return (
    <img
      className="slide"
      src={props.id}
      alt={props.id}
      style={{
        transform: props.pos,
        transition: hidd,
      }}
    />
  )
}
export default Slide
// transition: all 1s ease;
