'use client'

import React from "react";
import {AxiosResponse} from "axios";
import {IndiceSELIC} from "@/class/IndiceSELIC";
import {excluirIndiceSELIC, getIndiceSELIC, salvarIndiceSELIC} from "@/services/sdk/indiceSELIC";
import {ComponenteDePagina} from "@/components/componente_de_pagina/ComponenteDePagina";
import {indiceSELICColunasTabela} from "@/components/pages/administracao_sistema/indiceSELIC/indiceSELICColunasTabela";

const classeEntidade = IndiceSELIC;
const tituloPagina: string = 'Indice SELIC'
const tituloFormulario: string = 'Cadastro de Indice SELIC'
const funcaoFechCadastros: (filtro?: string, take?: string, skip?: string) => Promise<AxiosResponse<any, any>> = getIndiceSELIC
const funcaoSalvarCadastro: (entidade: any) => Promise<AxiosResponse<any, any>> = salvarIndiceSELIC
const funcaoExcluirCadastro: (id: number) => Promise<AxiosResponse<any, any>> = excluirIndiceSELIC

export function IndiceSELICComponente() {
    return (
        <ComponenteDePagina classeEntidade={classeEntidade}
                            tituloPagina={tituloPagina}
                            tituloFormulario={tituloFormulario}
                            funcaoFechCadastros={funcaoFechCadastros}
                            funcaoSalvarCadastro={funcaoSalvarCadastro}
                            funcaoExcluirCadastro={funcaoExcluirCadastro}
                            colunas={indiceSELICColunasTabela()}
        />
    )
}
