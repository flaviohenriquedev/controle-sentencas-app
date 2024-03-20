import {ColunaTabelaType} from "@/types/ColunaTabelaType";

export const naturezasColunasTabela = () => {
    const campos: ColunaTabelaType[] = [
        {
            label: 'Descrição',
            field: 'descricao'
        },
    ]
    
    return campos
}
