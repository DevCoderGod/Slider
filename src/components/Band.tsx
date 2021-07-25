import { Fragment } from 'react'
import Slide from './Slide'

type ourProps = {
  quTotal: number
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

  for (let i = 0; i < props.quTotal; i++) {
    let outside: boolean = false
    let src = getSRC(i)

    let p = (i - props.index) * props.wght
    if (p - min < 0) p = max + (p - min + props.wght)
    if (p - max > 0) p = min + (p - max - props.wght)
    if (p === max || p === min) outside = true
    p += props.shift

    arrJSX.push(
      <Slide
        key={src}
        source={src}
        position={'translateX(' + p + 'px)'}
        outside={outside}
        speed={props.speed}
      />
    )
  }

  return <Fragment>{arrJSX}</Fragment>
}

export default Band

function getSRC(i: number): string {
  let pfx: string = ''
  i < 10 ? (pfx = '00') : (pfx = '0')
  return `/images/${pfx}${i}.jpg`
}
