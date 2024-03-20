'use client'

import {Pagesection} from "@/components/layout/pagesection";
import {LineContent} from "@/components/layout/linecontent/LineContent";
import LabelContainer from "@/components/datainput/label/LabelContainer";
import React, {useCallback, useEffect, useState} from "react";
import {excluirAdvogado, getAdvogados, salvarAdvogado} from "@/services";
import {toast} from 'react-hot-toast';
import {EntidadePadrao} from "@/class/EntidadePadrao";
import {AxiosResponse} from "axios";
import TabelaComponente from "@/components/datadisplay/tabelacomponente/TabelaComponente";
import {Advogado} from "@/class/Advogado";
import {AdvogadosFormularioCadastro} from "@/components/pages/bi_sentencas/advogados/AdvogadosFormularioCadastro";
import {advogadosColunasTabela} from "@/components/pages/bi_sentencas/advogados/advogadosColunasTabela";
import {InputFilter} from "@/components/datainput/inputfilter/InputFilter";

const classeEntidade = Advogado;
const tituloPagina: string = 'Advogados'
const tituloFormulario: string = 'Cadastro de Advogados'
const funcaoFechCadastros: (filtro?: string, take?: string, skip?: string) => Promise<AxiosResponse<any, any>> = getAdvogados
const funcaoSalvarCadastro: (entidade: any) => Promise<AxiosResponse<any, any>> = salvarAdvogado
const funcaoExcluirCadastro: (id: number) => Promise<AxiosResponse<any, any>> = excluirAdvogado

export function AdvogadosComponente() {
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
                setListaEntidade(prevListaEntidade =>
                    prevListaEntidade.filter(entidadeFiltrada => entidadeFiltrada.id !== id));
                return toast.success(res.data.mensagem)
            }).catch(error => {
                toast.error(error.data.message);
            });
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
                               acaoExecutada={acaoExecutada}
                               entidade={entidade}
                               clearModal={clearModal}
                               funcaoNovoCadastro={novoCadastro}
                               funcaoSalvarCadastro={handleSalvarEntidade}
                               componenteCadastro={<AdvogadosFormularioCadastro entidade={entidade}
                                                                                editavel={editavel}/>}
        >
            <TabelaComponente colunas={advogadosColunasTabela()}
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
