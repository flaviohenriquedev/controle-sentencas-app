import {EntidadePadrao} from "@/class/EntidadePadrao";

export class Advogado extends EntidadePadrao {
    constructor(
        public nome: string = String(),
        public usuarioTransacaoId: number = Number()
    ) {
        super()
    }
}
