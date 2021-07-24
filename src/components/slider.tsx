import { useState } from 'react'
import Band from './Band'
import './Slider.scss'

let ss: number = 9
let quVis: number = 3
let wght: number = 100
let speed: number = 0.3

let mid: number = (ss / 2) | 0
let left: number = ss - mid - 1
let rght: number = ss - mid - (ss % 2)
let maxIndex: number = ss - 1
let widthWin: string = quVis * wght + 'px'
let shift: number = calcShift(ss, quVis)

const Slider = () => {
  const [band, setBand] = useState({
    index: mid,
  })

  return (
    <div className="slider">
      <div className="slider__wind" style={{ width: widthWin }}>
        <Band
          ss={ss}
          index={band.index}
          wght={wght}
          left={left}
          rght={rght}
          shift={shift}
          speed={speed}
        />
      </div>
      <div className="slider__arrows">
        <button
          type="button"
          className="arrow prev"
          onClick={() => {
            setBand(() => {
              let index = prevIndex(band.index, maxIndex)
              return { index }
            })
          }}
        >
          &larr;
        </button>
        <button
          type="button"
          className="arrow next"
          onClick={() => {
            setBand(() => {
              let index = nextIndex(band.index, maxIndex)
              return { index }
            })
          }}
        >
          &rarr;
        </button>
      </div>
    </div>
  )
}

export default Slider

function prevIndex(i: number, maxI: number): number {
  if (i === 0) return maxI
  return i - 1
}

function nextIndex(i: number, maxI: number): number {
  if (i === maxI) return 0
  return i + 1
}

function calcShift(ss: number, qs: number): number {
  if (qs % 2 !== 0) return -wght / 2
  if (ss % 2 !== 0 && qs % 2 === 0) return 0
  else return -wght
}
