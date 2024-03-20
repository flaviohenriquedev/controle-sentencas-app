'use client'

import * as S from "./style";
import React, {InputHTMLAttributes, useEffect, useState} from "react";
import {EntidadePadrao} from "@/class/EntidadePadrao";
import {get, set} from "lodash";
import LabelContainer from "@/components/datainput/label/LabelContainer";

interface Props<T extends EntidadePadrao> extends InputHTMLAttributes<HTMLInputElement> {
    field?: string
    entidade?: T
    title?: string
}

export const Input = ({
                          placeholder,
                          type,
                          name,
                          className,
                          disabled,
                          entidade,
                          field,
                          onBlur,
                          onKeyDown,
                          required = false,
                          title,
                          value,
                          onChange
                      }: Props<any>) => {
    
    const [fieldValue, setFieldValue] = useState<string | number | readonly string[] | undefined>('');
    
    useEffect(() => {
        if (field) {
            if (get(entidade, field) === 0 || get(entidade, field) === '') {
                setFieldValue('');
            } else {
                setFieldValue(get(entidade, field));
            }
        }
    }, [field, entidade]);
    
    function handleChange(value: string) {
        let valConvert;
        
        if (type === 'number') {
            valConvert = Number(value);
        } else {
            valConvert = value;
        }
        
        setFieldValue(value);
        if (field) set(entidade, field, valConvert);
    }
    
    return (
        <LabelContainer required={required}
                        title={title}>
            <S.InputStyle
                placeholder={placeholder}
                type={type}
                name={name}
                disabled={disabled}
                className={className}
                value={value ? value : fieldValue}
                onChange={onChange ? onChange : (e) => handleChange(e.target.value)}
                onBlur={onBlur}
                onKeyDown={onKeyDown}
                required={required}
            />
        </LabelContainer>
    
    );
};

