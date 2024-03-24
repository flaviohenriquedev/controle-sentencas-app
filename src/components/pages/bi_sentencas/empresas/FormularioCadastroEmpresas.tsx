import {LineContent} from "@/components/layout/linecontent/LineContent";
import LabelContainer from "@/components/datainput/label/LabelContainer";
import {Input} from "@/components/datainput/input/Input";
import {EntidadePadrao} from "@/class/EntidadePadrao";

interface Props<T extends EntidadePadrao> {
    entidade: T
    editavel?: boolean
}

export function FormularioCadastroEmpresas({entidade, editavel = false}: Props<any>) {
    return (
        <form>
            <LineContent>
                <LabelContainer title={`Nome`}>
                    <Input className={`w-80`}
                           disabled={!editavel}
                           entidade={entidade}
                           field={'nome'}/>
                </LabelContainer>
            </LineContent>
        </form>
    )
}
