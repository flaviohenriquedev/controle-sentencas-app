import {ColunaTabelaType} from "@/types/ColunaTabelaType";

export const colunasTabelaProcessos = () => {
    const campos: ColunaTabelaType[] = [
        {
            label: 'Nº Processo',
            field: 'numeroProcessoPrincipal'
        },
        {
            label: 'Tipo Processo',
            field: 'tipoProcessoPrincipal'
        },
        {
            label: 'Cliente',
            field: 'cliente.nome'
        }
    ]
    
    return campos
}
