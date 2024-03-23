import {Button} from "@/components/action/button/Button";
import {Processo} from "@/class/Processo";
import {AxiosResponse} from "axios";
import React, {useCallback, useEffect, useState} from "react";
import {toast} from "react-hot-toast";
import {EntidadePadrao} from "@/class/EntidadePadrao";
import TabelaComponente from "@/components/datadisplay/tabelacomponente/TabelaComponente";
import {
    colunasTabelaProcessoSecundario
} from "@/components/pages/bi_sentencas/processos/processoSecundario/colunasTabelaProcessoSecundario";
import {closeModal, openModal} from "@/functions/functions";
import {Modal} from "@/components/datadisplay/modal";
import {LineContent} from "@/components/layout/linecontent/LineContent";
import {TabsComponente} from "@/components/datadisplay/tabs/TabsComponente";
import {
    TabsProcessoSecundario
} from "@/components/pages/bi_sentencas/processos/processoSecundario/TabsProcessoSecundario";
import {
    excluirProcessoSecundario,
    getProcessoSecundario,
    salvarProcessoSecundario
} from "@/services/sdk/processoSecundario";

const classeEntidade = Processo;
const funcaoFechCadastros: (processo: Processo, filtro: string, take: string, skip: string) => Promise<AxiosResponse<any, any>> = getProcessoSecundario
const funcaoSalvarCadastro: (entidade: any) => Promise<AxiosResponse<any, any>> = salvarProcessoSecundario
const funcaoExcluirCadastro: (id: number) => Promise<AxiosResponse<any, any>> = excluirProcessoSecundario

interface Props {
    processo: Processo
}

export function ProcessoSecundarioComponente({processo}: Props) {
    const [entidade, setEntidade] = useState<InstanceType<typeof classeEntidade>>(new (classeEntidade as any)());
    const [listaEntidade, setListaEntidade] = useState<Array<InstanceType<typeof classeEntidade>>>([]);
    const [filtroEntidade, setFiltroEntidade] = useState<string>(processo.numeroProcessoPrincipal)
    const [editavel, setEditavel] = useState<boolean>(false)
    const [acaoExecutada, setAcaoExecutada] = useState<string>('')
    
    const [take, setTake] = useState<number>(15)
    const [skip, setSkip] = useState<number>(0)
    const [totalRegistros, setTotalRegistros] = useState<number>()
    
    useEffect(() => {
        setTake(15)
        setSkip(0)
    }, []);
    
    const fetchCadastros = useCallback(async () => {
        const response = await funcaoFechCadastros(processo, filtroEntidade, String(take), String(skip))
            .then(res => {
                return res.data
            }).catch((error) => {
                toast.error(error.message);
            })
        if (response) {
            setListaEntidade(response.registros)
            setTotalRegistros(response.quantRegistros);
        }
    }, [filtroEntidade, processo, skip, take])
    
    useEffect(() => {
        fetchCadastros()
    }, [filtroEntidade, skip, take, fetchCadastros]);
    
    async function handleSalvarEntidade() {
        await funcaoSalvarCadastro(entidade)
            .then(res => {
                toast.success(res.data.mensagem)
                closeModal(`cadastro_processo_secundario`)
            }).catch(error => {
                toast.error(error.message);
            });
        await fetchCadastros();
        setEntidade(new (classeEntidade as any)());
        setFiltroEntidade('');
    }
    
    async function handleExcluirEntidade(id: number) {
        await funcaoExcluirCadastro(id)
            .then(res => {
                return toast.success(res.data.mensagem)
            }).catch(error => {
                toast.error(error.data);
            });
        setListaEntidade(prevListaEntidade =>
            prevListaEntidade.filter(entidadeFiltrada => entidadeFiltrada.id !== id));
    }
    
    function handleSelecionarEntidade<T extends EntidadePadrao>(entidade: InstanceType<typeof classeEntidade>) {
        setAcaoExecutada('selecionar')
        setEditavel(false)
        setEntidade(entidade)
        openModal(`cadastro_processo_secundario`)
    }
    
    function handleEditarEntidade(entidade: InstanceType<typeof classeEntidade>) {
        setAcaoExecutada('editar')
        setEditavel(true)
        setEntidade(entidade)
        openModal(`cadastro_processo_secundario`)
    }
    
    function clearModal() {
        setEntidade(new (classeEntidade as any)())
    }
    
    function handleNovoCadastro() {
        setEntidade(new (classeEntidade as any)())
        
        setEntidade(prevState => ({
            ...prevState,
            numeroProcessoPrincipal: processo.numeroProcessoPrincipal,
            processoPrincipalId: processo.id
        }))
        
        setEditavel(true)
        openModal(`cadastro_processo_secundario`)
    }
    
    return (
        <>
            <TabelaComponente colunas={colunasTabelaProcessoSecundario()}
                              listaEntidade={listaEntidade}
                              skip={skip}
                              setSkip={setSkip}
                              take={take}
                              totalRegistros={totalRegistros}
                              acoes={{
                                  excluir: handleExcluirEntidade,
                                  editar: handleEditarEntidade,
                                  selecionar: handleSelecionarEntidade
                              }}/>
            <LineContent alignment={"right"}>
                <Button identifier={`Novo Processo Secundário`}
                        onClick={handleNovoCadastro}/>
            </LineContent>
            
            <Modal.Container id={`cadastro_processo_secundario`}
                             title={`Novo Processo Secundário`}
                             clearModal={clearModal}
                             scalamodal={`scala80`}>
                <Modal.Content>
                    <TabsComponente tabs={TabsProcessoSecundario(
                        entidade, editavel
                    )}/>
                </Modal.Content>
                <Modal.Footer>
                    <Button identifier={`Salvar`}
                            onClick={() => handleSalvarEntidade()}/>
                </Modal.Footer>
            </Modal.Container>
        </>
    )
}
