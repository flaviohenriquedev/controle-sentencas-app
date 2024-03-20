import {LineContent} from "@/components/layout/linecontent/LineContent";
import {Input} from "@/components/datainput/input/Input";
import {TextArea} from "@/components/datainput/textarea/TextArea";
import {Processo} from "@/class/Processo";
import {TipoProcessoSecundarioFactory} from "@/enum/TipoProcessoSecundarioEnum";
import {useCallback, useEffect, useState} from "react";
import {SelectItem} from "@/interface/common-interface";
import {InputAutoComplete} from "@/components/datainput/inputautocomplete/InputAutoComplete";
import {getComarcasAutoComplete} from "@/services";
import {Select} from "@/components/datainput/select/Select";
import {Banco} from "@/class/Banco";
import {getBancos} from "@/services/sdk/bancos";
import {toast} from "react-hot-toast";

interface Props {
    processo: Processo
    editavel?: boolean
}

export function ProcessoSecundarioDadosBasicos({processo, editavel}: Props) {
    const [listaTipoProcessoSecundario, setListaTipoProcessoSecundario] = useState<SelectItem[]>([])
    const [listaBancos, setListaBancos] = useState<SelectItem[]>([])
    
    const fetchBancos = useCallback(async () => {
        const response: Banco[] = await getBancos('')
            .then(res => {
                return res.data.registros
            }).catch((error) => {
                toast.error(error.message);
            })
        
        if (response) {
            response.map(item => {
                listaBancos.push({
                    label: `${item.nome}`,
                    value: item.nome
                })
            })
        }
        
    }, [listaBancos])
    
    useEffect(() => {
        fetchBancos()
    }, [fetchBancos]);
    
    useEffect(() => {
        setListaTipoProcessoSecundario(TipoProcessoSecundarioFactory.getSelectItens())
    }, []);
    
    return (
        <form>
            <LineContent>
                <Input title={`Número do Processo Pai`}
                       entidade={processo}
                       field={`numeroProcessoPrincipal`}
                       disabled
                />
                
                <Input title={`Número do Processo Filho`}
                       entidade={processo}
                       disabled={!editavel}
                       field={`numeroProcessoFilho`}
                />
                
                <Select title={`Tipo do Processo Filho`}
                        field={`tipoProcessoFilho`}
                        disabled={!editavel}
                        lista={listaTipoProcessoSecundario}
                        entidade={processo}/>
            </LineContent>
            
            <LineContent>
                <InputAutoComplete title={`Comarca Processo Filho`}
                                   funcaoBuscarCadastros={getComarcasAutoComplete}
                                   entidade={processo}
                                   disabled={!editavel}
                                   field={`comarcaProcessoFilho.descricao`}
                                   target={`comarcaProcessoFilhoId`}/>
                
                <Input title={`Data Pagamento Processo Filho`}
                       type={`date`}
                       entidade={processo}
                       disabled={!editavel}
                       field={`dataPagamentoProcessoFilho`}
                />
                
                <Input title={`Valor do Processo Filho`}
                       type={`number`}
                       entidade={processo}
                       disabled={!editavel}
                       field={`valorProcessoFilho`}
                />
                
                <Input title={`Valor Honorários Processo Filho`}
                       type={`number`}
                       entidade={processo}
                       disabled={!editavel}
                       field={`valorHonorariosProcessoFilho`}
                />
                
                <Select title={`Banco`}
                        lista={listaBancos}
                        field={`banco`}
                        disabled={!editavel}
                        entidade={processo}/>
            
            </LineContent>
            <LineContent>
                <TextArea field={`observacoesProcessoFilho`}
                          entidade={processo}
                          disabled={!editavel}/>
            </LineContent>
        </form>
    )
}
