'use client'

import {set} from "lodash";
import {EntidadePadrao} from "@/class/EntidadePadrao";
import {GrupoCampoFormulario} from "@/types/Formulario";
import {useForm} from "react-hook-form";
import LabelContainer from "@/components/datainput/label/LabelContainer";
import {Input} from "@/components/datainput/input/Input";
import {LineContent} from "@/components/layout/linecontent/LineContent";

interface Props<T extends EntidadePadrao> {
    entidade: T
    setEntidade: (update: (prevEntidade: T) => T) => void;
    editavel?: boolean
    camposFormulario: GrupoCampoFormulario<T>[]
}

export function FormularioCadastro({
                                       entidade,
                                       setEntidade,
                                       editavel = false,
                                       camposFormulario
                                   }: Props<any>) {
    
    const {register, handleSubmit} = useForm()
    
    function handleChange(field: string | undefined, valor: string) {
        if (field) {
            setEntidade((prevEntidade) => {
                const novaEntidade = {...prevEntidade};
                set(novaEntidade, field, valor);
                return novaEntidade;
            })
        }
    }
    
    return (
        <form>
            {camposFormulario.map((grupo, indexGrupo) => (
                <LineContent key={indexGrupo}>
                    {grupo.group.map((campo) => (
                        <>
                            {campo.input && (
                                <LabelContainer title={campo.input.label}>
                                    <Input {...register(campo.input.name ? campo.input.name : '')}
                                           disabled={!editavel}
                                           onChange={(e) => handleChange(campo.input?.field, e.target.value)}/>
                                </LabelContainer>
                            )}
                        </>
                    ))}
                </LineContent>
            ))}
        </form>
    )
}
