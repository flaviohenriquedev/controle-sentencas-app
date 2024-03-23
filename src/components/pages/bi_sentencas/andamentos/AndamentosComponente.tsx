'use client'

import React from "react";
import {excluirAndamento, getAndamentos, salvarAndamento} from "@/services";
import {AxiosResponse} from "axios";
import {Andamento} from "@/class/Andamento";
import {andamentosColunasTabela} from "@/components/pages/bi_sentencas/andamentos/andamentosColunasTabela";
import {ComponenteDePagina} from "@/components/componente_de_pagina/ComponenteDePagina";

const classeEntidade = Andamento;
const tituloPagina: string = 'Andamentos'
const tituloFormulario: string = 'Cadastro de Andamentos'
const funcaoFechCadastros: (filtro?: string, take?: string, skip?: string) => Promise<AxiosResponse<any, any>> = getAndamentos
const funcaoSalvarCadastro: (entidade: any) => Promise<AxiosResponse<any, any>> = salvarAndamento
const funcaoExcluirCadastro: (id: number) => Promise<AxiosResponse<any, any>> = excluirAndamento

export function AndamentosComponente() {
    return (
        <ComponenteDePagina classeEntidade={classeEntidade}
                            tituloPagina={tituloPagina}
                            tituloFormulario={tituloFormulario}
                            funcaoFechCadastros={funcaoFechCadastros}
                            funcaoSalvarCadastro={funcaoSalvarCadastro}
                            funcaoExcluirCadastro={funcaoExcluirCadastro}
                            colunas={andamentosColunasTabela()}
        />
    )
}
