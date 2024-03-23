import {ColunaTabelaType} from "@/types/ColunaTabelaType";
import {TipoProcessoFactory} from "@/enum/TipoProcessoEnum";

export const colunasTabelaProcessos = () => {
    const campos: ColunaTabelaType[] = [
        {
            label: 'Nº Processo',
            field: 'numeroProcessoPrincipal'
        },
        {
            label: 'Tipo Processo',
            field: 'tipoProcessoPrincipal',
            factory: TipoProcessoFactory
        },
        {
            label: 'Cliente',
            field: 'cliente.nome'
        }
    ]

    return campos
}
