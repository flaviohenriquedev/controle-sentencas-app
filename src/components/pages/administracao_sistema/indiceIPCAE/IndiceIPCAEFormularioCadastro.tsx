import {LineContent} from "@/components/layout/linecontent/LineContent";
import LabelContainer from "@/components/datainput/label/LabelContainer";
import {Input} from "@/components/datainput/input/Input";
import {EntidadePadrao} from "@/class/EntidadePadrao";

interface Props<T extends EntidadePadrao> {
    entidade: T
    editavel?: boolean
}

export function IndiceIPCAEFormularioCadastro({entidade, editavel = false}: Props<any>) {
    return (
        <form>
            <LineContent>
                <LineContent>
                    <LabelContainer title={`Ano`}>
                        <Input disabled={!editavel}
                               entidade={entidade}
                               type={`number`}
                               field={`ano`}/>
                    </LabelContainer>
                    
                    <LabelContainer title={`Mês`}>
                        <Input disabled={!editavel}
                               entidade={entidade}
                               type={`number`}
                               field={`mes`}/>
                    </LabelContainer>
                    
                    <LabelContainer title={`Valor`}>
                        <Input disabled={!editavel}
                               entidade={entidade}
                               type={`number`}
                               field={`valor`}/>
                    </LabelContainer>
                </LineContent>
            </LineContent>
        </form>
    )
}
