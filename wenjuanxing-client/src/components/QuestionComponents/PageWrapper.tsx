

import Head from "next/head";
import React,{FC} from "react";
import styles from '../../styles/Common.module.scss'
import Script from "next/script";

type PropsType={
    title?:string,
    desc?:string,
    css?:string,
    js?:string,
    children:JSX.Element|JSX.Element[]
}

export const PageWrapper:FC<PropsType>=(props:PropsType)=>{
    // 解构属性
    const {title,children,desc,js,css} = props

    return <>
        <Head>
            <title>{title}</title>
            <meta name="description" content={desc} />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <link rel="icon" href="/favicon.ico" />
            <script>{css}</script>
        </Head>
        <main className={styles.container}>
            {children}
        </main>
        <Script id='page-js'>
            {js}
        </Script>
    </>
}