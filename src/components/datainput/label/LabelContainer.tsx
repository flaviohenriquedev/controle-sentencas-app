import * as S from './style'
import React, {HTMLAttributes} from "react";
import {FaAsterisk} from "react-icons/fa";


interface Props extends HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode
    title?: string
    width?: string
    required?: boolean
    classLabel?: string
}

const LabelContainer = ({children, title, width, className, required, classLabel}: Props) => {
    return (
        <S.Container width={width}>
            <S.Label className={classLabel}>
                {required && <FaAsterisk size={8} color="red"/>}
                <S.LabelSpan className={className}>{title}</S.LabelSpan>
            </S.Label>
            {children}
        </S.Container>
    );
}

export default LabelContainer;
