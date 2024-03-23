'use client'

import React from "react";
import {AxiosResponse} from "axios";
import {IndiceIPCAE} from "@/class/IndiceIPCAE";
import {excluirIndiceIPCAE, getIndiceIPCAE, salvarIndiceIPCAE} from "@/services/sdk/indiceIPCAE";
import {ComponenteDePagina} from "@/components/componente_de_pagina/ComponenteDePagina";
import {indiceIPCAEColunasTabela} from "@/components/pages/administracao_sistema/indiceIPCAE/indiceIPCAEColunasTabela";

const classeEntidade = IndiceIPCAE;
const tituloPagina: string = 'Indice IPCAE'
const tituloFormulario: string = 'Cadastro de Indice IPCAE'
const funcaoFechCadastros: (filtro?: string, take?: string, skip?: string) => Promise<AxiosResponse<any, any>> = getIndiceIPCAE
const funcaoSalvarCadastro: (entidade: any) => Promise<AxiosResponse<any, any>> = salvarIndiceIPCAE
const funcaoExcluirCadastro: (id: number) => Promise<AxiosResponse<any, any>> = excluirIndiceIPCAE

export function IndiceIPCAEComponente() {
    return (
        <ComponenteDePagina classeEntidade={classeEntidade}
                            tituloPagina={tituloPagina}
                            tituloFormulario={tituloFormulario}
                            funcaoFechCadastros={funcaoFechCadastros}
                            funcaoSalvarCadastro={funcaoSalvarCadastro}
                            funcaoExcluirCadastro={funcaoExcluirCadastro}
                            colunas={indiceIPCAEColunasTabela()}
        />
    )
}
