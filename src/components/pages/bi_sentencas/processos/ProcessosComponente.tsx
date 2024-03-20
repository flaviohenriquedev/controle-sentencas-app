'use client'

import {Pagesection} from "@/components/layout/pagesection";
import React, {useCallback, useEffect, useState} from "react";
import {excluirProcesso, getProcessos, salvarProcesso} from "@/services";
import {toast} from "react-hot-toast";
import {EntidadePadrao} from "@/class/EntidadePadrao";
import {AxiosResponse} from "axios";
import {Processo} from "@/class/Processo";
import {TabsComponente} from "@/components/datadisplay/tabs/TabsComponente";
import {TabsProcesso} from "@/components/pages/bi_sentencas/processos/TabsProcesso";
import {colunasTabelaProcessos} from "@/components/pages/bi_sentencas/processos/colunasTabelaProcessos";
import TabelaComponente from "@/components/datadisplay/tabelacomponente/TabelaComponente";

const classeEntidade = Processo;
const tituloPagina: string = 'Processos'
const tituloFormulario: string = 'Cadastro de Processos'
const funcaoFechCadastros: (filtro?: string, take?: string, skip?: string) => Promise<AxiosResponse<any, any>> = getProcessos
const funcaoSalvarCadastro: (entidade: any) => Promise<AxiosResponse<any, any>> = salvarProcesso
const funcaoExcluirCadastro: (id: number) => Promise<AxiosResponse<any, any>> = excluirProcesso

export function ProcessosComponente() {

    const [entidade, setEntidade] = useState<InstanceType<typeof classeEntidade>>(new (classeEntidade as any)());
    const [listaEntidade, setListaEntidade] = useState<Array<InstanceType<typeof classeEntidade>>>([]);
    const [filtroEntidade, setFiltroEntidade] = useState<string>('')
    const [editavel, setEditavel] = useState<boolean>(false)
    const [acaoExecutada, setAcaoExecutada] = useState<string>('')
    
    const [take, setTake] = useState<number>(15)
    const [skip, setSkip] = useState<number>(0)
    const [totalRegistros, setTotalRegistros] = useState<number>(0)
    
    useEffect(() => {
        setTake(15)
        setSkip(0)
    }, []);
    
    const fetchCadastros = useCallback(async () => {
        return await funcaoFechCadastros(filtroEntidade, String(take), String(skip))
            .then(res => {
                return res.data
            }).catch((error) => {
                toast.error(error.response.data.mensagem);
            });
    }, [filtroEntidade, skip, take])
    
    useEffect(() => {
        fetchCadastros().then(response => {
            setListaEntidade(response.registros)
            setTotalRegistros(response.quantRegistros);
        })
    }, [filtroEntidade, skip, take, fetchCadastros]);
    
    async function handleSalvarEntidade() {
        await funcaoSalvarCadastro(entidade)
            .then(res => {
                toast.success(res.data.mensagem)
            }).catch(error => {
                toast.error(error.response.data.mensagem);
            });
        await fetchCadastros();
        setEntidade(new (classeEntidade as any)());
        setFiltroEntidade('');
    }
    
    async function handleExcluirEntidade(id: number) {
        await funcaoExcluirCadastro(id)
            .then(res => {
                setListaEntidade(prevListaEntidade =>
                    prevListaEntidade.filter(entidadeFiltrada => entidadeFiltrada.id !== id));
                return toast.success(res.data.mensagem)
            }).catch(error => {
                toast.error(error.response.data.mensagem);
            });
    }
    
    function novoCadastro() {
        setEditavel(true)
        setEntidade(new (classeEntidade as any)())
    }
    
    function handleSelecionarEntidade<T extends EntidadePadrao>(entidade: InstanceType<typeof classeEntidade>) {
        setAcaoExecutada('selecionar')
        setEditavel(false)
        setEntidade(entidade)
    }
    
    function handleEditarEntidade(entidade: InstanceType<typeof classeEntidade>) {
        setAcaoExecutada('editar')
        setEditavel(true)
        setEntidade(entidade)
    }
    
    function clearModal() {
        setEntidade(new (classeEntidade as any)())
    }
    
    function handleFiltrar(valor: string) {
        setFiltroEntidade(valor)
    }

    return (
        <Pagesection.Container titulo={tituloPagina}
                               tituloComponenteCadastro={tituloFormulario}
                               acaoExecutada={acaoExecutada}
                               entidade={entidade}
                               clearModal={clearModal}
                               funcaoNovoCadastro={novoCadastro}
                               funcaoSalvarCadastro={handleSalvarEntidade}
                               funcaoEditarCadastro={handleEditarEntidade}
                               scalamodal={`full`}
                               componenteCadastro={<TabsComponente tabs={TabsProcesso(
                                   entidade, editavel
                               )}/>}
        >
            
            <TabelaComponente colunas={colunasTabelaProcessos()}
                              listaEntidade={listaEntidade}
                              skip={skip}
                              setSkip={setSkip}
                              take={take}
                              totalRegistros={totalRegistros}
                              valorFiltro={filtroEntidade}
                              funcaoFiltro={handleFiltrar}
                              funcaoGerarRelatorio={funcaoFechCadastros}
                              tituloPagina={tituloPagina}
                              acoes={{
                                  excluir: handleExcluirEntidade,
                                  editar: handleEditarEntidade,
                                  selecionar: handleSelecionarEntidade
                              }}/>
        </Pagesection.Container>
    )
}
