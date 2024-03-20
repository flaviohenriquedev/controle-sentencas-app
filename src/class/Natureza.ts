import {EntidadePadrao} from "@/class/EntidadePadrao";

export class Natureza extends EntidadePadrao {
    constructor(
        public descricao: string = String(),
        public usuarioTransacaoId: number = Number(),
        public ativo: boolean = Boolean()
    ) {
        super()
    }
}
