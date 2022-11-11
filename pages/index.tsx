import dynamic from "next/dynamic"
import { Suspense } from "react"

const MainComponent = dynamic(() => import("../components/Main"), { suspense: true})

const Index = () => {
  return (
    <>
      <div className="h-full w-full fixed bg-zinc-900" />
      <Suspense>
        <MainComponent />
      </Suspense>
    </>
  )
}

export default Index
