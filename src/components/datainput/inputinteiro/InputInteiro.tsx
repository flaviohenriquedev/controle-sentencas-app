import {InputStyle} from "@/components/datainput/input/style";
import {InputHTMLAttributes, useEffect, useState} from "react";
import {EntidadePadrao} from "@/class/EntidadePadrao";
import {get, set} from "lodash";

interface Props<T extends EntidadePadrao> extends InputHTMLAttributes<HTMLInputElement> {
    entidade?: T
    field?: string
}

export function InputInteiro({
                                 entidade,
                                 field,
                                 placeholder,
                                 type,
                                 name,
                                 className,
                                 disabled,
                                 onBlur,
                                 onKeyDown
                             }: Props<any>) {
    
    
    const [fieldValue, setFieldValue] = useState<string>('');
    
    useEffect(() => {
        if (field) setFieldValue(get(entidade, field))
    }, [field, entidade]);
    
    function handleChange(value: string) {
        setFieldValue(value);
        if (field) set(entidade, field, value)
    }
    
    return (
        <InputStyle
            placeholder={placeholder}
            type={type}
            name={name}
            className={className}
            disabled={disabled}
            value={fieldValue}
            onChange={(e) => handleChange(e.target.value)}
            onBlur={onBlur}
            onKeyDown={onKeyDown}
        />
    )
}
