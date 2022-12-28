import Background from "../components/Background"

import { useEffect, useState } from "react"

import { useSpring, animated as a } from "@react-spring/web"

import { images } from "../util/data"


const MinecraftRemote = ({ showBackground = true }) => {

    const [loadedImages, setLoadedImages] = useState<string[]>([])

    const [backgroundSpring, setBackgroundSpring] = useSpring(() => ({
        scale: 1,
        opacity: 0,
    }))

    const setImageLoaded = (image: string) => {
        setLoadedImages((loadedImages) => [...loadedImages, image])
    }

    useEffect(() => {
        for (const image of loadedImages) {
            if (image === images[0]) {
                console.log("ya")
                setBackgroundSpring.start({
                    opacity: 1,
                })
            }
        }
    }, [loadedImages])

    return (
        <>
            {showBackground && <a.div style={backgroundSpring}><Background setReady={setImageLoaded} /></a.div>}
            <div className="w-[40%] portrait:w-[80%] h-auto fixed bg-zinc-900/75 rounded-xl left-0 right-0 top-20 m-auto">
                <div className="text-center m-4">
                    <h1 className="text-4xl font-bold">Minecraft Remote (work in progress!)</h1>
                </div>
            </div>
        </>
    )
}

export default MinecraftRemote
