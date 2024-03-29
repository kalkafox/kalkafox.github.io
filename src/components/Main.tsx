import {
  animated as a,
  useSpring,
  useSprings,
  useTransition,
} from '@react-spring/web'
import { Suspense, useRef, useState } from 'react'

import '../layouts/xterm.css'

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

import CountUp from 'react-countup'

// const prompt_data = {
//   left_border: '',
//   right_border: '',
//   separator: '',
//   separator_thin: '',
//   separator_thick: '',
//   separator_thick_thin: '',
//   user_suffix: '@localhost',
//   path_prefix: '',
//   path_suffix: '~',
// }

// const user = 'user@localhost'
// const path = '  ~'
// const promptSuffix = ' '

// const promptLength = user.length + path.length + promptSuffix.length

// const prompt = () => {
//   return ' '
//   // return (
//   //   chalk.white(prompt_data.left_border) +
//   //   chalk.bgWhite(chalk.black(user)) +
//   //   chalk.white(prompt_data.separator_thin) +
//   //   chalk.bgWhite(chalk.black(path)) +
//   //   chalk.white(prompt_data.separator_thick) +
//   //   chalk.bgWhite(chalk.black(promptSuffix)) +
//   //   chalk.white(prompt_data.right_border) +
//   //   ' '
//   // )
// }

// const promptText = prompt()

type GitHubSchema = {
  public_repos: number
  public_gists: number
  followers: number
  following: number
}

const userData = await fetch('https://api.github.com/users/kalkafox').then(
  async (res) => {
    if (res.ok) {
      const data = await res.json()
      if (
        typeof data === 'object' &&
        data &&
        'public_repos' in data &&
        'public_gists' in data &&
        'followers' in data &&
        'following' in data
      )
        return data as GitHubSchema
    } else return null
  },
)

