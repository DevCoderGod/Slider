import { useState } from 'react'
import Slide from './Slide'
import s from './Slider.module.scss'

const Slider = () => {
  let c: number = 100
  let arr = []
  for (let i: number = 0; i < c; i++) {
    arr[i] = (
      <Slide
        src={'/imgs/' + fileName(i) + '.jpg'}
        key={fileName(i)}
      />
    )
  }

  // function setIndex(i: number): number {
  //   return i++
  // }

  const [index, setIndex] = useState<number>(0)

  return (
    <div className={s.slider}>
      <div className={s.slider__wind}>
        <div className={s.slider__track}>
          {arr[index - 1]}
          {arr[index]}
          {arr[index + 1]}
        </div>
      </div>
      <div className={s.slider__arrows}>
        <button
          type="button"
          className="arr arr-prev"
          onClick={() =>
            setIndex(() => {
              return index - 1
            })
          }
        >
          &larr;
        </button>
        <button
          type="button"
          className="arr arr-next"
          onClick={() => setIndex(index + 1)}
        >
          &rarr;
        </button>
      </div>
    </div>
  )
}

let fileName = function (i: number): string {
  if (i < 10) return '00' + i
  if (i < 100) return '0' + i
  return '' + i
}

export default Slider
