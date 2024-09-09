import Head from "next/head";


export default function About(){
    return <>
        <Head>
            <title>Next About</title>
            <meta name="description" content="Next About" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <link rel="icon" href="/favicon.ico" />
        </Head>
        <main>
            <p>About</p>
        </main>
    </>
}