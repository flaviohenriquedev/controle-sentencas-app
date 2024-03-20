import {AppLayout} from "@/components/layout/applayout";
import {RoutesAdministracaoSistema} from "@/data/routes";
import React from "react";

export default function BiSentencasLayout({children}: { children: React.ReactNode }) {
    return (
        <AppLayout.Content>
            <AppLayout.Sidemenu routes={RoutesAdministracaoSistema}/>
            <AppLayout.Children>
                {children}
            </AppLayout.Children>
        </AppLayout.Content>
    )
}
