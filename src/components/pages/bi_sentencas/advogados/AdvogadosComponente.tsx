'use client'

import React from "react";
import {excluirAdvogado, getAdvogados, salvarAdvogado} from "@/services";
import {AxiosResponse} from "axios";
import {Advogado} from "@/class/Advogado";
import {advogadosColunasTabela} from "@/components/pages/bi_sentencas/advogados/advogadosColunasTabela";
import {ComponenteDePagina} from "@/components/componente_de_pagina/ComponenteDePagina";

const classeEntidade = Advogado;
const tituloPagina: string = 'Advogados'
const tituloFormulario: string = 'Cadastro de Advogados'
const funcaoFechCadastros: (filtro?: string, take?: string, skip?: string) => Promise<AxiosResponse<any, any>> = getAdvogados
const funcaoSalvarCadastro: (entidade: any) => Promise<AxiosResponse<any, any>> = salvarAdvogado
const funcaoExcluirCadastro: (id: number) => Promise<AxiosResponse<any, any>> = excluirAdvogado

export function AdvogadosComponente() {
    return (
        <ComponenteDePagina classeEntidade={classeEntidade}
                            tituloPagina={tituloPagina}
                            tituloFormulario={tituloFormulario}
                            funcaoFechCadastros={funcaoFechCadastros}
                            funcaoSalvarCadastro={funcaoSalvarCadastro}
                            funcaoExcluirCadastro={funcaoExcluirCadastro}
                            colunas={advogadosColunasTabela()}
        />
    )
}
