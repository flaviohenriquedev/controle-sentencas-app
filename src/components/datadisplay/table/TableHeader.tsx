import * as S from './style'
import {CommonInterface} from "@/interface/common-interface";

interface Props extends CommonInterface {}

export function TableHeader({children}: Props) {
    return (
        <>
        <S.Header>
            {children}
        </S.Header>
        </>
    )
}
