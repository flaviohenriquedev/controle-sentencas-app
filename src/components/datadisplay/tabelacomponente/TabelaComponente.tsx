'use client'

import {EntidadePadrao} from "@/class/EntidadePadrao";
import {AcoesTabelaType} from "@/types/AcoesTabelaType";
import {ColunaTabelaType} from "@/types/ColunaTabelaType";
import {Table} from "@/components/datadisplay/table";
import React, {useCallback, useEffect, useState} from "react";
import {get} from "lodash";
import {LineContent} from "@/components/layout/linecontent/LineContent";
import {Paginacao} from "@/components/datadisplay/pagination/Paginacao";
import {AxiosResponse} from "axios";
import {PiFilePdfFill, PiFileXlsFill} from "react-icons/pi";
import {gerarPDF} from "@/functions/functions";
import * as S from './style'
import {Loading} from "@/components/datadisplay/loading/Loading";

interface Props<T extends EntidadePadrao> {
    colunas: ColunaTabelaType[]
    listaEntidade: T[]
    semColunaNumeracao?: boolean
    semColunaAcoes?: boolean
    acoes?: AcoesTabelaType,
    take: number,
    skip: number,
    setSkip?: (n: number) => void
    setTake?: (n: number) => void
    totalRegistros: number
    valorFiltro?: string
    funcaoFiltro?: (valor: string) => void
    funcaoGerarRelatorio?: (filtro?: string, take?: string, skip?: string) => Promise<AxiosResponse<any, any>>
    tituloPagina?: string
}

export default function TabelaComponente({
                                             colunas,
                                             listaEntidade,
                                             acoes,
                                             semColunaNumeracao,
                                             semColunaAcoes,
                                             take,
                                             skip,
                                             setSkip,
                                             setTake,
                                             totalRegistros,
                                             valorFiltro,
                                             funcaoFiltro,
                                             funcaoGerarRelatorio,
                                             tituloPagina
                                         }: Props<any>) {
    
    const [colunasARenderizar, setColunasARenderizar] = useState<ColunaTabelaType[]>(colunas)
    const [mostrarNenhumRegistro, setMostrarNenhumRegistro] = useState<boolean>(false)
    
    useEffect(() => {
        let timeout: any;
        
        timeout = setTimeout(() => {
            if (listaEntidade && listaEntidade.length === 0) {
                setMostrarNenhumRegistro(true);
            }
        }, 2000);
        
        return () => clearTimeout(timeout);
    }, [listaEntidade]);
    
    
    const appendColunas = useCallback(() => {
        const possuiIndex = colunasARenderizar.some(coluna => coluna.field === 'index');
        const possuiAcoes = colunasARenderizar.some(coluna => coluna.field === 'actions');
        
        if (!semColunaNumeracao && !possuiIndex) {
            setColunasARenderizar(prevColunas => [{label: "Nº", field: 'index'}, ...prevColunas]);
        }
        
        if (!semColunaAcoes && !possuiAcoes) {
            setColunasARenderizar(prevColunas => [...prevColunas, {label: "Ações", field: 'actions', acoes}]);
        }
    }, [acoes, colunasARenderizar, semColunaAcoes, semColunaNumeracao])
    
    const renderizarCabecalho = useCallback(() => {
        appendColunas()
        return colunasARenderizar.map((coluna, index) => {
            return <Table.Title key={coluna.label} title={coluna.label}/>
        })
    }, [appendColunas, colunasARenderizar])
    
    const renderizarLinhas = useCallback(() => {
        return listaEntidade && listaEntidade.map((entidade, index) => {
            const entidadeTratada = !semColunaNumeracao ? {...entidade, index: index + skip + 1} : entidade;
            
            return (
                <Table.Row key={index} index={index}>
                    {colunasARenderizar.map((coluna, columnIndex) => {
                        const indiceValores = Math.random();
                        
                        if (coluna.field === 'actions') {
                            return <Table.Actions key={indiceValores}
                                                  objeto={entidadeTratada}
                                                  metodoSelecionar={() => coluna.acoes?.selecionar
                                                      ? coluna.acoes.selecionar(entidadeTratada)
                                                      : undefined}
                                                  
                                                  metodoEditar={() => coluna.acoes?.editar
                                                      ? coluna.acoes?.editar(entidadeTratada)
                                                      : undefined}
                                                  
                                                  metodoExcluir={() => coluna.acoes?.excluir
                                                      ? coluna.acoes?.excluir(entidadeTratada.id)
                                                      : undefined}
                            />
                        } else {
                            return <Table.Value key={indiceValores} value={
                                handleValorColuna(coluna, entidadeTratada)
                            }/>
                        }
                    })}
                </Table.Row>
            );
        });
    }, [listaEntidade, semColunaNumeracao, skip, colunasARenderizar]);
    
    function handleValorColuna<T extends EntidadePadrao>(coluna: ColunaTabelaType, entidade: T) {
        
        if (coluna.factory) return coluna.factory.getLabel(get(entidade, coluna.field));
        if (coluna.mascara) return coluna.mascara(get(entidade, coluna.field))
        
        if (coluna.tipo) {
            if (coluna.tipo === 'PERCENTUAL') {
                return get(entidade, coluna.field) + ' %';
            }
        }
        
        return get(entidade, coluna.field);
    }
    
    function handleGerarPDF() {
        if (funcaoGerarRelatorio)
            return gerarPDF(colunas, valorFiltro, funcaoGerarRelatorio, tituloPagina)
    }

    
    return (
        <LineContent >
            {funcaoFiltro && (
                <div className={`flex w-full gap-1 h-8 mb-1 mt-5`}>
                    <input value={valorFiltro}
                           onChange={e => funcaoFiltro ? funcaoFiltro(e.target.value)
                               : null}
                           className={`w-full border border-base-content/30 rounded-sm focus:outline-none px-1 text-[0.8rem]`}
                           placeholder={`Digite para filtrar`}/>
                    <div className={`flex items-center justify-between w-20`}>
                        <button className={`flex items-center justify-center w-full h-full`}
                                onClick={handleGerarPDF}>
                            <PiFilePdfFill size={25}/>
                        </button>
                        <button disabled
                                className={`flex items-center justify-center w-full h-full hover:cursor-not-allowed`}>
                            <PiFileXlsFill color={`gray`} size={25}/>
                        </button>
                    </div>
                </div>
            )}
            
            <Table.Container>
                <Table.Header>
                    <Table.Row>
                        {renderizarCabecalho()}
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {renderizarLinhas()}
                </Table.Body>
            </Table.Container>
            {mostrarNenhumRegistro && (
                <S.NenhumRegistro>
                    <S.NenhumRegistroSpan>Nenhum registro encontrado</S.NenhumRegistroSpan>
                </S.NenhumRegistro>
            )}
            
            {listaEntidade && listaEntidade.length === 0 && !mostrarNenhumRegistro && (
                <Loading tamanho={`sm`}/>
            )}
            
            <Paginacao
                skip={skip}
                take={take}
                total={totalRegistros}
                setSkip={setSkip}
                setTake={setTake}
            />
        </LineContent>
    )
}
