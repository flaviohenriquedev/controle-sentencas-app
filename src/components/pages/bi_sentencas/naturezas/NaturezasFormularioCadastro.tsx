import {LineContent} from "@/components/layout/linecontent/LineContent";
import LabelContainer from "@/components/datainput/label/LabelContainer";
import {Input} from "@/components/datainput/input/Input";
import {EntidadePadrao} from "@/class/EntidadePadrao";

interface Props<T extends EntidadePadrao> {
    entidade: T
    editavel?: boolean
}

export function NaturezasFormularioCadastro({entidade, editavel = false}: Props<any>) {
    return (
        <form>
            <LineContent>
                <LabelContainer title={`Descrição`}>
                    <Input className={`w-[30rem]`}
                           disabled={!editavel}
                           entidade={entidade}
                           field="descricao"/>
                </LabelContainer>
            
            </LineContent>
        </form>
    )
}
