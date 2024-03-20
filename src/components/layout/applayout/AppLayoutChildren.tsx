'use client'

import React, {useContext} from "react";
import * as S from './style'
import {SideMenuContext} from "@/context/app/SideMenuContext";

export function AppLayoutChildren({children}: { children: React.ReactNode }) {
    const {expanded} = useContext(SideMenuContext)
    
    return (
        <S.Children expandido={expanded.toString()}>
            {children}
        </S.Children>
    )
}
