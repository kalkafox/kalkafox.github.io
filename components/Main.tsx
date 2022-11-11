import Image from "next/image"
import { useEffect } from "react"
import { useSpring, animated as a } from "@react-spring/web"

import splashes from "./splash.json"
import links from "./links.json"
import languages from "./languages.json"
import { Icon } from "@iconify/react"


const Main = () => {

    const [backgroundImageSpring, setBackgroundImageSpring] = useSpring(() => ({
        scale: 1.5,
        x: 0,
        y: 0,
    }))

    useEffect(() => {
        const interval = setInterval(() => {
            // get timestamp in seconds
            const timestamp = Math.floor(Date.now())
            // rotate the background in a circular motion using sine and cosine
            const x = Math.cos(timestamp / 5000) * 100
            const y = Math.sin(timestamp / 5000) * 100
            setBackgroundImageSpring({
                x,
                y,
            })
        }, 10)

        const handleResize = () => {
            if (window.innerWidth < 768 || window.innerHeight < 768) {
                setBackgroundImageSpring({
                    scale: 5,
                })
            } else {
                setBackgroundImageSpring({
                    scale: 1.5,
                })
            }
        }

        window.addEventListener("resize", handleResize)

        return () => clearInterval(interval)
    }, [setBackgroundImageSpring])

    return (
        <>
            <a.div
                className="fixed w-full h-full object-cover"
                style={backgroundImageSpring}
            ><Image src="https://db17gxef1g90a.cloudfront.net/img/1_blur.png" alt="gilneas" width="1920" height="1080" className="fixed object-cover bg-cover w-full h-full" quality="100" /></a.div>
            <div className="w-full h-full fixed bg-zinc-900 opacity-50" />
            <div className="w-full h-full fixed">
                <div className="w-[40%] portrait:w-[80%] h-auto fixed bg-zinc-900/75 rounded-xl left-0 right-0 top-20 m-auto">
                    <div className="text-center m-4">
                        <Image src="https://avatars.githubusercontent.com/u/9144208?s=460&u=3d2e3c8d0d8f8b8f8f8f8f8f8f8f8f8f8f8f8f8f&v=4" alt="avatar" width="128" height="128" className="rounded-full left-0 right-0 m-auto mt-4" quality="100" />
                        <p className="text-white font-['Inter'] text-xl mt-4 mb-4">{splashes[Math.floor(Math.random() * splashes.length)]}</p>
                        <div className="grid gap-4 grid-flow-col-dense justify-center text-3xl mb-8">
                            {links.map((link) => (
                                    <a rel="noreferrer" target="_blank" href={link.link} key={link.icon}
                                    onMouseEnter={(e) => {
                                        // eslint-disable-next-line
                                        e.target.style.color = link.color
                                    }}
                                    onMouseLeave={(e) => {
                                        // eslint-disable-next-line
                                        e.target.style.color = link.active ? "rgb(212,212,216)" : "rgb(82,82,86)"
                                    }}
                                    ><Icon icon={link.icon} className={`transition-all ${link.active ? "text-zinc-300" : "text-zinc-600"}`} /></a>
                            ))}
                        </div>
                        <div className="grid gap-4 grid-flow-col-dense justify-center text-2xl mb-4">
                            {languages.map((language) => (
                                    <Icon icon={language.icon}
                                    key={language.icon}
                                    onMouseEnter={(e) => {
                                        // eslint-disable-next-line
                                        e.target.style.filter = "saturation(100%)"
                                    }}
                                    onMouseLeave={(e) => {
                                        // eslint-disable-next-line
                                        e.target.style.filter = "saturation(0%)"
                                    }}
                                    className="transition-all" />
                            ))}
                        </div>
                        <hr className="border-zinc-500 mb-4" />
                        <p className="font-['Inter']">Current Projects (WIP)</p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Main