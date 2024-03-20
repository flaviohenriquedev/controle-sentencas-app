'use clien'

import {Input} from "@/components/datainput/input/Input";
import {InputHTMLAttributes, useEffect, useState} from "react";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
    valor?: string | number | undefined | Date
}

export function InputData({valor, onChange, placeholder}: Props) {
    const [valorInput, setValorInput] = useState<string | number | undefined>()

    useEffect(() => {
        setValorInput(String(valor))
    }, [valor]);

    return (
        <Input value={valorInput}
               type={`date`}
               onChange={onChange}
               placeholder={placeholder}/>
    )
}
