import {EntidadePadrao} from "@/class/EntidadePadrao";

export class Andamento extends EntidadePadrao {
    constructor(
        public descricao: string = String(),
        public usuarioTransacaoId: number = Number(),
        public ativo: boolean = Boolean()
    ) {
        super()
    }
}
