import React, {useCallback, useEffect, useState} from "react";
import {toast} from "react-hot-toast";
import {EntidadePadrao} from "@/class/EntidadePadrao";
import {Pagesection} from "@/components/layout/pagesection";
import TabelaComponente from "@/components/datadisplay/tabelacomponente/TabelaComponente";
import {AxiosResponse} from "axios";
import {ColunaTabelaType} from "@/types/ColunaTabelaType";

interface Props<T extends EntidadePadrao> {
    classeEntidade: T;
    tituloPagina: string;
    tituloFormulario: string;
    funcaoFechCadastros: (filtro?: string, take?: string, skip?: string) => Promise<AxiosResponse<any, any>>
    funcaoSalvarCadastro: (entidade: any) => Promise<AxiosResponse<any, any>>
    funcaoExcluirCadastro: (id: number) => Promise<AxiosResponse<any, any>>
    colunas: ColunaTabelaType[]
    componenteCadastro?: React.ReactElement
}

export function ComponenteDePagina({
                                       classeEntidade,
                                       tituloPagina,
                                       tituloFormulario,
                                       funcaoFechCadastros,
                                       funcaoSalvarCadastro,
                                       funcaoExcluirCadastro,
                                       colunas,
                                       componenteCadastro
                                   }: Props<any>) {
    
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
                               totalDeRegistros={totalRegistros}
                               acaoExecutada={acaoExecutada}
                               entidade={entidade}
                               clearModal={clearModal}
                               funcaoNovoCadastro={novoCadastro}
                               funcaoSalvarCadastro={handleSalvarEntidade}
                               funcaoEditarCadastro={handleEditarEntidade}
                               scalamodal={`full`}
                               componenteCadastro={componenteCadastro}
        >
            <TabelaComponente colunas={colunas}
                              listaEntidade={listaEntidade}
                              take={take}
                              skip={skip}
                              setSkip={setSkip}
                              setTake={setTake}
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
