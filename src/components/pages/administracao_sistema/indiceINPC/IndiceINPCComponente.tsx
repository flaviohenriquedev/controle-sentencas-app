'use client'

import {Pagesection} from "@/components/layout/pagesection";
import React, {useCallback, useEffect, useState} from "react";
import {toast} from "react-hot-toast";
import {EntidadePadrao} from "@/class/EntidadePadrao";
import {AxiosResponse} from "axios";
import TabelaComponente from "@/components/datadisplay/tabelacomponente/TabelaComponente";
import {IndiceINPC} from "@/class/IndiceINPC";
import {excluirIndiceINPC, getIndiceINPC, salvarIndiceINPC} from "@/services/sdk/indiceINPC";
import {
    IndiceINPCFormularioCadastro
} from "@/components/pages/administracao_sistema/indiceINPC/IndiceINPCFormularioCadastro";
import {indiceINPCColunasTabela} from "@/components/pages/administracao_sistema/indiceINPC/indiceINPCColunasTabela";

const classeEntidade = IndiceINPC;
const tituloPagina: string = 'Indice INPC'
const tituloFormulario: string = 'Cadastro de Indice INPC'
const funcaoFechCadastros: (take: string, skip: string) => Promise<AxiosResponse<any, any>> = getIndiceINPC
const funcaoSalvarCadastro: (entidade: any) => Promise<AxiosResponse<any, any>> = salvarIndiceINPC
const funcaoExcluirCadastro: (id: number) => Promise<AxiosResponse<any, any>> = excluirIndiceINPC

export function IndiceINPCComponente() {
    const [entidade, setEntidade] = useState<InstanceType<typeof classeEntidade>>(new (classeEntidade as any)());
    const [listaEntidade, setListaEntidade] = useState<Array<InstanceType<typeof classeEntidade>>>([]);
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
        const response = await funcaoFechCadastros(String(take), String(skip))
            .then(res => {
                return res.data
            }).catch((error) => {
                toast.error(error.message);
            })
        if (response) {
            setListaEntidade(response.registros)
            setTotalRegistros(response.quantRegistros);
        }
    }, [skip, take])
    
    useEffect(() => {
        fetchCadastros()
    }, [skip, take, fetchCadastros]);
    
    async function handleSalvarEntidade() {
        await funcaoSalvarCadastro(entidade)
            .then(res => {
                toast.success(res.data.mensagem)
            }).catch(error => {
                toast.error(error.response.data.mensagem);
            });
        await fetchCadastros();
        setEntidade(new (classeEntidade as any)());
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
    
    return (
        <Pagesection.Container titulo={tituloPagina}
                               tituloComponenteCadastro={tituloFormulario}
                               acaoExecutada={acaoExecutada}
                               entidade={entidade}
                               clearModal={clearModal}
                               funcaoNovoCadastro={novoCadastro}
                               funcaoSalvarCadastro={handleSalvarEntidade}
                               componenteCadastro={<IndiceINPCFormularioCadastro entidade={entidade}
                                                                                 editavel={editavel}/>}
        >
            
            <TabelaComponente colunas={indiceINPCColunasTabela()}
                              listaEntidade={listaEntidade}
                              skip={skip}
                              setSkip={setSkip}
                              setTake={setTake}
                              take={take}
                              totalRegistros={totalRegistros}
                              acoes={{
                                  excluir: handleExcluirEntidade,
                                  editar: handleEditarEntidade,
                                  selecionar: handleSelecionarEntidade
                              }}/>
        </Pagesection.Container>
    )
}
