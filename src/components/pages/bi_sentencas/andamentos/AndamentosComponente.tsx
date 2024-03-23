'use client'

import {Pagesection} from "@/components/layout/pagesection";
import React, {useCallback, useEffect, useState} from "react";
import {excluirAndamento, getAndamentos, salvarAndamento} from "@/services";
import {toast} from "react-hot-toast";
import {EntidadePadrao} from "@/class/EntidadePadrao";
import {AxiosResponse} from "axios";
import TabelaComponente from "@/components/datadisplay/tabelacomponente/TabelaComponente";
import {Andamento} from "@/class/Andamento";
import {AndamentosFormularioCadastro} from "@/components/pages/bi_sentencas/andamentos/AndamentosFormularioCadastro";
import {andamentosColunasTabela} from "@/components/pages/bi_sentencas/andamentos/andamentosColunasTabela";

const classeEntidade = Andamento;
const tituloPagina: string = 'Andamentos'
const tituloFormulario: string = 'Cadastro de Andamentos'
const funcaoFechCadastros: (filtro?: string, take?: string, skip?: string) => Promise<AxiosResponse<any, any>> = getAndamentos
const funcaoSalvarCadastro: (entidade: any) => Promise<AxiosResponse<any, any>> = salvarAndamento
const funcaoExcluirCadastro: (id: number) => Promise<AxiosResponse<any, any>> = excluirAndamento

export function AndamentosComponente() {
    const [entidade, setEntidade] = useState<InstanceType<typeof classeEntidade>>(new (classeEntidade as any)());
    const [listaEntidade, setListaEntidade] = useState<Array<InstanceType<typeof classeEntidade>>>([]);
    const [filtroEntidade, setFiltroEntidade] = useState<string>('')
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
        const response = await funcaoFechCadastros(filtroEntidade, String(take), String(skip))
            .then(res => {
                return res.data
            }).catch((error) => {
                toast.error(error.message);
            })
        if (response) {
            setListaEntidade(response.registros)
            setTotalRegistros(response.quantRegistros);
        }
    }, [filtroEntidade, skip, take])
    
    useEffect(() => {
        fetchCadastros()
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
                return toast.success(res.data.mensagem)
            }).catch(error => {
                toast.error(error.data);
            });
        setListaEntidade(prevListaEntidade =>
            prevListaEntidade.filter(entidadeFiltrada => entidadeFiltrada.id !== id));
    }
    
    function novoCadastro() {
        setEntidade(new (classeEntidade as any)())
        setEditavel(true)
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
                               totalDeRegistros={totalRegistros}
                               acaoExecutada={acaoExecutada}
                               entidade={entidade}
                               clearModal={clearModal}
                               funcaoNovoCadastro={novoCadastro}
                               funcaoSalvarCadastro={handleSalvarEntidade}
                               componenteCadastro={<AndamentosFormularioCadastro entidade={entidade}
                                                                                 editavel={editavel}/>}
        >
            <TabelaComponente colunas={andamentosColunasTabela()}
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
