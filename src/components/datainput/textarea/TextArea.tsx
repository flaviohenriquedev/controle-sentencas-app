'use client'

import * as S from './style'
import {ChangeEvent, TextareaHTMLAttributes, useEffect, useState} from "react";
import {EntidadePadrao} from "@/class/EntidadePadrao";
import {get, set} from "lodash";
import LabelContainer from "@/components/datainput/label/LabelContainer";

interface Props<T extends EntidadePadrao> extends TextareaHTMLAttributes<HTMLTextAreaElement> {
    field: string
    entidade: T
    title?: string
}

export function TextArea({field, entidade, disabled, title}: Props<any>) {
    const [valorTextArea, setValorTextArea] = useState<string>('')
    
    useEffect(() => {
        setValorTextArea(get(entidade, field))
    }, [entidade, field]);
    
    function handleTextChange(event: ChangeEvent<HTMLTextAreaElement>) {
        set(entidade, field, event.target.value);
        setValorTextArea(event.target.value)
    }
    
    return (
        <LabelContainer title={title}>
            <S.TextAreaStyleContainer
                value={valorTextArea}
                onChange={(e) => handleTextChange(e)}
                disabled={disabled}
            />
        </LabelContainer>
    );
}
