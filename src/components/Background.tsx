import React, { Dispatch, SetStateAction, useContext, useEffect, useRef } from 'react'
import { useSpring, animated as a } from '@react-spring/web'

import { images } from '../util/data'
import { setImageLoaded } from '../util/image'

const timestamp = () => Math.floor(Date.now())

const x = (mod: number, amp: number) => Math.cos(timestamp() / mod) * amp
const y = (mod: number, amp: number) => Math.sin(timestamp() / mod) * amp

const Background = ({
  setReady,
  image = images[0],
  scale = 1.5,
  doResize = true,
  mod = 5000,
  amp = 100,
}: {
  setReady: Dispatch<SetStateAction<string[]>>
  image?: string
  scale?: number
  doResize?: boolean
  mod?: number
  amp?: number
}) => {
  const [backgroundImageSpring, setBackgroundImageSpring] = useSpring(() => ({
    scale: 1.5,
    x: x(mod, amp),
    y: y(mod, amp),
  }))

  const imgRef = useRef<HTMLImageElement>(null)

  useEffect(() => {

    if (imgRef.current) {
      imgRef.current.onload = () => {
        console.log("onload")
        setImageLoaded(image, setReady)
      }
    }

    const interval = setInterval(() => {
      setBackgroundImageSpring.start({
        x: x(mod, amp),
        y: y(mod, amp),
      })
    }, 10)

    const handleResize = () => {
      if (!doResize) return
      if (window.innerWidth < 768 || window.innerHeight < 768) {
        setBackgroundImageSpring.start({
          scale: 5,
        })
      } else {
        setBackgroundImageSpring.start({
          scale: 1.5,
        })
      }
    }

    handleResize()

    window.addEventListener('resize', handleResize)

    return () => clearInterval(interval)
  }, [setBackgroundImageSpring])

  return (
    <>
      <a.div
        className="fixed w-full h-full object-cover"
        style={backgroundImageSpring}
      >
        <img
          onLoad={() => setImageLoaded(image, setReady)}
          ref={imgRef}
          src={image}
          alt="gilneas"
          className="fixed object-cover bg-cover w-screen h-screen"
        />
      </a.div>
    </>
  )
}

export default Background
