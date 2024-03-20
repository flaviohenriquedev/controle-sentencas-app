import {LineContent} from "@/components/layout/linecontent/LineContent";
import LabelContainer from "@/components/datainput/label/LabelContainer";
import {Input} from "@/components/datainput/input/Input";
import {InputAutoComplete} from "@/components/datainput/inputautocomplete/InputAutoComplete";
import {
    getAdvogadosAutoComplete,
    getClientesAutoComplete,
    getComarcasAutoComplete,
    getEmpresasAutoComplete,
    getNaturezasAutoComplete
} from "@/services";
import {Processo} from "@/class/Processo";
import {TextArea} from "@/components/datainput/textarea/TextArea";
import {useCallback, useEffect, useState} from "react";
import {SelectItem} from "@/interface/common-interface";
import {TipoProcessoFactory} from "@/enum/TipoProcessoEnum";
import {Select} from "@/components/datainput/select/Select";
import {toast} from "react-hot-toast";
import {Banco} from "@/class/Banco";
import {getBancos} from "@/services/sdk/bancos";

interface Props {
    processo: Processo
    editavel?: boolean
}

export function DadosBasicos({processo, editavel = false}: Props) {
    const [listaTipoProcesso, setListaTipoProcesso] = useState<SelectItem[]>([])
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
        setListaTipoProcesso(TipoProcessoFactory.getSelectItens())
    }, []);
    
    
    return (
        <form>
            <LineContent>
                <Input title={`Número do Processo`}
                       disabled={!editavel}
                       entidade={processo}
                       field={`numeroProcessoPrincipal`}/>
                
                <Select title={`Tipo do Processo`}
                        entidade={processo}
                        field={`tipoProcessoPrincipal`}
                        disabled={!editavel}
                        lista={listaTipoProcesso}/>
                
                <InputAutoComplete title={`Cliente`}
                                   disabled={!editavel}
                                   funcaoBuscarCadastros={getClientesAutoComplete}
                                   entidade={processo}
                                   field={`cliente.nome`}
                                   target={'clienteId'}
                />
            </LineContent>
            
            <LineContent>
                
                <InputAutoComplete title={`Natureza`}
                                   disabled={!editavel}
                                   funcaoBuscarCadastros={getNaturezasAutoComplete}
                                   entidade={processo}
                                   field={`natureza.descricao`}
                                   target={`naturezaId`}/>
                
                <InputAutoComplete title={`Comarca`}
                                   disabled={!editavel}
                                   funcaoBuscarCadastros={getComarcasAutoComplete}
                                   entidade={processo}
                                   field={`comarcaProcessoPrincipal.descricao`}
                                   target={`comarcaProcessoPrincipalId`}/>
                
                <InputAutoComplete title={`Empresa`}
                                   disabled={!editavel}
                                   funcaoBuscarCadastros={getEmpresasAutoComplete}
                                   entidade={processo}
                                   field={`empresa.descricao`}
                                   target={`empresaId`}/>
                
                <InputAutoComplete title={`Advogado (a)`}
                                   disabled={!editavel}
                                   funcaoBuscarCadastros={getAdvogadosAutoComplete}
                                   entidade={processo}
                                   field={`advogado.descricao`}
                                   target={`advogadoId`}/>
            
            </LineContent>
            
            <LineContent>
                <Input title={`Data da Intimação`}
                       disabled={!editavel}
                       type={`date`}
                       entidade={processo}
                       field={`dataIntimacao`}
                />
                
                <Input title={`Data da Sentença`}
                       disabled={!editavel}
                       type={`date`}
                       entidade={processo}
                       field={`dataSentenca`}
                />
                
                <Input title={`Data de Pagamento`}
                       disabled={!editavel}
                       type={`date`}
                       entidade={processo}
                       field={`dataPagamentoProcessoPrincipal`}
                />
                
                <Input title={`Data Início do Benefício (DIB)`}
                       disabled={!editavel}
                       type={`date`}
                       entidade={processo}
                       field={`dataInicioBeneficio`}
                />
                
                <Input title={`Data Início Pagamento do Benefício (DIP)`}
                       disabled={!editavel}
                       type={`date`}
                       entidade={processo}
                       field={`dataInicioPagamentoBeneficio`}
                />
            </LineContent>
            
            <LineContent>
                
                <Input title={`Renda Mensal Inicial (RMI)`}
                       disabled={!editavel}
                       type={`number`}
                       entidade={processo}
                       field={`valorRendaMensalInicial`}/>
                
                <Select title={`Banco`}
                        disabled={!editavel}
                        lista={listaBancos}
                        field={`banco`}
                        entidade={processo}/>
            
            </LineContent>
            
            <LineContent>
                <LabelContainer title={`Observações`}>
                    <TextArea field={`observacoesProcessoPrincipal`}
                              entidade={processo}
                              disabled={!editavel}/>
                </LabelContainer>
            </LineContent>
        </form>
    )
}
