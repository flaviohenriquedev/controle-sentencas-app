import React from "react";
import * as S from './style'

export function AppLayoutContainer({children}: { children: React.ReactNode }) {
    return (
        <S.Container>
            {children}
        </S.Container>
    )
}
