"use client";

import React from "react";
import {SideMenuContextProvider} from "@/context/app/SideMenuContext";
import {SessionProvider} from "next-auth/react";
import {ThemeProvider} from "next-themes";

export function Providers({children}: { children: React.ReactNode }) {
    return (
        <SessionProvider>
            <ThemeProvider defaultTheme={`winter`}>
                <SideMenuContextProvider>
                    {children}
                </SideMenuContextProvider>
            </ThemeProvider>
        </SessionProvider>
    )
}
