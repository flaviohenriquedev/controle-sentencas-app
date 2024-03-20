import {ColunaTabelaType} from "@/types/ColunaTabelaType";
import {formatarMoeda} from "@/services";

export const aliquotaINSSColunasTabela = () => {
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
            label: 'Alíquota',
            field: 'aliquota',
            tipo: 'PERCENTUAL'
        },
        {
            label: 'Faixa',
            field: 'faixa',
            mascara: formatarMoeda
        },
        {
            label: 'Teto',
            field: 'teto',
            mascara: formatarMoeda
        },
        {
            label: 'Teto Cooperativa',
            field: 'tetoCooperativa',
            mascara: formatarMoeda
        },
    ]
    
    return campos
}
