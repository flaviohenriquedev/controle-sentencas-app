'use client'

import * as S from './style'
// @ts-ignore
import pdfMake from "pdfmake/build/pdfmake";
// @ts-ignore
import pdfFonts from "pdfmake/build/vfs_fonts";
import {Pagesection} from "@/components/layout/pagesection";
import {LineContent} from "@/components/layout/linecontent/LineContent";
import {GerarRelatorioComponent} from "@/components/action/gerarrelatorio";
import {Usuario} from "@/class/Usuario";
import {useState} from "react";
import {getClientes, getUsuarios} from "@/services";
import {Cliente} from "@/class/Cliente";
import {formatarCPF} from "@/util/Util";
import {toast} from "react-hot-toast";

(pdfMake as any).vfs = pdfFonts.pdfMake.vfs;

export function RelatoriosComponente() {
    
    const [usuario, setUsuario] = useState<Usuario>(new Usuario())
    const [cliente, setCliente] = useState<Cliente>(new Cliente())
    const [filtroUsuario, setFiltroUsuario] = useState<string>('')
    const [filtroClienteo, setFiltroCliente] = useState<string>('')
    
    async function getRelatorioUsuarios() {
        let usuarios: Usuario[] = [];
        
        await getUsuarios(filtroUsuario)
            .then((response) => {
                usuarios = response.data.registros;
            }).catch((error) => {
                toast.error(error.message);
            })
        
        let registros: any[];
        registros = [];
        
        usuarios.forEach((usuario) => {
            const registro = [];
            registro.push({
                text: usuario.id,
                style: "detail",
                alignment: "center",
            });
            registro.push({
                text: usuario.nome,
                style: "detail",
            });
            registro.push({
                text: usuario.email,
                style: "detail",
            });
            
            registros.push(registro);
        });
        
        const tableBody = {
            widths: [50, "*", "*"],
            body: [
                [
                    {text: "Código", style: "tableHeader", alignment: "center"},
                    {text: "Nome", style: "tableHeader"},
                    {text: "E-mail", style: "tableHeader"},
                ],
                ...registros,
            ],
        };
        
        return getDocDefinitions(
            "Relatório de Usuários",
            tableBody,
            registros.length
        );
    }
    
    async function handlePrint(tipoRelatorio: string) {
        pdfMake.vfs = pdfFonts.pdfMake.vfs;
        const docDefinitions =
            tipoRelatorio === "LISTAGEM_USUARIOS"
                ? await getRelatorioUsuarios()
                : tipoRelatorio === "LISTAGEM_CLIENTES" &&
                (await getRelatorioClientes());
        pdfMake.createPdf(docDefinitions).open();
    }
    
    async function getRelatorioClientes() {
        let clientes: Cliente[] = [];
        
        await getClientes(filtroClienteo)
            .then((response) => {
                clientes = response.data.registros;
            }).catch((error) => {
                toast.error(error.message);
            })
        
        let registros: any[];
        registros = [];
        
        clientes.forEach((cliente) => {
            const registro = [];
            registro.push({
                text: cliente.id,
                style: "detail",
                alignment: "center",
            });
            registro.push({
                text: cliente.nome,
                style: "detail",
            });
            registro.push({
                text: formatarCPF(cliente.cpf),
                style: "detail",
                alignment: "center",
            });
            
            registros.push(registro);
        });
        
        const tableBody = {
            widths: [90, "*", 90],
            body: [
                [
                    {text: "Código", style: "tableHeader", alignment: "center"},
                    {text: "Nome", style: "tableHeader"},
                    {text: "CPF", style: "tableHeader", alignment: "center"},
                ],
                ...registros,
            ],
        };
        
        return getDocDefinitions(
            "Relatório de Clientes",
            tableBody,
            registros.length
        );
    }
    
    function getDocDefinitions(titulo: string, tableBody: any, quantRegistros: number) {
        // const geradoEm = new Date().toLocaleString("pt-BR", { timezone: "UTC" });
        
        return {
            content: [
                {
                    text: titulo,
                    style: "header",
                    alignment: "center",
                    margin: [0, 0, 0, 20],
                },
                {
                    table: tableBody,
                    layout: "lightHorizontalLines",
                },
                {
                    text: "Total de Registros: " + quantRegistros,
                    style: "totalizador",
                },
            ],
            footer: function (currentPage: number, pageCount: number) {
                return {
                    table: {
                        widths: ["*", "*"],
                        headerRows: 1,
                        body: [
                            ["", ""],
                            [
                                {text: "process.env.SISTEMA_NOME", style: "footerPagina"},
                                {
                                    text:
                                        "Pagina " +
                                        currentPage.toString() +
                                        " de " +
                                        pageCount.toString(),
                                    alignment: "right",
                                    style: "footerPagina",
                                },
                            ],
                            // [
                            //     {
                            //         text: "Gerado Por:" + auth?.usuario?.nome,
                            //         style: "footerPagina",
                            //     },
                            //     {
                            //         text: geradoEm,
                            //         alignment: "right",
                            //         style: "footerPagina",
                            //     },
                            // ],
                        ],
                    },
                    layout: "headerLineOnly",
                };
            },
            styles: {
                header: {
                    fontSize: 18,
                    bold: true,
                    alignment: "justify",
                },
                totalizador: {
                    fontSize: 13,
                    bold: true,
                    alignment: "right",
                    margin: [0, 10, 0, 0],
                },
                tableHeader: {
                    bold: true,
                    fontSize: 13,
                    color: "black",
                },
                detail: {
                    fontSize: 10,
                    color: "black",
                },
                footerPagina: {
                    bold: true,
                    fontSize: 8,
                    margin: [10, 0, 10, 0],
                    color: "black",
                },
            },
        };
    }
    
    return (
        <Pagesection.Container titulo={`Relatórios`}>
            <S.Container>
                <LineContent className={`gap-10`}>
                    <GerarRelatorioComponent descricao={`Clientes`}
                                             action={() => handlePrint("LISTAGEM_CLIENTES")}/>
                    <GerarRelatorioComponent descricao={`Usuários`}
                                             action={() => handlePrint("LISTAGEM_USUARIOS")}/>
                </LineContent>
            </S.Container>
        </Pagesection.Container>
    )
}
