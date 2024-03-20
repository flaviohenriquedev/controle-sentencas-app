import * as React from 'react';
import {useCallback, useEffect, useState} from 'react';
import * as S from './style';
import {EntidadePadrao} from '@/class/EntidadePadrao';
import LabelContainer from '@/components/datainput/label/LabelContainer';
import {SelectItem} from "@/interface/common-interface";
import {get, set} from "lodash";

interface Props<T extends EntidadePadrao> {
    labelDesabilitada?: string;
    lista: SelectItem[];
    entidade: T;
    field: string;
    disabled?: boolean;
    title?: string;
}

export function Select({
                           labelDesabilitada = 'Selecione...',
                           lista,
                           entidade,
                           field,
                           disabled,
                           title
                       }: Props<any>) {
    
    const [valorSelect, setValorSelect] = useState<SelectItem>();
    
    useEffect(() => {
        
        const valorEntidade = get(entidade, field)
        
        const index = lista.findIndex((item) => item.value === valorEntidade)
        
        if (valorEntidade) {
            setValorSelect(lista[index])
        } else {
            setValorSelect(undefined)
        }
        
    }, [entidade, field, lista]);
    
    function handleSelect(event: React.ChangeEvent<HTMLSelectElement>) {
        setValorSelect(lista[lista.findIndex(item => item.value.toString() === event.target.value)]);
        
        set(entidade, field, typeof get(entidade, field) === 'number'
            ? parseInt(event.target.value)
            : event.target.value);
    }
    
    const renderOpcoes = useCallback(() => {
        return lista.map((item, index) => {
            return (
                <option key={index} value={item.value}>
                    {item.label}
                </option>
            );
        });
    }, [lista]);
    
    return (
        <LabelContainer title={title}>
            <S.Select
                disabled={disabled}
                value={valorSelect ? valorSelect.value : ""}
                onChange={(e) => handleSelect(e)}
            >
                <option value="" disabled>
                    {labelDesabilitada}
                </option>
                {renderOpcoes()}
            </S.Select>
        </LabelContainer>
    );
}
