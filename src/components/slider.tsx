import { useEffect, useRef, useState } from 'react'
import { filter, fromEvent, map, switchMap } from 'rxjs'
import Band from './Band'
import './Slider.scss'

let quTotal: number = 20
let quVis: number = 1
let wght: number = 100
let speed: number = 0.3
let limit: number = 20

let middle: number = (quTotal / 2) | 0
let left: number = quTotal - middle - 1
let rght: number = quTotal - middle - (quTotal % 2)
let maxIndex: number = quTotal - 1
let widthWin: string = quVis * wght + 'px'
let shift: number = calcShift(quTotal, quVis)

const Slider = () => {
  const [index, setBand] = useState(middle)
  const control = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let mouseReset = mousRx(control.current!).subscribe((diff) => {
      if (diff > limit) setBand(prevIndex(index, maxIndex))
      if (diff < -limit) setBand(nextIndex(index, maxIndex))
    })

    let touchReset = touchRx(control.current!).subscribe((diff) => {
      if (diff > limit) setBand(prevIndex(index, maxIndex))
      if (diff < -limit) setBand(nextIndex(index, maxIndex))
    })

    let wheelReset = wheelRx(control.current!).subscribe((diff) => {
      if (diff > 0) setBand(prevIndex(index, maxIndex))
      if (diff < 0) setBand(nextIndex(index, maxIndex))
    })

    let KeyboardReset = KeyboardRx(control.current!).subscribe(
      (key) => {
        if (key === 'ArrowLeft') setBand(prevIndex(index, maxIndex))
        if (key === 'ArrowRight') setBand(nextIndex(index, maxIndex))
      }
    )

    return () => {
      mouseReset.unsubscribe()
      touchReset.unsubscribe()
      wheelReset.unsubscribe()
      KeyboardReset.unsubscribe()
    }
  }, [index])

  return (
    <div className="slider">
      <div
        className="slider__window"
        style={{ width: widthWin }}
        ref={control}
        tabIndex={0}
      >
        <Band
          quTotal={quTotal}
          index={index}
          wght={wght}
          left={left}
          rght={rght}
          shift={shift}
          speed={speed}
        />
      </div>
      <div className="slider__arrows">
        <button onClick={() => setBand(prevIndex(index, maxIndex))}>
          &larr;
        </button>
        <button onClick={() => setBand(nextIndex(index, maxIndex))}>
          &rarr;
        </button>
      </div>
    </div>
  )
}

export default Slider

function mousRx(control: HTMLDivElement) {
  return fromEvent<React.MouseEvent>(control, 'mousedown').pipe(
    map((e) => e.clientX),
    switchMap((xStart) => {
      return fromEvent<React.MouseEvent>(document, 'mouseup').pipe(
        map((e) => e.clientX - xStart),
        filter(
          (difference) => difference > limit || difference < -limit
        )
      )
    })
  )
}

function touchRx(control: HTMLDivElement) {
  return fromEvent<React.TouchEvent>(control, 'touchstart').pipe(
    map((e) => e.touches[0].clientX),
    switchMap((xStart) => {
      return fromEvent<React.TouchEvent>(control, 'touchend').pipe(
        map((e) => e.changedTouches[0].clientX - xStart),
        filter(
          (difference) => difference > limit || difference < -limit
        )
      )
    })
  )
}

function wheelRx(control: HTMLDivElement) {
  return fromEvent<React.WheelEvent>(control, 'wheel').pipe(
    map((e) => e.deltaY)
  )
}

function KeyboardRx(control: HTMLDivElement) {
  return fromEvent<React.KeyboardEvent>(control, 'keydown').pipe(
    map((e) => e.key)
  )
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
