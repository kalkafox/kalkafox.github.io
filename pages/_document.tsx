import {Html, Head, Main, NextScript} from 'next/document'


const Document = () => {
    return (
        <Html>
            <Head>
                {/* TODO: meta stuff and favicon */}
                <link rel="icon" href="/favicon.ico" />
                <meta content="#0f0f0f" data-react-helmet="true" name="theme-color" />
                <meta
                    name="og:description"
                    content="Hi, I do stuffs. This is my personal website. Nothing interesting."
                />
                <meta name="og:title" content="kalkafox" />
                <meta
                    name="og:image"
                    content="https://avatars.githubusercontent.com/u/9144208"
                />
            </Head>
            <body>
                <Main />
                <NextScript />
            </body>
        </Html>
    )
}

export default Document
