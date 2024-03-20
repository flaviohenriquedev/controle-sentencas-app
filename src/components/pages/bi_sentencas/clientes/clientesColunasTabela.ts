import {ColunaTabelaType} from "@/types/ColunaTabelaType";

export const clientesColunasTabela = () => {
    const campos: ColunaTabelaType[] = [
        {
            label: 'CPF',
            field: 'cpf'
        },
        {
            label: 'Nome',
            field: 'nome'
        },
    ]
    
    return campos
}
