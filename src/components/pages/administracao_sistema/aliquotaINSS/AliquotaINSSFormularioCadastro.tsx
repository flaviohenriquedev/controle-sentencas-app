import {LineContent} from "@/components/layout/linecontent/LineContent";
import {Input} from "@/components/datainput/input/Input";
import {EntidadePadrao} from "@/class/EntidadePadrao";

interface Props<T extends typeof EntidadePadrao> {
    entidade: T
    editavel?: boolean
}

export function AliquotaINSSFormularioCadastro({entidade, editavel = false}: Props<any>) {
    return (
        <form>
            <LineContent>
                <LineContent>
                    
                    <Input disabled={!editavel}
                           entidade={entidade}
                           type={`number`}
                           field={`ano`}
                           title={`Ano`}
                           required={true}/>
                    
                    <Input disabled={!editavel}
                           entidade={entidade}
                           type={`number`}
                           field={`mes`}
                           title={`Mês`}
                           required={true}/>
                    
                    <Input disabled={!editavel}
                           entidade={entidade}
                           type={`number`}
                           field={`aliquota`}
                           title={`Aliquota`}
                           required={true}/>
                
                </LineContent>
                
                <LineContent>
                    
                    <Input disabled={!editavel}
                           entidade={entidade}
                           type={`number`}
                           field={`teto`}
                           title={`Teto`}
                           required={true}/>
                    
                    <Input disabled={!editavel}
                           entidade={entidade}
                           type={`number`}
                           field={`tetoCooperativa`}
                           title={`Teto Cooperativa`}
                           required={true}/>
                    
                    <Input disabled={!editavel}
                           entidade={entidade}
                           type={`number`}
                           field={`faixa`}
                           title={`Faixa`}
                           required={true}/>
                
                </LineContent>
            </LineContent>
        </form>
    )
}
