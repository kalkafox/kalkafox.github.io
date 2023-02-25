import {
  animated as a,
  useSpring,
  useSprings,
  useTransition,
} from '@react-spring/web'
import { useEffect, useRef, useState } from 'react'

import { Icon } from '@iconify/react'
import links from './links.json'
import splashes from './splash.json'

import './Main.css'

import { useAtom } from 'jotai'
import Background from '../../src/components/Background'
import { loadedImagesAtom } from '../util/atom'
import { images } from '../util/data'
import env from '../util/version'

import ReactMarkdown from 'react-markdown'

const Main = () => {
  const [loadedImages, setLoadedImages] = useAtom(loadedImagesAtom)
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

  const splashTransition = useTransition(splashText, {
    from: { opacity: 0, y: 10 },
    enter: { opacity: 1, y: 0 },
    leave: { opacity: 0, y: -10 },
  })

  const [mainMenuSpring, setMainMenuSpring] = useSpring(() => ({
    opacity: 0,
    scale: 0.9,
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

      setSplashText(splashes[Math.floor(Math.random() * splashes.length)])
    }
  }, [flipAvatar, setAvatarSpring])

  return (
    <>
      {showLoadSpinner && (
        <div className="fixed h-full w-full">
          <div className="fixed left-0 right-0 top-20 m-auto h-auto w-[40%] lg:w-[80%] portrait:w-[80%]">
            <div className="m-4 text-center">
              <div className="left-0 right-0 text-center">
                <Icon
                  className="fixed left-0 w-full animate-spin text-zinc-300"
                  width={128}
                  height={128}
                  icon="gg:spinner"
                />
              </div>
            </div>
          </div>
        </div>
      )}
      <a.div style={loadSpring} className="fixed h-full w-full">
        <Background doResize={false} mod={5000} amp={20} />
        <div className="fixed h-full w-full bg-zinc-900 opacity-50" />
        <a.div style={mainMenuSpring} className="fixed h-full w-full">
          <div className="fixed left-0 right-0 top-20 m-auto h-auto w-[40%] rounded-xl bg-zinc-900/75 portrait:w-[80%]">
            <div className="m-4 text-center">
              <a.div className="inline-block" style={avatarSpring}>
                <img
                  ref={imgRef}
                  src={images[1]}
                  alt="avatar"
                  width="128"
                  height="128"
                  onLoad={() => {
                    setFlipAvatar(true)
                    setLoadSpring.start({
                      opacity: 1,
                      scale: 1,
                      onRest: () => {
                        setLoadSpring.set({ opacity: 1, scale: 1 })
                        setShowLoadSpinner(false)
                      },
                    })

                    setMainMenuSpring.start({
                      opacity: 1,
                      scale: 1,
                    })
                    imgRef.current &&
                      setLoadedImages((prev) => {
                        return [...prev, imgRef.current?.src as string]
                      })
                  }}
                  className="left-0 right-0 m-auto inline rounded-full"
                />
              </a.div>
              <span
                onClick={() => setFlipAvatar(true)}
                className="fixed left-0 right-0 m-auto h-[128px] w-[128px] rounded-full border-2 border-zinc-300"
              />
              {splashTransition((style, item) => (
                <a.div
                  style={style}
                  className="h-0 text-xl text-zinc-300"
                  key={item}
                >
                  <ReactMarkdown>{item}</ReactMarkdown>
                </a.div>
              ))}
              <div className="my-8 mb-8 grid grid-flow-col-dense justify-center gap-4 text-3xl">
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
              {/* <hr className="mb-4 border-zinc-500" />
              <div className="grid grid-flow-col grid-rows-1 justify-center">
                <button>
                  <Icon
                    icon="material-symbols:terminal"
                    className="text-zinc-300"
                    width="24"
                    height="24"
                    inline={true}
                  />
                </button>
                <a href="https://wolfpackmc-remote.vercel.app">
                  <Icon
                    icon="mdi:minecraft"
                    className="text-zinc-300"
                    width="24"
                    height="24"
                    inline={true}
                  />
                </a>
              </div> */}
            </div>
          </div>
          <div className="fixed left-0 bottom-0 h-7 w-full bg-zinc-900/50 backdrop-blur-lg">
            <span className="fixed inline-block">
              <a
                href="https://github.com/kalkafox/kalkafox.github.io"
                rel="noreferrer"
                target="_blank"
              >
                <Icon
                  className="top-0 bottom-0 inline h-7 text-zinc-300"
                  icon="mdi:github"
                  width="22"
                  height="22"
                  inline={true}
                />
              </a>
            </span>
            <div className="absolute right-0 -top-2 select-none">
              <a href="https://astro.build" rel="noreferrer" target="_blank">
                <Icon
                  className="fixed right-10 bottom-0 fill-zinc-300"
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
