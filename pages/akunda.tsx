import dynamic from 'next/dynamic'

const AkundaComponent = dynamic(() => import('../components/Akunda'), {
  // make sure everything beyond this point is client only
  ssr: false,
})

export default function Akunda() {
  return <AkundaComponent />
}
