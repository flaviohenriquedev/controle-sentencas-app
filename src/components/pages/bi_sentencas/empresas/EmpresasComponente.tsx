'use client'

import React from "react";
import {excluirEmpresa, getEmpresa, salvarEmpresa} from "@/services";
import {AxiosResponse} from "axios";
import {Empresa} from "@/class/Empresa";
import {colunasTabelaEmpresas} from "@/components/pages/bi_sentencas/empresas/colunasTabelaEmpresas";
import {ComponenteDePagina} from "@/components/componente_de_pagina/ComponenteDePagina";

const classeEntidade = Empresa;
const tituloPagina: string = 'Empresas'
const tituloFormulario: string = 'Cadastro de Empresas'
const funcaoFechCadastros: (filtro?: string, take?: string, skip?: string) => Promise<AxiosResponse<any, any>> = getEmpresa
const funcaoSalvarCadastro: (entidade: any) => Promise<AxiosResponse<any, any>> = salvarEmpresa
const funcaoExcluirCadastro: (id: number) => Promise<AxiosResponse<any, any>> = excluirEmpresa

export function EmpresasComponente() {
    return (
        <ComponenteDePagina classeEntidade={classeEntidade}
                            tituloPagina={tituloPagina}
                            tituloFormulario={tituloFormulario}
                            funcaoFechCadastros={funcaoFechCadastros}
                            funcaoSalvarCadastro={funcaoSalvarCadastro}
                            funcaoExcluirCadastro={funcaoExcluirCadastro}
                            colunas={colunasTabelaEmpresas()}
        />
    )
}
