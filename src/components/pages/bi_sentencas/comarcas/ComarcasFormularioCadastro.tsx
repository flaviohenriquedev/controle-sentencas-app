import {LineContent} from "@/components/layout/linecontent/LineContent";
import LabelContainer from "@/components/datainput/label/LabelContainer";
import {Input} from "@/components/datainput/input/Input";
import {EntidadePadrao} from "@/class/EntidadePadrao";

interface Props<T extends EntidadePadrao> {
    entidade: T
    editavel?: boolean
}

export function ComarcasFormularioCadastro({entidade, editavel = false}: Props<any>) {
    return (
        <form>
            <LineContent>
                <LabelContainer title={`Descrição`}>
                    <Input disabled={!editavel}
                           entidade={entidade}
                           field="descricao"/>
                </LabelContainer>
                
                <LabelContainer title={`Tipo`}>
                    <Input disabled={!editavel}
                           entidade={entidade}
                           field={'tipo'}/>
                </LabelContainer>
                
                <LabelContainer title={`Estado`}>
                    <Input disabled={!editavel}
                           entidade={entidade}
                           field={'estado'}/>
                </LabelContainer>
                
                <LabelContainer title={`Município`}>
                    <Input disabled={!editavel}
                           entidade={entidade}
                           field={'municipio'}/>
                </LabelContainer>
            </LineContent>
        </form>
    )
}
