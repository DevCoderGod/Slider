import s from './Slide.module.scss'

type ourProps = {
  src: string
}

let Slide = (props: ourProps) => {
  return (
    <img
      className={s.Slide}
      src={props.src}
      alt={'img'}
    ></img>
  )
}
export default Slide
