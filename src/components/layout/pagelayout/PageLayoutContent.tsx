import React from "react";
import * as S from './style'

export function PageLayoutContent ({children}:{children: React.ReactNode}) {
    return (
        <S.Content>
            {children}
        </S.Content>
    )
}
