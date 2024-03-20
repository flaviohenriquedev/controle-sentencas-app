import {HTMLAttributes, InputHTMLAttributes, SelectHTMLAttributes} from "react";
import {EntidadePadrao} from "@/class/EntidadePadrao";

export interface InputInterface extends InputHTMLAttributes<HTMLInputElement> {
    label?: string
    field: string
}

export interface AutocompleteInterface extends InputInterface {
}

export interface SelectInterface<T extends EntidadePadrao> extends SelectHTMLAttributes<HTMLSelectElement> {
    label: string
    lista: T[]
    field: string
    fieldKey: string
    fieldValor: string
    fieldLabel: string
    target: string
    valorNumerico?: boolean
}
