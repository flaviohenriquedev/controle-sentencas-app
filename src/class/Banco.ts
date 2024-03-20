import {EntidadePadrao} from "./EntidadePadrao";

export class Banco extends EntidadePadrao {
    constructor(
        public codigo: string = String(),
        public nome: string = String(),
        public usuarioTransacaoId: number = Number(),
    ) {
        super();
    }
}
