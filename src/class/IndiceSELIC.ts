import {EntidadePadrao} from "@/class/EntidadePadrao";

export class IndiceSELIC extends EntidadePadrao {
    constructor(
        public ano: number = 0,
        public mes: number = 0,
        public valor: number = 0,
        public usuarioTransacaoId: number = 0,
    ) {
        super();
    }
}
