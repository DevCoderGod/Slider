import Slide from './Slide'

type ourProps = {
  ss: number
  index: number
  wght: number
  left: number
  rght: number
  shift: number
  speed: number
}

const Band = (props: ourProps) => {
  let arrJSX = []
  let min = -props.left * props.wght
  let max = props.rght * props.wght

  for (let i = 0; i < props.ss; i++) {
    let hidd: boolean = false
    let src = getSRC(i)

    let p = (i - props.index) * props.wght
    if (p - min < 0) p = max + (p - min + props.wght)
    if (p - max > 0) p = min + (p - max - props.wght)
    if (p === max || p === min) hidd = true
    p += props.shift

    arrJSX.push(
      <Slide
        key={src}
        id={src}
        pos={'translateX(' + p + 'px)'}
        hidd={hidd}
        speed={props.speed}
      />
    )
  }

  return <div>{arrJSX}</div>
}

export default Band

function getSRC(i: number): string {
  let pfx: string = ''
  i < 10 ? (pfx = '00') : (pfx = '0')
  return `/images/${pfx}${i}.jpg`
}
