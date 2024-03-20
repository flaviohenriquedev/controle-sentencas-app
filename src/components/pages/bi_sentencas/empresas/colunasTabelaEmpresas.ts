import {ColunaTabelaType} from "@/types/ColunaTabelaType";

export const colunasTabelaEmpresas = () => {
    const campos: ColunaTabelaType[] = [
        {
            label: 'Nome',
            field: 'nome'
        },
    ]
    
    return campos
}
