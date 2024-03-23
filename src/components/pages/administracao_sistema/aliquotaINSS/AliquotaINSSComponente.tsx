'use client'

import React from "react";
import {AxiosResponse} from "axios";
import {AliquotaINSS} from "@/class/AliquotaINSS";
import {excluirAliquotaINSS, getAliquotasINSS, salvarAliquotasINSS} from "@/services/sdk/aliquotasINSS";
import {ComponenteDePagina} from "@/components/componente_de_pagina/ComponenteDePagina";
import {indiceINPCColunasTabela} from "@/components/pages/administracao_sistema/indiceINPC/indiceINPCColunasTabela";

const classeEntidade = AliquotaINSS;
const tituloPagina: string = 'Aliquota INSS'
const tituloFormulario: string = 'Cadastro de Aliquota INSS'
const funcaoFechCadastros: (filtro?: string, take?: string, skip?: string) => Promise<AxiosResponse<any, any>> = getAliquotasINSS
const funcaoSalvarCadastro: (entidade: any) => Promise<AxiosResponse<any, any>> = salvarAliquotasINSS
const funcaoExcluirCadastro: (id: number) => Promise<AxiosResponse<any, any>> = excluirAliquotaINSS

export function AliquotaINSSComponente() {
    return (
        <ComponenteDePagina classeEntidade={classeEntidade}
                            tituloPagina={tituloPagina}
                            tituloFormulario={tituloFormulario}
                            funcaoFechCadastros={funcaoFechCadastros}
                            funcaoSalvarCadastro={funcaoSalvarCadastro}
                            funcaoExcluirCadastro={funcaoExcluirCadastro}
                            colunas={indiceINPCColunasTabela()}
        />
    )
}
