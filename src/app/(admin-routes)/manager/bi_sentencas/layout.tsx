import {AppLayout} from "@/components/layout/applayout";
import {RoutesBISentencas} from "@/data/routes";
import React from "react";

export default function BiSentencasLayout({children}: { children: React.ReactNode }) {
    return (
        <AppLayout.Content>
            <AppLayout.Sidemenu routes={RoutesBISentencas}/>
            <AppLayout.Children>
                {children}
            </AppLayout.Children>
        </AppLayout.Content>
    )
}
