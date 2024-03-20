import * as S from './style'
import {ReactNode} from "react";

interface ModalContentProps {
    children: ReactNode
    classname?: string
}
export function ModalContent({children, classname} : ModalContentProps) {
    return (
        <S.Content className={classname}>
            {children}
        </S.Content>
    )
}
