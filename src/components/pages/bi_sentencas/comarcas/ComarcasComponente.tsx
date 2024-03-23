'use client'

import React from "react";
import {excluirComarca, getComarcas, salvarComarca} from "@/services";
import {AxiosResponse} from "axios";
import {Comarca} from "@/class/Comarca";
import {comarcasColunasTabela} from "@/components/pages/bi_sentencas/comarcas/comarcasColunasTabela";
import {ComponenteDePagina} from "@/components/componente_de_pagina/ComponenteDePagina";

const classeEntidade = Comarca;
const tituloPagina: string = 'Comarcas'
const tituloFormulario: string = 'Cadastro de Comarcas'
const funcaoFechCadastros: (filtro?: string, take?: string, skip?: string) => Promise<AxiosResponse<any, any>> = getComarcas
const funcaoSalvarCadastro: (entidade: any) => Promise<AxiosResponse<any, any>> = salvarComarca
const funcaoExcluirCadastro: (id: number) => Promise<AxiosResponse<any, any>> = excluirComarca

export function ComarcasComponente() {
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
