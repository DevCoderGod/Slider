import { useState } from 'react'
import Band from './Band'
import './Slider.scss'

let quTotal: number = 20
let quVis: number = 1
let wght: number = 100
let speed: number = 0.3

let middle: number = (quTotal / 2) | 0
let left: number = quTotal - middle - 1
let rght: number = quTotal - middle - (quTotal % 2)
let maxIndex: number = quTotal - 1
let widthWin: string = quVis * wght + 'px'
let shift: number = calcShift(quTotal, quVis)

const Slider = () => {
  const [index, setBand] = useState(middle)

  return (
    <div className="slider">
      <div className="slider__wind" style={{ width: widthWin }}>
        <Band
          quTotal={quTotal}
          index={index}
          wght={wght}
          left={left}
          rght={rght}
          shift={shift}
          speed={speed}
        />
        <div
          tabIndex={0}
          className={'slider__cover'}
          onMouseDown={(e) => mousDown(e)}
          onMouseMove={(e) => mousMove(e)}
          onMouseUp={(e) => setBand(mousUp(e, index, quTotal))}
          onMouseOut={(e) => setBand(mousUp(e, index, quTotal))}
          onTouchStart={(e) => touchStart(e)}
          onTouchMove={(e) => touchMove(e)}
          onTouchEnd={(e) => setBand(touchEnd(e, index, quTotal))}
          onWheel={(e) => setBand(wheel(e, index, quTotal))}
          onKeyDown={(e) => setBand(arrowCtrl(e, index, quTotal))}
        ></div>
      </div>
      <div className="slider__arrows">
        <button
          type="button"
          className="arrow prev"
          onClick={() => setBand(prevIndex(index, maxIndex))}
        >
          &larr;
        </button>
        <button
          type="button"
          className="arrow next"
          onClick={() => setBand(nextIndex(index, maxIndex))}
        >
          &rarr;
        </button>
      </div>
    </div>
  )
}

export default Slider

let posStart: number
let posEnd: number
let limit: number = 20

function mousDown(e: React.MouseEvent) {
  posStart = e.clientX
  posEnd = 0
}

function mousMove(e: React.MouseEvent) {
  if (!posStart) return
  // debugger

  posEnd = e.clientX - posStart
}

function mousUp(
  e: React.MouseEvent,
  i: number,
  quTotal: number
): number {
  if (!posStart) return i
  // debugger
  posStart = 0
  if (posEnd > limit) return prevIndex(i, quTotal - 1)
  if (posEnd < -limit) return nextIndex(i, quTotal - 1)
  return i
}

function touchStart(e: React.TouchEvent) {
  posStart = e.touches[0].clientX
}

function touchMove(e: React.TouchEvent) {
  // debugger
  if (!posStart) return
  let qqq = e.touches[0].clientX
  posEnd = qqq - posStart
  // debugger
}

function touchEnd(
  e: React.TouchEvent,
  i: number,
  quTotal: number
): number {
  if (!posStart) return i

  posStart = 0
  if (posEnd > limit) return prevIndex(i, quTotal - 1)
  if (posEnd < -limit) return nextIndex(i, quTotal - 1)
  return i
}

function wheel(
  e: React.WheelEvent,
  i: number,
  quTotal: number
): number {
  let r: number = i
  if (e.deltaY > 0) r = prevIndex(i, quTotal - 1)
  if (e.deltaY < 0) r = nextIndex(i, quTotal - 1)
  return r
}

function arrowCtrl(
  e: React.KeyboardEvent,
  i: number,
  quTotal: number
): number {
  let r: number = i
  if (e.key === 'ArrowLeft') r = prevIndex(i, quTotal - 1)
  if (e.key === 'ArrowRight') r = nextIndex(i, quTotal - 1)
  return r
}

function prevIndex(i: number, maxI: number): number {
  if (i === 0) return maxI
  return i - 1
}

function nextIndex(i: number, maxI: number): number {
  if (i === maxI) return 0
  return i + 1
}

function calcShift(quTotal: number, qs: number): number {
  if (qs % 2 !== 0) return -wght / 2
  if (quTotal % 2 !== 0 && qs % 2 === 0) return 0
  else return -wght
}
