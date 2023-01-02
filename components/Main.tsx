import Image from "next/image"
import dynamic from "next/dynamic"
import { ReactEventHandler, useEffect, useState } from "react"
import { useSpring, useSprings, animated as a } from "@react-spring/web"

import getConfig from "next/config"

import { useRouter } from "next/router"

import splashes from "./splash.json"
import links from "./links.json"
import languages from "./languages.json"
import { Icon } from "@iconify/react"

import { images } from "../util/data"
import { setImageLoaded } from "../util/image"
import Background from "./Background"

import { Poppins } from "@next/font/google"

const poppins = Poppins({
    weight: "200",
    display: "swap",
    subsets: ["latin"],
})

const { publicRuntimeConfig } = getConfig()
const { NEXT_VERSION, PAGE_VERSION } = publicRuntimeConfig


const Main = () => {

    const router = useRouter()

    const [showLoadSpinner, setShowLoadSpinner] = useState(true)

    const [splashText, setSplashText] = useState(splashes[Math.floor(Math.random() * splashes.length)])

    const [flipAvatar, setFlipAvatar] = useState(false)

    const [linkSprings, setLinkSprings] = useSprings(links.length, () => ({
        opacity: 1,
        y: 5,
        color: "#f0f0f0",
        scale: 1,
    }))

    // todo: deprecated
    const [languageSprings, setLanguageSprings] = useSprings(languages.length, () => ({
        scale: 1,
    }))

    const [backgroundSpring, setBackgroundSpring] = useSpring(() => ({
        scale: 1,
        opacity: 0,
        config: {
            friction: 20,
        }
    }))

    const [mainMenuSpring, setMainMenuSpring] = useSpring(() => ({
        opacity: 0,
        scale: 1,
        config: {
            friction: 20,
        }
    }))

    const [avatarSpring, setAvatarSpring] = useSpring(() => ({
        rotateZ: 0,
        scale: 1,
        config: {
            friction: 10,
        }
    }))

    const [loadSpring, setLoadSpring] = useSpring(() => ({
        opacity: 1,
        scale: 1,
    }))

    const [loadedImages, setLoadedImages] = useState<string[]>([])

    useEffect(() => {
        const onLoad = () => {
            setBackgroundSpring.start({
                opacity: 1,
                onRest: () => {
                    setShowLoadSpinner(false)
                }
            })
    
            setMainMenuSpring.start({
                opacity: 1,
                scale: 1,
                config: {
                    friction: 20,
                }
            })
        }

        if (loadedImages.length === images.length) {
            onLoad()
        }
    }, [loadedImages, setMainMenuSpring, setBackgroundSpring])

    useEffect(() => {

        if (flipAvatar) {
            const choices = [-360, 360]
            const choice = choices[Math.floor(Math.random() * choices.length)]
            setAvatarSpring.start({rotateZ: choice, onRest: () => {
                setAvatarSpring.set({rotateZ: 0})
                setFlipAvatar(false)
            }})
        }
    }, [flipAvatar, setAvatarSpring])


    return (
        <>
            {showLoadSpinner && (
                <div className="w-full h-full fixed">
                    <div className="w-[40%] portrait:w-[80%] lg:w-[80%] h-auto fixed left-0 right-0 top-20 m-auto">
                        <div className="text-center m-4">
                            <span className="w-[136px] h-[136px] top-3 left-0 right-0 m-auto absolute loader" />
                        </div>
                    </div>
                </div>
            )}
                <a.div style={loadSpring} className="fixed w-full h-full">
                <a.div style={backgroundSpring}><Background setReady={setLoadedImages} /></a.div>
                <div className="w-full h-full fixed bg-zinc-900 opacity-50" />
                <a.div style={mainMenuSpring} className="w-full h-full fixed">
                    <div className="w-[40%] portrait:w-[80%] h-auto fixed bg-zinc-900/75 rounded-xl left-0 right-0 top-20 m-auto">
                        <div className="text-center m-4">
                            <a.div className="inline-block" style={avatarSpring}><Image onLoad={() => setImageLoaded(images[1], setLoadedImages)} src={images[1]} alt="avatar" width="128" height="128" className="rounded-full inline left-0 right-0 m-auto" quality="80" priority /></a.div>
                            <span onClick={() => setFlipAvatar(true)} className="w-[128px] h-[128px] left-0 right-0 m-auto fixed rounded-full border-2 border-zinc-300" />
                            <p className={`text-zinc-300 text-xl mt-4 mb-4 ${poppins.className}`}>{splashText}</p>
                            <div className="grid gap-4 grid-flow-col-dense justify-center text-3xl mb-8">
                                {linkSprings.map((props, index) => (
                                    links[index].active && (
                                        <a.a style={linkSprings[index]} rel="noreferrer" target="_blank" href={links[index].link} key={links[index].icon}
                                        onMouseEnter={() => {
                                            // @ts-ignore: Type error
                                            //e.target.style.color = links[index].color
                                            props.color.start(links[index].color)
                                            props.scale.start(1.15)
                                        }}
                                        onMouseLeave={(e) => {
                                            // @ts-ignore: Type error
                                            //e.target.style.color = link.active ? "rgb(212,212,216)" : "rgb(82,82,86)"
                                            props.color.start("#f0f0f0")
                                            props.scale.start(1)
                                        }}
                                        ><Icon icon={links[index].icon} /></a.a>
                                    )
                                ))}
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
                            <button><Icon icon="material-symbols:terminal" width="24" height="24" inline={true} /></button>
                            <button><Icon icon="mdi:minecraft" width="24" height="24" inline={true} /></button>
                        </div>
                    </div>
                    <div className="w-full bg-zinc-900/50 h-6 fixed bottom-0">
                        <span className="inline-block fixed"><a href="https://github.com/kalkafox/kalkafox.github.io" rel="noreferrer" target="_blank"><Icon className="inline" icon="mdi:github" width="22" height="22" inline={true} /></a></span>
                        <div className="right-0 absolute -top-2 select-none">
                            <a href="https://nextjs.org" rel="noreferrer" target="_blank">
                                {/*<Icon className="fixed right-0 fill-zinc-300 mr-[90px] -bottom-5" icon="logos:nextjs" width="64" height="64" inline={true} />*/}
                                <svg xmlns="http://www.w3.org/2000/svg" className="fixed right-0 mr-[180px] w-20 bottom-1" fill="none" viewBox="0 0 394 80"><path fill="#eee" d="M262 0h68.5v12.7h-27.2v66.6h-13.6V12.7H262V0ZM149 0v12.7H94v20.4h44.3v12.6H94v21h55v12.6H80.5V0h68.7zm34.3 0h-17.8l63.8 79.4h17.9l-32-39.7 32-39.6h-17.9l-23 28.6-23-28.6zm18.3 56.7-9-11-27.1 33.7h17.8l18.3-22.7z"/><path fill="#eee" d="M81 79.3 17 0H0v79.3h13.6V17l50.2 62.3H81Zm252.6-.4c-1 0-1.8-.4-2.5-1s-1.1-1.6-1.1-2.6.3-1.8 1-2.5 1.6-1 2.6-1 1.8.3 2.5 1a3.4 3.4 0 0 1 .6 4.3 3.7 3.7 0 0 1-3 1.8zm23.2-33.5h6v23.3c0 2.1-.4 4-1.3 5.5a9.1 9.1 0 0 1-3.8 3.5c-1.6.8-3.5 1.3-5.7 1.3-2 0-3.7-.4-5.3-1s-2.8-1.8-3.7-3.2c-.9-1.3-1.4-3-1.4-5h6c.1.8.3 1.6.7 2.2s1 1.2 1.6 1.5c.7.4 1.5.5 2.4.5 1 0 1.8-.2 2.4-.6a4 4 0 0 0 1.6-1.8c.3-.8.5-1.8.5-3V45.5zm30.9 9.1a4.4 4.4 0 0 0-2-3.3 7.5 7.5 0 0 0-4.3-1.1c-1.3 0-2.4.2-3.3.5-.9.4-1.6 1-2 1.6a3.5 3.5 0 0 0-.3 4c.3.5.7.9 1.3 1.2l1.8 1 2 .5 3.2.8c1.3.3 2.5.7 3.7 1.2a13 13 0 0 1 3.2 1.8 8.1 8.1 0 0 1 3 6.5c0 2-.5 3.7-1.5 5.1a10 10 0 0 1-4.4 3.5c-1.8.8-4.1 1.2-6.8 1.2-2.6 0-4.9-.4-6.8-1.2-2-.8-3.4-2-4.5-3.5a10 10 0 0 1-1.7-5.6h6a5 5 0 0 0 3.5 4.6c1 .4 2.2.6 3.4.6 1.3 0 2.5-.2 3.5-.6 1-.4 1.8-1 2.4-1.7a4 4 0 0 0 .8-2.4c0-.9-.2-1.6-.7-2.2a11 11 0 0 0-2.1-1.4l-3.2-1-3.8-1c-2.8-.7-5-1.7-6.6-3.2a7.2 7.2 0 0 1-2.4-5.7 8 8 0 0 1 1.7-5 10 10 0 0 1 4.3-3.5c2-.8 4-1.2 6.4-1.2 2.3 0 4.4.4 6.2 1.2 1.8.8 3.2 2 4.3 3.4 1 1.4 1.5 3 1.5 5h-5.8z"/></svg>
                            </a>
                            <span className="relative top-[6.5px]">{NEXT_VERSION}</span>
                            <span className="relative top-[6.5px]">, page version {PAGE_VERSION}</span>
                        </div>
                    </div>
                </a.div>
            </a.div>
        </>
    )
}

export default Main