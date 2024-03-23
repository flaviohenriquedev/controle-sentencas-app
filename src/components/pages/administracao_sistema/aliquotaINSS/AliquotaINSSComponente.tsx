'use client'

import {Pagesection} from "@/components/layout/pagesection";
import React, {useCallback, useEffect, useState} from "react";
import {toast} from "react-hot-toast";
import {EntidadePadrao} from "@/class/EntidadePadrao";
import {AxiosResponse} from "axios";
import TabelaComponente from "@/components/datadisplay/tabelacomponente/TabelaComponente";
import {AliquotaINSS} from "@/class/AliquotaINSS";
import {excluirAliquotaINSS, getAliquotasINSS, salvarAliquotasINSS} from "@/services/sdk/aliquotasINSS";
import {
    AliquotaINSSFormularioCadastro
} from "@/components/pages/administracao_sistema/aliquotaINSS/AliquotaINSSFormularioCadastro";
import {
    aliquotaINSSColunasTabela
} from "@/components/pages/administracao_sistema/aliquotaINSS/aliquotaINSSColunasTabela";

const classeEntidade = AliquotaINSS;
const tituloPagina: string = 'Aliquota INSS'
const tituloFormulario: string = 'Cadastro de Aliquota INSS'
const funcaoFechCadastros: (take: string, skip: string) => Promise<AxiosResponse<any, any>> = getAliquotasINSS
const funcaoSalvarCadastro: (entidade: any) => Promise<AxiosResponse<any, any>> = salvarAliquotasINSS
const funcaoExcluirCadastro: (id: number) => Promise<AxiosResponse<any, any>> = excluirAliquotaINSS

export function AliquotaINSSComponente() {
    const [entidade, setEntidade] = useState<InstanceType<typeof classeEntidade>>(new (classeEntidade as any)());
    const [listaEntidade, setListaEntidade] = useState<Array<InstanceType<typeof classeEntidade>>>([]);
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
        const response = await funcaoFechCadastros(String(take), String(skip))
            .then(res => {
                return res.data
            }).catch((error) => {
                toast.error(error.response.data.mensagem);
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
                               totalDeRegistros={totalRegistros}
                               acaoExecutada={acaoExecutada}
                               entidade={entidade}
                               clearModal={clearModal}
                               funcaoNovoCadastro={novoCadastro}
                               funcaoSalvarCadastro={handleSalvarEntidade}
                               componenteCadastro={<AliquotaINSSFormularioCadastro entidade={entidade}
                                                                                   editavel={editavel}/>}
        >
            <TabelaComponente colunas={aliquotaINSSColunasTabela()}
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
