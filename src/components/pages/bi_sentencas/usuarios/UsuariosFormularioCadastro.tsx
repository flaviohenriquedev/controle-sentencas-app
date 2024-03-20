import {LineContent} from "@/components/layout/linecontent/LineContent";
import {Input} from "@/components/datainput/input/Input";
import {EntidadePadrao} from "@/class/EntidadePadrao";

interface Props<T extends EntidadePadrao> {
    entidade: T
    editavel?: boolean
}

export function UsuariosFormularioCadastro({entidade, editavel = false}: Props<any>) {
    return (
        <form>
            <LineContent>
                <Input title={`Nome`}
                       className={`w-[20rem]`}
                       disabled={!editavel}
                       entidade={entidade}
                       field="nome"/>
                
                <Input title={`Email`}
                       className={`w-[20rem]`}
                       type={`email`}
                       disabled={!editavel}
                       entidade={entidade}
                       field={'email'}/>
            </LineContent>
        </form>
    )
}
