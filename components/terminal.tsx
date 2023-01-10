export {}
// import { Terminal as T } from 'xterm'
// import { FitAddon } from 'xterm-addon-fit'
// import { WebLinksAddon } from 'xterm-addon-web-links'
// import { WebglAddon } from 'xterm-addon-webgl'
// import { SearchAddon } from 'xterm-addon-search'

// import { useEffect, useRef, useState } from 'react'
// import { SpringRef } from '@react-spring/web'

// const Terminal = () => {
//   const [terminalReady, setTerminalReady] = useState(false)
//   const [terminal, setTerminal] = useState<T | null>(null)

//   const terminalRef = useRef<HTMLDivElement>(null)

//   useEffect(() => {
//     const term = new T({
//       cursorBlink: true,
//       allowTransparency: true,
//       theme: {
//         background: '#1e1e1e',
//         black: '#000000',
//         blue: '#569cd6',
//         brightBlack: '#666666',
//         brightBlue: '#569cd6',
//         brightCyan: '#4ec9b0',
//         brightGreen: '#608b4e',
//         brightMagenta: '#b4a76c',
//         brightRed: '#d16969',
//         brightWhite: '#e5e5e5',
//         brightYellow: '#d7ba7d',
//         cyan: '#4ec9b0',
//         foreground: '#d4d4d4',
//         green: '#608b4e',
//         magenta: '#b4a76c',
//         red: '#d16969',
//         white: '#e5e5e5',
//         yellow: '#d7ba7d',
//       },
//     })

//     setTerminalReady(true)
//     setTerminal(term)
//   }, [])

//   useEffect(() => {
//     if (terminal && terminalReady && terminalRef.current) {
//       const fitAddon = new FitAddon()
//       const webLinksAddon = new WebLinksAddon()
//       const webglAddon = new WebglAddon()
//       const searchAddon = new SearchAddon()

//       terminal.loadAddon(fitAddon)
//       terminal.loadAddon(webLinksAddon)
//       terminal.loadAddon(webglAddon)
//       terminal.loadAddon(searchAddon)

//       terminal.open(terminalRef.current)
//       fitAddon.fit()

//       terminal.write(
//         "You will die within these dunes... Is that how it's said?\r\n>",
//       )

//       terminal.onData((data) => {
//         // if the user does not press enter, write the data to the terminal
//         if (data !== '\r') {
//           terminal.write(data)
//         }
//       })

//       terminal.onKey((e) => {
//         if (e.domEvent.key === 'Enter') {
//           terminal.write('\r\n>')
//           // move cursor to the right 1 character
//         }

//         // if backspace is pressed, delete the last character
//         else if (e.domEvent.key === 'Backspace') {
//           terminal.write('\b \b')
//         }
//       })
//     }
//   }, [terminal, terminalReady])

//   return (
//     <>
//       <div
//         className="bottom-0 top-0 h-80 fixed left-0 right-0 m-auto w-[600px]"
//         ref={terminalRef}
//       ></div>
//     </>
//   )
// }

// export default Terminal
