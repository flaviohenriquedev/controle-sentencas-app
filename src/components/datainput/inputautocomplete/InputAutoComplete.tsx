import React, {InputHTMLAttributes, useEffect, useState} from "react";
import {EntidadePadrao} from "@/class/EntidadePadrao";
import * as S from './style'
import {get, set} from "lodash";
import LabelContainer from "@/components/datainput/label/LabelContainer";

interface Props<T extends EntidadePadrao> extends InputHTMLAttributes<HTMLInputElement> {
    placeholder?: string
    funcaoBuscarCadastros: (filtro: string) => Promise<any>
    entidade: T
    field: string
    target: string
    disabled?: boolean
    title?: string
}

export class Cadastro {
    constructor(
        public codigo: number = 0,
        public descricao: string = ''
    ) {
    }
}

export const InputAutoComplete = ({
                                      placeholder = 'Digite para buscar...',
                                      funcaoBuscarCadastros,
                                      entidade,
                                      field,
                                      target,
                                      disabled = false,
                                      title,
                                      required
                                  }: Props<any>) => {
    
    const [valorInput, setValorInput] = useState<string>('')
    const [cadastros, setCadastros] = useState<Cadastro[]>([])
    const [renderTabela, setRenderTabela] = useState<boolean>(false)
    
    useEffect(() => {
        setValorInput(get(entidade, field))
        setRenderTabela(false)
    }, [entidade, field]);
    
    function handleChange<T extends EntidadePadrao>(valor: string) {
        setValorInput(valor)
        setRenderTabela(true)
        funcaoBuscarCadastros(valor)
            .then(res => {
                setCadastros(res.data.registros)
            })
    }
    
    function handleSelectCadastro(cadastro: Cadastro) {
        set(entidade, target, cadastro.codigo)
        setRenderTabela(false)
        setValorInput(cadastro.descricao)
    }
    
    return (
        <LabelContainer title={title} required={required}>
            <div className={`relative `}>
                <S.Input disabled={disabled}
                         value={valorInput}
                         onChange={(e) => handleChange(e.target.value)}
                         className={`w-full`}
                         placeholder={placeholder}/>
                <S.ListContainer aberto={(valorInput !== null
                    && valorInput !== undefined
                    && valorInput.length > 0
                    && renderTabela).toString()}>
                    {cadastros && cadastros.map(cadastro => (
                        <>
                            <div onClick={() => handleSelectCadastro(cadastro)} key={cadastro.codigo}>
                                <span
                                    className={`flex items-center p-1 rounded-sm hover:cursor-pointer hover:bg-base-200`}>{cadastro.descricao}</span>
                            </div>
                            <hr/>
                        </>
                    ))}
                </S.ListContainer>
            </div>
        </LabelContainer>
    )
};
