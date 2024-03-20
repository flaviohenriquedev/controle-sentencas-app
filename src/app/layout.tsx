import type {Metadata} from 'next'
import './globals.css'
import React from "react";
import {Providers} from "@/provider/Providers";
import {Toaster} from "react-hot-toast";

export const metadata: Metadata = {
    title: 'BI Controle',
    description: 'BI Controle',
}

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode
}) {
    return (
        <html lang="pt-br" suppressHydrationWarning={true}>
        <body>
        <Providers>
            <Toaster position="top-center"/>
            {children}
        </Providers>
        </body>
        </html>
    )
}
