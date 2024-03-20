import * as S from './style'
import {HTMLAttributes, ReactNode} from "react";

interface ModalResultsProps extends HTMLAttributes<HTMLDivElement> {
    children: ReactNode
}
export function ModalResults({children, className} : ModalResultsProps) {
    return (
        <S.Result className={className}>
            {children}
        </S.Result>
    )
}
