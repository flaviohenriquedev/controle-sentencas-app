'use client'

import React from "react";
import {excluirNatureza, getNaturezas, salvarNatureza} from "@/services";
import {AxiosResponse} from "axios";
import {Natureza} from "@/class/Natureza";
import {naturezasColunasTabela} from "@/components/pages/bi_sentencas/naturezas/naturezasColunasTabela";
import {ComponenteDePagina} from "@/components/componente_de_pagina/ComponenteDePagina";

const classeEntidade = Natureza;
const tituloPagina: string = 'Naturezas'
const tituloFormulario: string = 'Cadastro de Naturezas'
const funcaoFechCadastros: (filtro?: string, take?: string, skip?: string) => Promise<AxiosResponse<any, any>> = getNaturezas
const funcaoSalvarCadastro: (entidade: any) => Promise<AxiosResponse<any, any>> = salvarNatureza
const funcaoExcluirCadastro: (id: number) => Promise<AxiosResponse<any, any>> = excluirNatureza

export function NaturezasComponente() {
    return (
        <ComponenteDePagina classeEntidade={classeEntidade}
                            tituloPagina={tituloPagina}
                            tituloFormulario={tituloFormulario}
                            funcaoFechCadastros={funcaoFechCadastros}
                            funcaoSalvarCadastro={funcaoSalvarCadastro}
                            funcaoExcluirCadastro={funcaoExcluirCadastro}
                            colunas={naturezasColunasTabela()}
        />
    )
}
