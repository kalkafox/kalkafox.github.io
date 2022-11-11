import {Html, Head, Main, NextScript} from 'next/document'


const Document = () => {
    return (
        <Html>
            <Head>
                {/* TODO: meta stuff and favicon */}
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <body>
                <Main />
                <NextScript />
            </body>
        </Html>
    )
}

export default Document
