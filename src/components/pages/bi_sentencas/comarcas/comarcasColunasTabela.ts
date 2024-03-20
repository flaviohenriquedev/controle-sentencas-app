import {ColunaTabelaType} from "@/types/ColunaTabelaType";

export const comarcasColunasTabela = () => {
    const campos: ColunaTabelaType[] = [
        {
            label: 'Descrição',
            field: 'descricao'
        },
        {
            label: 'Tipo',
            field: 'tipo'
        },
        {
            label: 'Estado',
            field: 'estado'
        },
        {
            label: 'Município',
            field: 'municipio'
        }
    ]
    
    return campos
}
