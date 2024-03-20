import {EntidadePadrao} from "@/class/EntidadePadrao";
import {Andamento} from "@/class/Andamento";

export class Despacho extends EntidadePadrao {
    constructor(
        public dataDespacho: string = String(),
        public observacao: string = String(),
        public dataValidade: string = String(),
        public processoId: number = Number(),
        public andamentoId: number = Number(),
        public usuarioTransacaoId: number = Number(),
        public andamento: Andamento = new Andamento(),
    ) {
        super();
    }
}
