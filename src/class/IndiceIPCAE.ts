import {EntidadePadrao} from "@/class/EntidadePadrao";

export class IndiceIPCAE extends EntidadePadrao {
    constructor(
        public ano: number = 0,
        public mes: number = 0,
        public valor: number = 0,
        public usuarioTransacaoId: number = 0,
    ) {
        super();
    }
}
