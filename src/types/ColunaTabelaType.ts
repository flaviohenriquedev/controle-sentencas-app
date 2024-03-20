import {AcoesTabelaType} from "@/types/AcoesTabelaType";
import {FormatoDadoType} from "@/types/FormatoDadoType";

export type ColunaTabelaType = {
    label: string;
    field: string;
    factory?: any;
    acoes?: AcoesTabelaType | undefined;
    mascara?: (valor: any) => void;
    tipo?: FormatoDadoType
}
