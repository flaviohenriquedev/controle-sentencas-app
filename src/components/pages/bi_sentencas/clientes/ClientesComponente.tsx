'use client'

import React from "react";
import {excluirCliente, getClientes, salvarCliente} from "@/services";
import {AxiosResponse} from "axios";
import {Cliente} from "@/class/Cliente";
import {clientesColunasTabela} from "@/components/pages/bi_sentencas/clientes/clientesColunasTabela";
import {ComponenteDePagina} from "@/components/componente_de_pagina/ComponenteDePagina";

const classeEntidade = Cliente;
const tituloPagina: string = 'Clientes'
const tituloFormulario: string = 'Cadastro de Clientes'
const funcaoFechCadastros: (filtro?: string, take?: string, skip?: string) => Promise<AxiosResponse<any, any>> = getClientes
const funcaoSalvarCadastro: (entidade: any) => Promise<AxiosResponse<any, any>> = salvarCliente
const funcaoExcluirCadastro: (id: number) => Promise<AxiosResponse<any, any>> = excluirCliente

export function ClientesComponente() {
    return (
        <ComponenteDePagina classeEntidade={classeEntidade}
                            tituloPagina={tituloPagina}
                            tituloFormulario={tituloFormulario}
                            funcaoFechCadastros={funcaoFechCadastros}
                            funcaoSalvarCadastro={funcaoSalvarCadastro}
                            funcaoExcluirCadastro={funcaoExcluirCadastro}
                            colunas={clientesColunasTabela()}
        />
    )
}
