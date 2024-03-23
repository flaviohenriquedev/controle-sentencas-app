'use client'

import React from "react";
import {excluirUsuario, getUsuarios, salvarUsuario} from "@/services";
import {AxiosResponse} from "axios";
import {Usuario} from "@/class/Usuario";
import {usuariosColunasTabela} from "@/components/pages/bi_sentencas/usuarios/usuariosColunasTabela";
import {ComponenteDePagina} from "@/components/componente_de_pagina/ComponenteDePagina";

const classeEntidade = Usuario;
const tituloPagina: string = 'Usuários'
const tituloFormulario: string = 'Cadastro de Usuários'
const funcaoFechCadastros: (filtro?: string, take?: string, skip?: string) => Promise<AxiosResponse<any, any>> = getUsuarios
const funcaoSalvarCadastro: (entidade: any) => Promise<AxiosResponse<any, any>> = salvarUsuario
const funcaoExcluirCadastro: (id: number) => Promise<AxiosResponse<any, any>> = excluirUsuario

export function UsuariosComponente() {
    return (
        <ComponenteDePagina classeEntidade={classeEntidade}
                            tituloPagina={tituloPagina}
                            tituloFormulario={tituloFormulario}
                            funcaoFechCadastros={funcaoFechCadastros}
                            funcaoSalvarCadastro={funcaoSalvarCadastro}
                            funcaoExcluirCadastro={funcaoExcluirCadastro}
                            colunas={usuariosColunasTabela()}
        />
    )
}
