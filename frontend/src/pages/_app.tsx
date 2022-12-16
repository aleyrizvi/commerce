import "@assets/styles/globals.css"
import { NextPage } from "next"
import type { AppProps } from "next/app"
import Head from "next/head"
import React, { ReactElement, ReactNode } from "react"
import { MantineProvider } from '@mantine/core';

export type NextPageExtended = NextPage & {
    layout: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
    Component: NextPageExtended,
}

export default function App({Component, pageProps}: AppPropsWithLayout) {
    const getLayout = Component.layout || ((page) => page)

    return <>
        <Head>
            <title>Ecommerce example</title>
            <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
        </Head>
        <MantineProvider
            theme={{
                globalStyles: (theme) => ({
                    '*, *::before, *::after': {
                        boxSizing: 'border-box',
                    },

                    body: {
                        ...theme.fn.fontStyles(),
                        backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
                        color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.colors.gray,
                        lineHeight: theme.lineHeight,
                    },

                    '.your-class': {
                        backgroundColor: 'red',
                    },

                    '#your-id > [data-active]': {
                        backgroundColor: 'pink',
                    },
                }),
            }}
        >
        {getLayout(<Component {...pageProps} />)}
        </MantineProvider>
    </>
}