const Main = () => {
  const [loadedImages, setLoadedImages] = useAtom(loadedImagesAtom)
  const [showLoadSpinner, setShowLoadSpinner] = useState(true)

  //const [showTerminal, setShowTerminal] = useState(false)

  const imgRef = useRef<HTMLImageElement>(null)
  const frameRef = useRef<HTMLIFrameElement>(null)

  const [spinBuffer, setSpinBuffer] = useState(0)

  const [spinRevolutions, setSpinRevolutions] = useState(0)

  const [spun, setSpun] = useState(false)

  const [splashText, setSplashText] = useState(
    splashes[Math.floor(Math.random() * splashes.length)],
  )

  const [flipAvatar, setFlipAvatar] = useState(false)

  const [showBlog, setShowBlog] = useState(false)

  const [blogLoading, setBlogLoading] = useState(false)

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

  const [contentSpring, setContentSpring] = useSpring(() => ({
    opacity: 1,
    scale: 1,
    config: {
      friction: 20,
    },
  }))

  const [buttonBlogSpring, setButtonBlogSpring] = useSpring(() => ({
    opacity: 1,
    scale: 1,
    config: {
      friction: 20,
    },
  }))

  const [blogSpring, setBlogSpring] = useSpring(() => ({
    opacity: 0,
    scale: 0,
    config: {
      friction: 20,
    },
  }))

  const [blogFrameSpring, setBlogFrameSpring] = useSpring(() => ({
    opacity: 0,
    scale: 0,
    config: {
      friction: 20,
    },
  }))

  const [terminalSpring, setTerminalSpring] = useSpring(() => ({
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

  //const terminalRef = useRef<HTMLDivElement>(null)

  // useEffect(() => {
  //   setTerminalSpring.set({
  //     opacity: 0,
  //     scale: 1,
  //   })
  //   if (!terminalRef.current) return

  //   const fitAddon = new FitAddon()
  //   const webLinksAddon = new WebLinksAddon()
  //   const webglAddon = new WebglAddon()
  //   webglAddon.onContextLoss((_) => webglAddon.dispose())

  //   const term = new T({
  //     cursorBlink: true,
  //     fontFamily: 'CaskaydiaCove Nerd Font',
  //     fontSize: 16,
  //     fontWeight: 400,
  //     fontWeightBold: 700,
  //     theme: {
  //       background: '#1e1e1e20',
  //       foreground: '#d4d4d4',
  //       cursor: '#d4d4d4',
  //       selectionBackground: '#d4d4d4',
  //       cursorAccent: '#d4d4d420',
  //     },
  //   })

  //   if (terminalRef.current) {
  //     term.open(terminalRef.current)

  //     setTerminalSpring.set({
  //       opacity: 0,
  //       scale: 0.8,
  //     })

  //     term.loadAddon(fitAddon)
  //     term.loadAddon(webLinksAddon)

  //     setTerminalSpring.start({
  //       opacity: 1,
  //       scale: 1,
  //       onChange: () => {
  //         fitAddon.fit()
  //       },
  //       onRest: () => {
  //         term.loadAddon(fitAddon)
  //         fitAddon.fit()
  //       },
  //     })

  //     term.writeln('Hello from \x1B[1;3;31mxterm.js\x1B[0m ')

  //     const disposable = term.onData((data) => {
  //       switch (data) {
  //         case '\r':
  //           term.writeln('\r\n')
  //           // get current line
  //           const line = term.buffer.active.getLine(
  //             term.buffer.active.baseY + term.buffer.active.cursorY - 1,
  //           )
  //           // get current line as string
  //           if (line) {
  //             const lineStr = line.translateToString(true)
  //             // get command from current line
  //             // replace prompt with empty string
  //             const cmd = lineStr.replace(user + path + promptSuffix, '').trim()
  //             console.log(cmd)
  //             term.write('\x1B[1A')
  //             if (cmd.length !== 0) {
  //               // move cursor up by one line
  //               switch (cmd) {
  //                 case 'clear':
  //                   term.clear()
  //                   break
  //                 case 'transition':
  //                   term.writeln("I wouldn't have done that if I were you...")
  //                   disposable.dispose()
  //                   return
  //               }
  //             }
  //           }

  //           term.write(promptText)
  //           break
  //         // Left arrow
  //         case '\x1B[D':
  //           // If cursor is at the beginning of the prompt, don't move it
  //           if (term.buffer.active.cursorX === promptLength + 1) {
  //             break
  //           }
  //           term.write('\b')
  //           break
  //         // Right arrow
  //         case '\x1B[C':
  //           term.write('\x1B[C')
  //           break
  //         // Up arrow
  //         case '\x1B[A':
  //           break
  //         // Down arrow
  //         case '\x1B[B':
  //           break
  //         case '\x03':
  //           term.writeln('^C')
  //           break
  //         case '\x04': // Ctrl-D
  //           term.writeln('^D')
  //           break
  //         case '\x1B': // Escape
  //           term.writeln('^[')
  //           break
  //         // Backspace
  //         case '\x7F':
  //           term.write('\b \b')
  //           break
  //         default:
  //           term.write(data)
  //           break
  //       }
  //     })
  //   }

  //   return () => {
  //     term.dispose()
  //   }
  // }, [terminalRef.current])

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
          <a.div
            style={contentSpring}
            className="fixed left-0 right-0 top-20 m-auto h-auto w-[40%] rounded-xl bg-zinc-900/75 portrait:w-[80%]"
          >
            <div className="m-4 text-center">
              <a.div className="inline-block" style={avatarSpring}>
                <img
                  ref={imgRef}
                  src={images[1]}
                  alt="avatar"
                  width="128"
                  height="128"
                  onLoad={() => {
                    setSpinBuffer((prev) => {
                      const ret = prev + 360
                      setAvatarSpring.start({
                        rotateZ: ret,
                        onRest: () => {
                          setAvatarSpring.set({
                            rotateZ: 0,
                          })
                          setSpinBuffer(0)
                        },
                      })
                      return ret
                    })
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
                  className="left-0 right-0 m-auto inline select-none rounded-full"
                />
              </a.div>
              <span
                onContextMenu={(e) => {
                  e.preventDefault()
                }}
                onAuxClick={() => {
                  setSpinBuffer((prev) => prev - 360)
                  setAvatarSpring.start({
                    rotateZ: spinBuffer,
                    onRest: () => {
                      setAvatarSpring.set({ rotateZ: 0 })
                      setSpinBuffer(0)
                    },
                  })
                }}
                onClick={() => {
                  setSpinBuffer((prev) => prev + 360)
                  setAvatarSpring.start({
                    rotateZ: spinBuffer,
                    onRest: () => {
                      setAvatarSpring.set({ rotateZ: 0 })
                      setSpinBuffer(0)
                    },
                  })
                }}
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
              <hr className="mb-4 border-zinc-500" />
              <div className="grid grid-flow-col grid-rows-1 justify-center space-x-2">
                <button>
                  {/* <Icon
                    onClick={() => {
                      setShowTerminal(true)
                      setContentSpring.start({
                        opacity: 0,
                        scale: 1.1,
                        onRest: () => {
                          setContentSpring.set({ opacity: 0, scale: 0 })
                        },
                      })
                    }}
                    icon="material-symbols:terminal"
                    className="text-zinc-300"
                    width="24"
                    height="24"
                    inline={true}
                  /> */}
                </button>
                {userData && (
                  <>
                    <span className="text-zinc-300">
                      <Icon
                        icon="codicon:gist"
                        inline={true}
                        className="inline text-zinc-300"
                      />
                      <CountUp
                        start={0}
                        end={userData.public_gists}
                        useEasing={true}
                        delay={0}
                      >
                        {({ countUpRef }) => <span ref={countUpRef} />}
                      </CountUp>
                    </span>
                    <span className="text-zinc-300">
                      <Icon
                        icon="mdi:location-enter"
                        inline={true}
                        className="inline text-zinc-300"
                      />
                      <CountUp
                        start={0}
                        end={userData.followers}
                        delay={0}
                        useEasing={true}
                      >
                        {({ countUpRef }) => <span ref={countUpRef} />}
                      </CountUp>
                    </span>
                    <span className="text-zinc-300">
                      <Icon
                        icon="mdi:location-exit"
                        inline={true}
                        className="inline text-zinc-300"
                      />
                      <CountUp
                        start={0}
                        end={userData.following}
                        delay={0}
                        useEasing={true}
                      >
                        {({ countUpRef }) => <span ref={countUpRef} />}
                      </CountUp>
                    </span>
                    <span className="text-zinc-300">
                      <Icon
                        icon="mdi:source-repository-multiple"
                        inline={true}
                        className="inline text-zinc-300"
                      />
                      <CountUp
                        start={0}
                        end={userData.public_repos}
                        delay={0}
                        useEasing={true}
                      >
                        {({ countUpRef }) => <span ref={countUpRef} />}
                      </CountUp>
                    </span>
                  </>
                )}
                <a.button
                  onMouseEnter={() => {
                    setButtonBlogSpring.start({
                      scale: 1.1,
                    })
                  }}
                  onMouseLeave={() => {
                    setButtonBlogSpring.start({
                      scale: 1,
                    })
                  }}
                  onClick={() => {
                    setShowBlog(true)
                    setBlogLoading(true)
                  }}
                  style={buttonBlogSpring}
                  className="text-zinc-300"
                >
                  {blogLoading ? (
                    <div className="la-ball-clip-rotate la-sm">
                      <div></div>
                    </div>
                  ) : (
                    <Icon
                      icon="mdi:blog"
                      className="inline"
                      width={24}
                      height={24}
                    />
                  )}
                </a.button>
              </div>
            </div>
          </a.div>
          <a.div
            className="fixed left-0 right-0 top-20 m-auto h-auto w-[40%] rounded-lg bg-zinc-900/75 portrait:w-[80%]"
            style={blogSpring}
          >
            <div className="p-4">
              <div className="grid grid-flow-col grid-rows-1 justify-center">
                {showBlog && (
                  <Suspense fallback={<div>Loading...</div>}>
                    {/* <iframe
                      onLoad={() => {
                        // Load the https://github.githubassets.com/assets/gist-embed-230e526d9a70.css stlyesheet
                        const gistStylesheet = document.createElement('link')
                        gistStylesheet.rel = 'stylesheet'
                        gistStylesheet.href =
                          'https://github.githubassets.com/assets/gist-embed-230e526d9a70.css'
                        gistStylesheet.type = 'text/css'
                        gistStylesheet.media = 'all'
                        frameRef.current?.contentDocument.head.appendChild(
                          gistStylesheet,
                        )

                        setBlogLoading(false)
                        setContentSpring.start({
                          opacity: 0,
                          scale: 1.1,
                          onRest: () => {
                            setContentSpring.set({
                              opacity: 0,
                              scale: 0,
                            })
                          },
                        })
                        setBlogSpring.set({
                          scale: 0.9,
                        })

                        setBlogSpring.start({
                          opacity: 1,
                          scale: 1,
                          onRest: () => {
                            setBlogFrameSpring.set({
                              opacity: 1,
                              scale: 1,
                            })
                          },
                        })
                      }}
                      ref={frameRef}
                      src={
                        'https://gist.github.com/kalkafox/1ccc307bb0983ea1561c5fd60b81f699'
                      }
                      width="256"
                      height="256"
                    />
                    <script src="https://gist.github.com/kalkafox/1ccc307bb0983ea1561c5fd60b81f699.js"></script> */}
                    Work in progress!
                  </Suspense>
                )}
              </div>
            </div>
          </a.div>
          {/* {showTerminal && (
            <>
              <button
                onClick={() => {
                  setTerminalSpring.start({
                    opacity: 0,
                    scale: 0.9,
                    onRest: () => {
                      setTerminalSpring.set({ opacity: 0, scale: 0 })
                      setShowTerminal(false)
                    },
                  })

                  setContentSpring.set({
                    scale: 1.1,
                  })
                  setContentSpring.start({
                    opacity: 1,
                    scale: 1,
                    onRest: () => {
                      setContentSpring.set({ opacity: 1, scale: 1 })
                    },
                  })
                }}
                className="fixed right-0 rounded-full bg-zinc-300 p-2"
              >
                <Icon width={24} height={24} icon="material-symbols:close" />
              </button>
              {/* <a.div
                style={terminalSpring}
                className="fixed left-0 right-0 top-20 m-auto h-auto w-[40%] rounded-xl bg-zinc-900/75 portrait:w-[80%]"
              >
                <div ref={terminalRef} className="terminal" />
              </a.div>
            </>
          )} */}
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
                  onClick={() => {}}
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
