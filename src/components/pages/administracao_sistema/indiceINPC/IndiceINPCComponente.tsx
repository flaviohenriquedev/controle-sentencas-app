'use client'

import React from "react";
import {AxiosResponse} from "axios";
import {IndiceINPC} from "@/class/IndiceINPC";
import {excluirIndiceINPC, getIndiceINPC, salvarIndiceINPC} from "@/services/sdk/indiceINPC";
import {ComponenteDePagina} from "@/components/componente_de_pagina/ComponenteDePagina";
import {comarcasColunasTabela} from "@/components/pages/bi_sentencas/comarcas/comarcasColunasTabela";

const classeEntidade = IndiceINPC;
const tituloPagina: string = 'Indice INPC'
const tituloFormulario: string = 'Cadastro de Indice INPC'
const funcaoFechCadastros: (filtro?: string, take?: string, skip?: string) => Promise<AxiosResponse<any, any>> = getIndiceINPC
const funcaoSalvarCadastro: (entidade: any) => Promise<AxiosResponse<any, any>> = salvarIndiceINPC
const funcaoExcluirCadastro: (id: number) => Promise<AxiosResponse<any, any>> = excluirIndiceINPC

export function IndiceINPCComponente() {
    return (
        <ComponenteDePagina classeEntidade={classeEntidade}
                            tituloPagina={tituloPagina}
                            tituloFormulario={tituloFormulario}
                            funcaoFechCadastros={funcaoFechCadastros}
                            funcaoSalvarCadastro={funcaoSalvarCadastro}
                            funcaoExcluirCadastro={funcaoExcluirCadastro}
                            colunas={comarcasColunasTabela()}
        />
    )
}
