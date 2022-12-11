import Image from "next/image"
import { ReactEventHandler, useEffect, useState } from "react"
import { useSpring, useSprings, animated as a } from "@react-spring/web"

import splashes from "./splash.json"
import links from "./links.json"
import languages from "./languages.json"
import { Icon } from "@iconify/react"


const Main = () => {

    const [showLoadSpinner, setShowLoadSpinner] = useState(true)

    const [splashText, setSplashText] = useState(splashes[Math.floor(Math.random() * splashes.length)])

    const [flipAvatar, setFlipAvatar] = useState(false)

    const [linkSprings, setLinkSprings] = useSprings(links.length, () => ({
        opacity: 1,
        y: 5,
        color: "#f0f0f0",
    }))

    const [languageSprings, setLanguageSprings] = useSprings(languages.length, () => ({
        scale: 1,
    }))

    const [avatarSpring, setAvatarSpring] = useSpring(() => ({
        rotateZ: 0,
        scale: 1,
        config: {
            friction: 10,
        }
    }))

    const [backgroundImageSpring, setBackgroundImageSpring] = useSpring(() => ({
        scale: 1.5,
        x: 0,
        y: 0,
    }))

    const [loadSpring, setLoadSpring] = useSpring(() => ({
        opacity: 0,
    }))

    useEffect(() => {
        const interval = setInterval(() => {
            // get timestamp in seconds
            const timestamp = Math.floor(Date.now())
            // rotate the background in a circular motion using sine and cosine
            const x = Math.cos(timestamp / 5000) * 100
            const y = Math.sin(timestamp / 5000) * 100
            setBackgroundImageSpring.start({
                x,
                y,
            })
        }, 10)

        const handleResize = () => {
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

        window.addEventListener("resize", handleResize)

        return () => clearInterval(interval)
    }, [setBackgroundImageSpring])

    const onLoad = () => {
        setLoadSpring.start({
            opacity: 1,
            onRest: () => {
                setShowLoadSpinner(false)
            }
        })
        if (window.innerWidth < 768 && window.innerHeight < 768) {
            setBackgroundImageSpring.start({
                scale: 5,
            })
        } else {
            setBackgroundImageSpring.start({
                scale: 1.5,
            })
        }
    }

    // define images to download before showing the page
    const images = [
        "https://db17gxef1g90a.cloudfront.net/img/1_blur.png",
        "https://avatars.githubusercontent.com/u/9144208?s=460&u=3d2e3c8d0d8f8b8f8f8f8f8f8f8f8f8f8f8f8f8f&v=4"
    ]

    const [loadedImages, setLoadedImages] = useState<string[]>([])

    const setImageLoaded = (image: string) => {
        setLoadedImages((loadedImages) => [...loadedImages, image])
    }

    useEffect(() => {
        if (loadedImages.length === images.length) {
            onLoad()
        }
    }, [loadedImages])

    useEffect(() => {
        if (flipAvatar) {
            console.log("ya")
            setAvatarSpring.start({rotateZ: 360, onRest: () => {
                setAvatarSpring.set({rotateZ: 0})
                setFlipAvatar(false)
            }})
        }
    }, [flipAvatar])


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
            <a.div style={loadSpring}>
                <a.div
                    className="fixed w-full h-full object-cover"
                    style={backgroundImageSpring}
                ><Image onProgress={() => {
                    console.log("progress")
                }} onLoad={() => setImageLoaded(images[0])} src={images[0]} alt="gilneas" width="1920" height="1080" className="fixed object-cover bg-cover w-screen h-screen" quality="100" priority /></a.div>
                <div className="w-full h-full fixed bg-zinc-900 opacity-50" />
                <div className="w-full h-full fixed">
                    <div className="w-[40%] portrait:w-[80%] h-auto fixed bg-zinc-900/75 rounded-xl left-0 right-0 top-20 m-auto">
                        <div className="text-center m-4">
                            <a.div className="inline-block" style={avatarSpring}><Image onLoad={() => setImageLoaded(images[1])} src={images[1]} alt="avatar" width="128" height="128" className="rounded-full inline left-0 right-0 m-auto" quality="100" priority /></a.div>
                            <span onClick={() => setFlipAvatar(true)} className="w-[128px] h-[128px] left-0 right-0 m-auto fixed rounded-full border-2 border-zinc-300" />
                            <p className="text-zinc-300 font-['Poppins'] text-xl mt-4 mb-4">{splashText}</p>
                            <div className="grid gap-4 grid-flow-col-dense justify-center text-3xl mb-8">
                                {linkSprings.map((props, index) => (
                                    links[index].active && (
                                        <a.a style={linkSprings[index]} rel="noreferrer" target="_blank" href={links[index].link} key={links[index].icon}
                                        onMouseEnter={() => {
                                            // @ts-ignore: Type error
                                            //e.target.style.color = links[index].color
                                            props.y.start(0)
                                            props.color.start(links[index].color)
                                        }}
                                        onMouseLeave={(e) => {
                                            // @ts-ignore: Type error
                                            //e.target.style.color = link.active ? "rgb(212,212,216)" : "rgb(82,82,86)"
                                            props.y.start(5)
                                            props.color.start("#f0f0f0")
                                        }}
                                        ><Icon icon={links[index].icon} /></a.a>
                                    )
                                ))}
                            </div>
                            <div className="grid gap-4 grid-flow-col-dense justify-center text-2xl mb-4">
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
                            </div>
                            <hr className="border-zinc-500 mb-4" />
                            <p className="font-['Poppins'] text-zinc-300">Current Projects (WIP)</p>
                            <div className="w-full h-full rounded-xl absolute"></div>
                        </div>
                    </div>
                </div>
            </a.div>
        </>
    )
}

export default Main