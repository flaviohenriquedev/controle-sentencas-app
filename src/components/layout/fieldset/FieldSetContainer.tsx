import * as S from './style'
import React from "react";

interface Props {
    legend?: string
    children: React.ReactNode
}

export function FieldsetContainer({legend, children}: Props) {
    return (
        <S.Container>
            {legend && <S.Legend>{legend}</S.Legend>}
            {children}
        </S.Container>
    )
}
