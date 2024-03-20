import * as S from './style'
import {HTMLAttributes, ReactNode} from "react";

interface Props extends HTMLAttributes<HTMLDivElement> {
    children: ReactNode
    withIndex?: boolean
    index?: number
    selecionarvalor?: boolean
}
export function TableRow({children, onDoubleClick, withIndex = true, index, selecionarvalor = false} : Props) {

    const linhaZebrada = index && index % 2

    return (
        <S.Row selecionarvalor={selecionarvalor.toString()} onDoubleClick={onDoubleClick}
               className={`${linhaZebrada === 0 ? '' : 'bg-base-200/30'}`}>
            {children}
        </S.Row>
    )
}
