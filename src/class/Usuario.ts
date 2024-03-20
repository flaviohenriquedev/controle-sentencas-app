import {EntidadePadrao} from "@/class/EntidadePadrao";

export class Usuario extends EntidadePadrao {
    constructor(
        public nome: string = '',
        public email: string = '',
        public usuarioTransacaoId: number = 0,
        public ativo: boolean = true
    ) {
        super()
    }
}
