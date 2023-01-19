import { useEffect, useState, useRef } from 'react'

import { useSpring, animated as a, useSpringValue } from '@react-spring/web'

import Background from './Background'

import { Icon } from '@iconify/react'

import { Buffer } from 'buffer'

export default function AkundaComponent() {
  const [loadedImages, setLoadedImages] = useState<string[]>([])

  const [showLoadSpinner, setShowLoadSpinner] = useState(true)

  const [encryptMode, setEncryptMode] = useState(true)

  const multiLineInputRef = useRef<HTMLTextAreaElement>(null)

  const [showMultiLineInput, setShowMultiLineInput] = useState(false)

  const encryptColorSpring = useSpringValue('#eeeeee')
  const decryptColorSpring = useSpringValue('#eeeeee')

  const [decoded, setDecoded] = useState('')

  const [key, setKey] = useState('')

  const [message, setMessage] = useState('')

  const [backgroundSpring, setBackgroundSpring] = useSpring(() => ({
    scale: 1,
    opacity: 0,
    config: {
      friction: 20,
    },
  }))

  const [buttonSelectionSpring, setButtonSelectionSpring] = useSpring(() => ({
    scale: 1,
    x: 0,
    config: {
      friction: 20,
    },
  }))

  const [colorSpring, setColorSpring] = useSpring(() => ({
    color: '#eeeeee',
    config: {
      friction: 20,
    },
  }))

  const [multiLineInputSpring, setMultiLineInputSpring] = useSpring(() => ({
    opacity: 0,
    scale: 0.8,
    config: {
      friction: 20,
    },
  }))

  const [loadSpring, setLoadSpring] = useSpring(() => ({
    opacity: 1,
    scale: 1,
  }))

  const [mainMenuSpring, setMainMenuSpring] = useSpring(() => ({
    opacity: 0,
    scale: 0.8,
    config: {
      friction: 20,
    },
  }))

  useEffect(() => {
    loadedImages.find((image) => image === '/6_blur.jpg') &&
      setBackgroundSpring.start({
        opacity: 1,
        scale: 1,
      })

    setMainMenuSpring.start({
      opacity: 1,
      scale: 1,
    })
  }, [loadedImages, setBackgroundSpring, setMainMenuSpring])

  useEffect(() => {
    window.localStorage.getItem('akunda-key') &&
      setKey(window.localStorage.getItem('akunda-key') || '')
  }, [])

  useEffect(() => {
    if (key.length === message.length) {
      // do nothing for now
    }

    const messageBuffer = Buffer.from(message, 'base64')
    const keyBuffer = Buffer.from(key, 'base64')

    const buffer = Buffer.alloc(messageBuffer.length)

    messageBuffer.forEach((byte, index) => {
      const keyByte = keyBuffer[index]
      const decodedByte = byte ^ keyByte
      buffer[index] = decodedByte
    })

    setDecoded(buffer.toString())
  }, [key, message])

  const openMultiLineInput = () => {
    setShowMultiLineInput(true)
  }

  useEffect(() => {
    if (showMultiLineInput) {
      
      setMultiLineInputSpring.start({
        opacity: 1,
        scale: 1,
      })
    }
  }, [showMultiLineInput, setMultiLineInputSpring])

  useEffect(() => {
    if (encryptMode) {
      encryptColorSpring.start('#333333')
      decryptColorSpring.start('#eeeeee')
    } else {
      encryptColorSpring.start('#eeeeee')
      decryptColorSpring.start('#333333')
    }
  }, [encryptMode])

  return (
    <>
      <div className="w-full h-full fixed bg-zinc-900" />
      {showLoadSpinner && (
        <div className="w-full h-full fixed">
          <div className="w-[40%] portrait:w-[80%] lg:w-[80%] h-auto fixed left-0 right-0 top-20 m-auto">
            <div className="text-center m-4">
              <span className="w-[136px] h-[136px] top-3 left-0 right-0 m-auto absolute loader" />
            </div>
          </div>
        </div>
      )}
      <a.div style={loadSpring} className="fixed w-full h-full select-none">
        <a.div style={backgroundSpring}>
          <Background
            setReady={setLoadedImages}
            image={'/6_blur.jpg'}
            doResize={false}
            mod={5000}
            amp={20}
          />
          {/* TODO get background from aws */}
        </a.div>
      </a.div>
      <a.div style={mainMenuSpring} className="w-full h-full fixed">
        <div className="w-[40%] portrait:w-[80%] backdrop-blur-lg h-auto fixed bg-zinc-900/50 rounded-xl left-0 right-0 top-20 m-auto">
          <div className={`text-center m-4 font-[Poppins] text-zinc-300`}>
            Clarity comes after the storm.
          </div>

          <a.div style={buttonSelectionSpring} className="absolute right-20 bg-zinc-400 w-20 left-0 text-center m-auto inline rounded-xl text-zinc-400">.</a.div>

          <a.button
            style={{
              color: encryptColorSpring,
            }}
            onClick={
            () => {
              setButtonSelectionSpring.start({
                x: 0,
              })
              setEncryptMode(true)
            }
          } className="absolute right-20 w-20 left-0 text-center m-auto text-zinc-900 font-[Poppins] inline">Encrypt</a.button>
          <a.button
            style={{
              color: decryptColorSpring,
            }}
            onClick={
            () => {
              setButtonSelectionSpring.start({
                x: 80,
              })
              setEncryptMode(false)
            }
          } className="absolute left-20 w-20 right-0 text-center m-auto font-[Poppins] text-zinc-300 inline">Decrypt</a.button>
          <br />

          <div className="m-4">
            <form className="w-[90%]">
              <div className="grid-cols-2 grid gap-2">
                <Icon icon="material-symbols:key" className="text-4xl w-full text-zinc-300" />
                <code>
                  <input
                    className="w-full rounded-lg bg-zinc-900/50 text-zinc-50 p-2"
                    value={key}
                    onChange={(e) => {
                      setKey(e.target.value)
                    }}
                    type="text"
                    placeholder={`Example: ${Buffer.from(
                      crypto.randomUUID(),
                      'base64',
                    ).toString('utf8')}...`}
                  />
                </code>
                <Icon
                  icon="mdi:message-lock-outline"
                  className="text-4xl inline w-full text-zinc-300"
                  inline={true}
                />
                {/* resizable input box */}
                <code>
                  <textarea
                    className="w-full resize-none rounded-lg bg-zinc-900/50 text-zinc-50 p-2"
                    onChange={(e) => {
                      setMessage(e.target.value)
                    }}
                    onDoubleClick={() => {
                      openMultiLineInput()
                    }}
                  />
                </code>
              </div>
            </form>

            <div className="grid grid-flow-col gap-2 justify-center relative">
              <a.button
                style={colorSpring}
                onClick={() => {
                  if (key.length === 0) {
                    return
                  }
                  setColorSpring.start({
                    color: '#22ee22',
                    onRest: () => {
                      setTimeout(() => {
                        setColorSpring.start({
                          color: '#eeeeee',
                        })
                      }, 500)
                    },
                  })
                  window.localStorage.setItem('akunda-key', key)
                }}
              >
                <Icon
                  icon="mdi:content-save-check-outline"
                  className="text-xl"
                />
              </a.button>
              <button>
                <input type="checkbox" className="hidden" />
              </button>
            </div>

            <hr className="w-48 h-1 mx-auto my-4 bg-gray-100 border-0 rounded md:my-10 dark:bg-gray-700" />
            <div className="m-4">
              <Icon
                icon="mdi:message-reply-outline"
                className="text-4xl w-full text-zinc-300"
              />
              <code>
                <textarea
                  disabled={true}
                  value={decoded}
                  className="resize-none w-full rounded-lg bg-zinc-900/50 text-zinc-50 p-2"
                />
              </code>
              <code>
                <textarea
                  disabled={true}
                  value={Buffer.from(decoded).toString('base64')}
                  className="resize-none w-full rounded-lg bg-zinc-900/50 text-zinc-50 p-2"
                />
              </code>
            </div>
          </div>
        </div>
      </a.div>
      {showMultiLineInput && (
        <div
          onClick={(e) => {
            if (e.target !== multiLineInputRef.current) {
              setMultiLineInputSpring.start({
                opacity: 0,
                scale: 0.8,
                onRest: () => {
                  setShowMultiLineInput(false)
                },
              })
            }
          }}
          className="w-full h-full fixed bg-zinc-900/0"
        >
          <a.div
            style={multiLineInputSpring}
            className="w-[38%] portrait:w-[80%] h-auto fixed backdrop-blur-lg bg-zinc-900/50 rounded-xl left-0 right-0 top-20 m-auto"
          >
            <textarea
              ref={multiLineInputRef}
              className="w-full rounded-lg h-80 bg-zinc-900/50 text-zinc-50 p-2"
              value={message}
              onChange={(e) => {
                setMessage(e.target.value)
              }}
            />
          </a.div>
        </div>
      )}
    </>
  )
}
