import {EntidadePadrao} from "@/class/EntidadePadrao";

export class Empresa extends EntidadePadrao {
    constructor(
        public cnpj: string = String(),
        public nome: string = String(),
        public usuarioTransacaoId: number = Number(),
        public ativo: boolean = Boolean()
    ) {
        super()
    }
}
