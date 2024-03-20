'use client'

import {LineContent} from "@/components/layout/linecontent/LineContent";
import {Modal} from "@/components/datadisplay/modal";
import {Input} from "@/components/datainput/input/Input";
import {Table} from "@/components/datadisplay/table";
import {TextArea} from "@/components/datainput/textarea/TextArea";
import {useCallback, useEffect, useState} from "react";
import {Processo} from "@/class/Processo";
import {excluirDespacho, getAndamentos, getDespachos, salvarDespacho} from "@/services";
import {toast} from "react-hot-toast";
import {Despacho} from "@/class/Despacho";
import {closeModal, openModal} from "@/functions/functions";
import {Button} from "@/components/action/button/Button";
import {Andamento} from "@/class/Andamento";
import {Select} from "@/components/datainput/select/Select";
import {SelectItem} from "@/interface/common-interface";

interface Props {
    processo: Processo
}


export function ProcessoSecundarioDespachos({processo}: Props) {
    const [despachos, setDespachos] = useState<Despacho[]>([])
    const [despacho, setDespacho] = useState<Despacho>(new Despacho())
    const [listaAndamentos, setListaAndamentos] = useState<SelectItem[]>([])
    
    const fetchAndamentos = useCallback(async () => {
        const response: Andamento[] = await getAndamentos('')
            .then(res => {
                return res.data.registros
            }).catch((error) => {
                toast.error(error.message);
            })
        
        if (response) {
            response.map(item => {
                listaAndamentos.push({
                    label: `${item.descricao}`,
                    value: item.id
                })
            })
        }
        
    }, [listaAndamentos])
    
    useEffect(() => {
        fetchAndamentos()
    }, [fetchAndamentos]);
    
    const fetchCadastros = useCallback(async () => {
        if (processo.id && processo.id > 0) {
            const response = await getDespachos(processo.id)
                .then(res => {
                    return res.data.registros
                }).catch((error) => {
                    toast.error(error.message);
                })
            
            if (response) {
                setDespachos(response);
            }
        }
    }, [processo.id])
    
    useEffect(() => {
        fetchCadastros()
    }, [processo.id, fetchCadastros]);
    
    async function handleExcluirDespacho(id: number) {
        try {
            await excluirDespacho(id)
                .then(res => {
                    return toast.success(res.data.mensagem)
                }).catch(error => {
                    toast.error(error.data.message);
                });
            setDespachos(despachos.filter((despacho) => despacho.id !== id));
        } catch (error) {
            console.error('Erro ao excluir despacho:', error);
        }
    }
    
    function handleSelecionarDespacho(despacho: Despacho) {
        setDespacho(despacho)
        openModal(`cadastro_despacho_processo_secundario`)
    }
    
    function handleNovoCadastro() {
        setDespacho(new Despacho())
        setDespacho({...despacho!, processoId: processo.id})
        openModal(`cadastro_despacho_processo_secundario`)
    }
    
    function clearModal() {
        setDespacho(new Despacho())
    }
    
    async function handleSalvarDespacho() {
        despacho && await salvarDespacho(despacho)
            .then(res => {
                toast.success(res.data.mensagem)
            }).catch(error => {
                toast.error(error.message);
            });
        await fetchCadastros();
        setDespacho(new Despacho())
        closeModal('cadastro_despacho_processo_secundario')
    }
    
    return (
        <>
            <Table.Container>
                <Table.Header>
                    <Table.Row>
                        <Table.Title title={`Nº`}/>
                        <Table.Title title={`Data`}/>
                        <Table.Title title={`Data Validade`}/>
                        <Table.Title title={`Andamento`}/>
                        <Table.Title title={`Ações`}/>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {despachos && despachos.map((despacho, index) => (
                        <Table.Row key={despacho.id}
                                   index={index}>
                            <Table.Value value={index + 1}/>
                            <Table.Value value={despacho.dataDespacho.split("-").reverse().join("/")}/>
                            <Table.Value value={despacho.dataValidade?.split("-").reverse().join("/")}/>
                            <Table.Value value={despacho.andamento.descricao}/>
                            <Table.Actions metodoExcluir={() => handleExcluirDespacho(despacho.id)}
                                           metodoEditar={() => handleSelecionarDespacho(despacho)}
                                           objeto={despacho}/>
                        </Table.Row>
                    ))}
                </Table.Body>
            </Table.Container>
            
            <Modal.Footer>
                <Button identifier={`Novo Despacho`}
                        onClick={handleNovoCadastro}/>
            </Modal.Footer>
            <Modal.Container id={`cadastro_despacho_processo_secundario`}
                             title={`Cadastro de Despacho`}
                             clearModal={clearModal}
                             scalamodal={`scala70`}>
                <Modal.Content>
                    <LineContent>
                        
                        <Input title={`Data do Despacho`}
                               type={`date`}
                               entidade={despacho}
                               field={`dataDespacho`}
                        />
                        
                        <Input title={`Data de Vencimento`}
                               type={`date`}
                               entidade={despacho}
                               field={`dataValidade`}
                        />
                        
                        <Select title={`Andamentos`}
                                entidade={despacho}
                                field={`andamentoId`}
                                lista={listaAndamentos}/>
                    </LineContent>
                    <LineContent>
                        <TextArea entidade={despacho}
                                  field={`observacao`}/>
                    </LineContent>
                </Modal.Content>
                <Modal.Footer>
                    <Button identifier={`Salvar`} onClick={handleSalvarDespacho}/>
                </Modal.Footer>
            </Modal.Container>
        </>
    )
}
