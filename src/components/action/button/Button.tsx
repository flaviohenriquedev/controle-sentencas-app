import * as S from './style'
import {HTMLAttributes} from "react";
import {ButtonClass} from "@/types/BbuttonType";

interface Props extends HTMLAttributes<HTMLButtonElement>{
    identifier?: string | JSX.Element
    classbutton?: ButtonClass
    type?: "button" | "submit" | "reset" | undefined
}

export function Button({identifier, classbutton = 'info', onClick, className, type} : Props) {
    return (
        <S.ButtonStyle
            type={type}
            classbutton={classbutton}
            onClick={onClick}
            className={className}>
            {identifier}
        </S.ButtonStyle>
    )
}
