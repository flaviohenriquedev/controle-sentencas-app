import {EntidadePadrao} from "@/class/EntidadePadrao";

export class AliquotaINSS extends EntidadePadrao {
    constructor(
        public ano: number = Number(),
        public mes: number = Number(),
        public aliquota: number = Number(),
        public faixa: number = Number(),
        public teto: number = Number(),
        public tetoCooperativa: number = Number(),
        public usuarioTransacaoId: number = Number(),
    ) {
        super();
    }
}
