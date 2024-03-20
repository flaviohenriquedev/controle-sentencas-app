import {EntidadePadrao} from "@/class/EntidadePadrao";
import {Natureza} from "@/class/Natureza";
import {Comarca} from "@/class/Comarca";
import {Cliente} from "@/class/Cliente";
import {Advogado} from "@/class/Advogado";
import {Empresa} from "@/class/Empresa";

export class Processo extends EntidadePadrao {
    constructor(
        public numeroProcessoPrincipal: string = String(),
        public tipoProcessoPrincipal: string = String(),
        public dataIntimacao: string = String(),
        public dataSentenca: string = String(),
        public dataPagamentoProcessoPrincipal: string = String(),
        public dataInicioBeneficio: string = String(),
        public dataInicioPagamentoBeneficio: string = String(),
        public valorRendaMensalInicial: number = Number(),
        public observacoesProcessoPrincipal: string = String(),
        public numeroProcessoFilho: string = String(),
        public tipoProcessoFilho: string = String(),
        public dataPagamentoProcessoFilho: string = String(),
        public valorProcessoFilho: number = Number(),
        public valorHonorariosProcessoFilho: number = Number(),
        public banco: string = String(),
        public observacoesProcessoFilho: string = String(),
        public naturezaId: number = Number(),
        public clienteId: number = Number(),
        public empresaId: number = Number(),
        public advogadoId: number = Number(),
        public comarcaProcessoPrincipalId: number = Number(),
        public comarcaProcessoFilhoId: number = Number(),
        public usuarioTransacaoId: number = Number(),
        public processoPrincipalId: number = Number(),
        public natureza: Natureza = new Natureza(),
        public comarcaProcessoPrincipal: Comarca = new Comarca(),
        public comarcaProcessoFilho: Comarca = new Comarca(),
        public cliente: Cliente = new Cliente(),
        public empresa: Empresa = new Empresa(),
        public advogado: Advogado = new Advogado(),
    ) {
        super()
    }
}
