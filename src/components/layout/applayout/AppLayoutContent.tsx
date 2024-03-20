import {CommonInterface} from "@/interface/common-interface";
import * as S from './style'

interface Props extends CommonInterface {
}

export function AppLayoutContent({children}: Props) {
    return (
        <S.Content>
            {children}
        </S.Content>
    )
}
