import * as S from './style'
import React, {ReactNode} from "react";

interface ModalFooterProps {
    children: ReactNode
}

export function ModalFooter({children}: ModalFooterProps) {
    return (
        <>
            <div className="divider text-base-100"></div>
            <S.Footer>
                {children}
            </S.Footer>
        </>
    )
}
