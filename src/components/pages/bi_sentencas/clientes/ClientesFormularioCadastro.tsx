import {LineContent} from "@/components/layout/linecontent/LineContent";
import {Input} from "@/components/datainput/input/Input";
import {EntidadePadrao} from "@/class/EntidadePadrao";

interface Props<T extends EntidadePadrao> {
    entidade: T
    editavel?: boolean
}

export function ClientesFormularioCadastro({entidade, editavel = false}: Props<any>) {
    return (
        <form>
            <LineContent>
                
                <Input title={`CPF`}
                       disabled={!editavel}
                       entidade={entidade}
                       field="cpf"/>
                
                <Input className={`w-80`}
                       title={`Nome`}
                       disabled={!editavel}
                       entidade={entidade}
                       field={'nome'}/>
                
            </LineContent>
        </form>
    )
}
