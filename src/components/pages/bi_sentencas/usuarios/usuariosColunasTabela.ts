import {ColunaTabelaType} from "@/types/ColunaTabelaType";

export const usuariosColunasTabela = () => {
    const campos: ColunaTabelaType[] = [
        {
            label: 'Nome',
            field: 'nome'
        },
        {
            label: 'Email',
            field: 'email'
        },
    ]
    
    return campos
}
