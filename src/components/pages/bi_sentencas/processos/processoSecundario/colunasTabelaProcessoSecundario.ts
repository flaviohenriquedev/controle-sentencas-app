import {ColunaTabelaType} from "@/types/ColunaTabelaType";
import {TipoProcessoSecundarioFactory} from "@/enum/TipoProcessoSecundarioEnum";

export const colunasTabelaProcessoSecundario = () => {
    const campos: ColunaTabelaType[] = [
        {
            label: 'Nº Processo',
            field: 'numeroProcessoFilho'
        },
        {
            label: 'Tipo Processo',
            field: 'tipoProcessoFilho',
            factory: TipoProcessoSecundarioFactory
            
        },
        {
            label: 'Cliente',
            field: 'cliente.nome'
        }
    ]
    
    return campos
}
