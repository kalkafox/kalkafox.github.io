import { animated as a, useSpring } from '@react-spring/web'
import { useSetAtom } from 'jotai'
import { useEffect, useRef } from 'react'
import { loadedImagesAtom } from '../util/atom'

import { images } from '../util/data'

const Background = ({
  image = images[0],
  scale = 1.5,
  doResize = true,
  mod = 5000,
  amp = 100,
}: {
  image?: string
  scale?: number
  doResize?: boolean
  mod?: number
  amp?: number
}) => {
  const setLoadedImages = useSetAtom(loadedImagesAtom)

  const [backgroundImageSpring, setBackgroundImageSpring] = useSpring(() => ({
    scale: scale,
    opacity: 0,
    x: 0,
    y: 0,
  }))

  const imgRef = useRef<HTMLImageElement>(null)

  useEffect(() => {
    setBackgroundImageSpring.set({
      x: Math.cos(Date.now() / mod) * amp,
      y: Math.sin(Date.now() / mod) * amp,
    })

    // Declare interval outside of if statement so it can be cleared
    let interval: NodeJS.Timer

    console.log('ye')

    if (imgRef.current && imgRef.current.complete) {
      console.log('ya')
      setBackgroundImageSpring.start({
        opacity: 1,
      })

      interval = setInterval(() => {
        setBackgroundImageSpring.start({
          x: Math.cos(Date.now() / mod) * amp,
          y: Math.sin(Date.now() / mod) * amp,
        })
      }, 500)
    }

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

    return () => {
      try {
        clearInterval(interval)
      } catch (error) {
        console.error(error)
      }
    }
  }, [setBackgroundImageSpring, image, imgRef, mod, amp, doResize])

  return (
    <>
      <a.div
        className="fixed h-full w-full object-cover"
        style={backgroundImageSpring}
      >
        <img
          ref={imgRef}
          src={image}
          alt="gilneas"
          onLoad={() => {
            setBackgroundImageSpring.start({
              opacity: 1,
            })
            setLoadedImages((prev) => {
              return [...prev, imgRef.current?.src as string]
            })
          }}
          className="fixed h-screen w-screen bg-cover object-cover"
        />
      </a.div>
    </>
  )
}

export default Background
