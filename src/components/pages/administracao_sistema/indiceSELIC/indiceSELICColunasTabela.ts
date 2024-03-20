import {ColunaTabelaType} from "@/types/ColunaTabelaType";
import {formatarMoeda} from "@/services";

export const indiceSELICColunasTabela = () => {
    const campos: ColunaTabelaType[] = [
        {
            label: 'Ano',
            field: 'ano'
        },
        {
            label: 'Mês',
            field: 'mes'
        },
        {
            label: 'Valor',
            field: 'valor',
            mascara: formatarMoeda
        },
    ]
    
    return campos
}
