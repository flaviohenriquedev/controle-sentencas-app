import {toast} from "react-hot-toast";
import {AxiosResponse} from "axios";
import {ColunaTabelaType} from "@/types/ColunaTabelaType";
// @ts-ignore
import pdfMake from "pdfmake/build/pdfmake";
// @ts-ignore
import pdfFonts from "pdfmake/build/vfs_fonts";
import {get} from "lodash";
import {getSession} from "next-auth/react";

export function openModal(id: string): void {
    if (!window.localStorage.getItem('indexModal')) {
        window.localStorage.setItem('indexModal', String('10'));
    }

    const element: HTMLElement | null = document.getElementById(`mdl_ctn_${id}`);

    if (element) {
        let indexLocal = window.localStorage.getItem('indexModal')
        let indexInt = 0;

        if (indexLocal) {
            indexInt = parseInt(indexLocal) + 10
            window.localStorage.setItem('indexModal', String(indexInt));
        }

        element.classList.remove('invisible', 'opacity-0');
        element.classList.add('visible', 'opacity-100');
        element.style.zIndex = String(indexInt);
    }
}

export function closeModal(id: string): void {
    const element: HTMLElement | null = document.getElementById(`mdl_ctn_${id}`);
    if (element) {
        element.classList.remove('visible', 'opacity-100');
        element.classList.add('invisible', 'opacity-0');
    }
    removerIndice()
}

function removerIndice() {
    const elementos = document.querySelectorAll('[id^="mdl_ctn_"]');

    let algumElementoComClasseVisible = false;

    elementos.forEach((elemento) => {
        if (elemento.classList.contains('visible')) {
            algumElementoComClasseVisible = true;
        }
    });

    if (!algumElementoComClasseVisible) {
        window.localStorage.removeItem('indexModal')
    }
}

export async function gerarPDF(colunas: ColunaTabelaType[],
                               valorFiltro: string = '',
                               funcaoFetchCadastros: (filtro?: string, take?: string, skip?: string) => Promise<AxiosResponse<any, any>>,
                               tituloPagina?: string) {
    
    pdfMake.vfs = pdfFonts.pdfMake.vfs;
    const docDefinitions = await getDados(colunas, valorFiltro, funcaoFetchCadastros, tituloPagina);
    pdfMake.createPdf(docDefinitions).open();
}


async function getDados(colunas: ColunaTabelaType[],
                        valorFiltro: string = '',
                        funcaoFetchCadastros: (filtro?: string, take?: string, skip?: string) => Promise<AxiosResponse<any, any>>,
                        tituloPagina?: string) {
    
    let listaEntidade: [] = [];
    const headers: any[] = []
    
    await funcaoFetchCadastros(valorFiltro)
        .then((response) => {
            listaEntidade = response.data.registros;
        }).catch((error) => {
            toast.error(error.message);
        });
    
    colunas && colunas.map(coluna => {
        headers.push([
            {text: `${coluna.label}`, style: "tableHeader", alignment: "center"},
        ])
    });
    
    let registros: any[] = [];
    
    listaEntidade && listaEntidade.forEach((item) => {
        let dadosRelatorio: any[] = [];
        
        colunas && colunas.map(coluna => {
            dadosRelatorio.push({
                text: get(item, coluna.field),
                style: "detail",
                alignment: "center",
            });
        })
        registros.push(dadosRelatorio);
    })
    
    const width = Array.from({length: colunas.length}, (_, i) => (i === colunas.length - 1 ? '*' : 'auto'));
   
    const tableBody = {
        widths: width,
        body: [
            headers,
            ...registros,
        ],
    };
    
    const titulo = tituloPagina ? `Relatório de ${tituloPagina}` : '';
    
    return getDocDefinitions(
        titulo,
        tableBody,
        registros.length
    );
}

async function getDocDefinitions(titulo: string, tableBody: any, quantRegistros: number) {
    const geradoEm = new Date().toLocaleString("pt-BR");
    const session: any = await getSession();
    
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
                            {},
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
                        [
                            {
                                text: "Gerado Por:" + session?.user?.usuario?.nome,
                                style: "footerPagina",
                            },
                            {
                                text: geradoEm,
                                alignment: "right",
                                style: "footerPagina",
                            },
                        ],
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
