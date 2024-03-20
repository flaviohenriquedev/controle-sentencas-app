import {EntidadePadrao} from "@/class/EntidadePadrao";

export class Comarca extends EntidadePadrao {
    constructor(
        public municipio: string = String(),
        public estado: string = String(),
        public descricao: string = String(),
        public tipo: string = String(),
        public usuarioTransacaoId: number = Number(),
        public ativo: boolean = Boolean()
    ) {
        super()
    }
}
