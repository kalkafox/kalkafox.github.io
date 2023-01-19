import React, { useEffect, useState, useRef } from 'react'
import { useSpring, useSprings, animated as a } from '@react-spring/web'

import splashes from './splash.json'
import links from './links.json'
import { Icon } from '@iconify/react'

import './Main.css'

import { images } from '../util/data'
import { setImageLoaded } from '../util/image'
import Background from '../../src/components/Background'
import env from '../util/version'

const Main = () => {
  const [showLoadSpinner, setShowLoadSpinner] = useState(true)

  const imgRef = useRef<HTMLImageElement>(null)

  const [splashText, setSplashText] = useState(
    splashes[Math.floor(Math.random() * splashes.length)],
  )

  const [flipAvatar, setFlipAvatar] = useState(false)

  const [linkSprings, setLinkSprings] = useSprings(links.length, () => ({
    opacity: 1,
    y: 5,
    color: '#f0f0f0',
    scale: 1,
  }))

  const [backgroundSpring, setBackgroundSpring] = useSpring(() => ({
    scale: 1,
    opacity: 0,
    config: {
      friction: 20,
    },
  }))

  const [mainMenuSpring, setMainMenuSpring] = useSpring(() => ({
    opacity: 0,
    scale: 1,
    config: {
      friction: 20,
    },
  }))

  const [avatarSpring, setAvatarSpring] = useSpring(() => ({
    rotateZ: 0,
    scale: 1,
    config: {
      friction: 10,
    },
  }))

  const [loadSpring, setLoadSpring] = useSpring(() => ({
    opacity: 1,
    scale: 1,
  }))

  const [loadedImages, setLoadedImages] = useState<string[]>([])

  if (imgRef.current) {
    imgRef.current.onload = () => {
      setLoadedImages([...loadedImages, imgRef.current?.src as string])
    }
  }

  useEffect(() => {
    const onLoad = () => {
      setBackgroundSpring.start({
        opacity: 1,
        onRest: () => {
          setShowLoadSpinner(false)
        },
      })

      setMainMenuSpring.start({
        opacity: 1,
        scale: 1,
        config: {
          friction: 20,
        },
      })
    }

    if (loadedImages.length > images.length) {
      onLoad()
    }

    console.log(loadedImages)
  }, [loadedImages, setMainMenuSpring, setBackgroundSpring])

  useEffect(() => {
    if (flipAvatar) {
      const choices = [-360, 360]
      const choice = choices[Math.floor(Math.random() * choices.length)]
      setAvatarSpring.start({
        rotateZ: choice,
        onRest: () => {
          setAvatarSpring.set({ rotateZ: 0 })
          setFlipAvatar(false)
        },
      })
    }
  }, [flipAvatar, setAvatarSpring])

  return (
    <>
      {showLoadSpinner && (
        <div className="w-full h-full fixed">
          <div className="w-[40%] portrait:w-[80%] lg:w-[80%] h-auto fixed left-0 right-0 top-20 m-auto">
            <div className="text-center m-4">
              <div className="w-[136px] h-[136px] top-3 left-0 right-0 m-auto absolute bg-zinc-800 loader" />
              a
            </div>
          </div>
        </div>
      )}
      <a.div style={loadSpring} className="fixed w-full h-full">
        <a.div style={backgroundSpring}>
          <Background
            doResize={false}
            mod={5000}
            amp={20}
            setReady={setLoadedImages}
            image={images[0]}
          />
        </a.div>
        <div className="w-full h-full fixed bg-zinc-900 opacity-50" />
        <a.div style={mainMenuSpring} className="w-full h-full fixed">
          <div className="w-[40%] portrait:w-[80%] h-auto fixed bg-zinc-900/75 rounded-xl left-0 right-0 top-20 m-auto">
            <div className="text-center m-4">
              <a.div className="inline-block" style={avatarSpring}>
                <img
                  onLoad={() => setImageLoaded(images[1], setLoadedImages)}
                  ref={imgRef}
                  src={images[1]}
                  alt="avatar"
                  width="128"
                  height="128"
                  className="rounded-full inline left-0 right-0 m-auto"
                />
              </a.div>
              <span
                onClick={() => setFlipAvatar(true)}
                className="w-[128px] h-[128px] left-0 right-0 m-auto fixed rounded-full border-2 border-zinc-300"
              />
              <p className={`text-zinc-300 text-xl mt-4 mb-4 font-[Poppins]`}>
                {splashText}
              </p>
              <div className="grid gap-4 grid-flow-col-dense justify-center text-3xl mb-8">
                {linkSprings.map(
                  (props, index) =>
                    links[index].active && (
                      <a.a
                        style={linkSprings[index]}
                        rel="noreferrer"
                        target="_blank"
                        href={links[index].link}
                        key={links[index].icon}
                        onMouseEnter={() => {
                          // @ts-ignore: Type error
                          //e.target.style.color = links[index].color
                          props.color.start(links[index].color)
                          props.scale.start(1.15)
                        }}
                        onMouseLeave={(e) => {
                          // @ts-ignore: Type error
                          //e.target.style.color = link.active ? "rgb(212,212,216)" : "rgb(82,82,86)"
                          props.color.start('#f0f0f0')
                          props.scale.start(1)
                        }}
                      >
                        <Icon icon={links[index].icon} />
                      </a.a>
                    ),
                )}
              </div>
              {/* <div className="grid gap-4 grid-flow-col-dense justify-center text-2xl mb-4">
                                {languageSprings.map((props, index) => (
                                    <a.span style={languageSprings[index]} key={languages[index].icon}
                                    onMouseEnter={() => {
                                        // @ts-ignore: Type error
                                        //e.target.style.filter = "saturate(100%)"
                                        // @ts-ignore: Type error
                                        //languages[index]["active-color"] && (e.target.style.color = language.color)
                                        props.scale.start(1.2)
                                    }}
                                    onMouseLeave={() => {
                                        // @ts-ignore: Type error
                                        //e.target.style.filter = "saturate(50%)"
                                        // @ts-ignore: Type error
                                        //language["active-color"] && (e.target.style.color = "rgb(10,100,216)")
                                        props.scale.start(1)
                                    }}>
                                        <Icon icon={languages[index].icon}
                                        key={languages[index].icon}
                                        className="transition-all" />
                                    </a.span>
                                ))}
                            </div> */}
              <hr className="border-zinc-500 mb-4" />
              <button>
                <Icon
                  icon="material-symbols:terminal"
                  className="text-zinc-300"
                  width="24"
                  height="24"
                  inline={true}
                />
              </button>
              <button>
                <Icon
                  icon="mdi:minecraft"
                  className="text-zinc-300"
                  width="24"
                  height="24"
                  inline={true}
                />
              </button>
            </div>
          </div>
          <div className="w-full left-0 bg-zinc-900/50 h-7 fixed bottom-0">
            <span className="inline-block fixed">
              <a
                href="https://github.com/kalkafox/kalkafox.github.io"
                rel="noreferrer"
                target="_blank"
              >
                <Icon
                  className="inline text-zinc-300 top-0 bottom-0 h-7"
                  icon="mdi:github"
                  width="22"
                  height="22"
                  inline={true}
                />
              </a>
            </span>
            <div className="right-0 absolute -top-2 select-none">
              <a href="https://astro.build" rel="noreferrer" target="_blank">
                <Icon
                  className="fixed right-8 fill-zinc-300 bottom-0"
                  icon="simple-icons:astro"
                  color="#eee"
                  width="24"
                  inline={true}
                />
              </a>
              <span className="relative top-[10px] text-zinc-300">
                {env.ASTRO_VERSION}
              </span>
            </div>
          </div>
        </a.div>
      </a.div>
    </>
  )
}

export default Main
