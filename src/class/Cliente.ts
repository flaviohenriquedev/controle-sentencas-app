import {EntidadePadrao} from "@/class/EntidadePadrao";

export class Cliente extends EntidadePadrao {
    constructor(
        public nome: string = String(),
        public cpf: string = String(),
        public usuarioTransacaoId: number = Number()
    ) {
        super()
    }
}
