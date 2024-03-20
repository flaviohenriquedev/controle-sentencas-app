import * as S from './style'
import {HTMLAttributes} from "react";

interface CheckboxProps extends HTMLAttributes<HTMLInputElement> {
    title?: string
    value?: boolean
    setValue?: (value: boolean) => void;
}

export function Checkbox({title, value = false, className, setValue} : CheckboxProps) {
    return (
        <S.Container>
            <S.Checkbox type="checkbox" checked={value} onChange={() => setValue && setValue(!value)}/>
            {title && (
                <S.Title className={className}>{title}</S.Title>
            )}
        </S.Container>
    )
}
