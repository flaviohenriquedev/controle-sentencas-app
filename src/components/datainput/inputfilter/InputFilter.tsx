import {InputStyle} from "@/components/datainput/input/style";
import {InputHTMLAttributes} from "react";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
}

export function InputFilter({value, onChange, placeholder, className}: Props) {
    return (
        <InputStyle value={value} onChange={onChange} placeholder={placeholder} className={className}/>
    )
}
