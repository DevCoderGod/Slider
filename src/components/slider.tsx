import { useState } from 'react'
import Band from './Band'
import './Slider.scss'

let ss: number = 20
let quVis: number = 1
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
        <div
          tabIndex={0}
          className={'slider__cover'}
          onMouseDown={(e) => mousDown(e)}
          onMouseMove={(e) => mousMove(e)}
          onMouseUp={(e) => {
            setBand(() => {
              let index = mousUp(e, band.index, ss)
              return { index }
            })
          }}
          onTouchStart={(e) => touchStart(e)}
          onTouchMove={(e) => touchMove(e)}
          onTouchEnd={(e) => {
            setBand(() => {
              let index = touchEnd(e, band.index, ss)
              return { index }
            })
          }}
          onWheel={(e) => {
            setBand(() => {
              let index = wheel(e, band.index, ss)
              return { index }
            })
          }}
          onKeyDown={(e) => {
            setBand(() => {
              let index = arrowCtrl(e, band.index, ss)
              return { index }
            })
          }}
          onMouseOut={(e) => {
            if (posIn != 0) {
              setBand(() => {
                let index = mousUp(e, band.index, ss)
                console.log(index)
                posIn = 0
                return { index }
              })
            }
          }}
        ></div>
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

let posIn: number
let posX2: number
let mousG: boolean
let limit: number = 30

function arrowCtrl(
  e: React.KeyboardEvent,
  i: number,
  ss: number
): number {
  let r: number = i
  if (e.key === 'ArrowLeft') r = prevIndex(i, ss - 1)
  if (e.key === 'ArrowRight') r = nextIndex(i, ss - 1)
  return r
}

function wheel(e: React.WheelEvent, i: number, ss: number): number {
  let r: number = i
  if (e.deltaY > 0) r = prevIndex(i, ss - 1)
  if (e.deltaY < 0) r = nextIndex(i, ss - 1)
  return r
}

function mousDown(e: React.MouseEvent) {
  mousG = true
  posIn = e.clientX
}

function mousMove(e: React.MouseEvent) {
  if (!mousG) return
  posX2 = e.clientX - posIn
}

function mousUp(e: React.MouseEvent, i: number, ss: number): number {
  mousG = false
  let r: number = i
  console.log(posX2)
  if (posX2 > limit) {
    r = prevIndex(i, ss - 1)
    console.log(r)
  }
  if (posX2 < -limit) {
    r = nextIndex(i, ss - 1)
  }
  return r
}

function touchStart(e: React.TouchEvent) {
  mousG = true
  posIn = e.touches[0].clientX
}

function touchMove(e: React.TouchEvent) {
  if (!mousG) return
  posX2 = e.touches[0].clientX - posIn
}

function touchEnd(
  e: React.TouchEvent,
  i: number,
  ss: number
): number {
  mousG = false
  let r: number = i
  if (posX2 > limit) {
    r = prevIndex(i, ss - 1)
  }
  if (posX2 < -limit) {
    r = nextIndex(i, ss - 1)
  }
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

function calcShift(ss: number, qs: number): number {
  if (qs % 2 !== 0) return -wght / 2
  if (ss % 2 !== 0 && qs % 2 === 0) return 0
  else return -wght
}
