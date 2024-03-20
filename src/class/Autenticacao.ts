import {Usuario} from "@/class/Usuario";

export class Autenticacao {
    constructor(
        public usuario: Usuario = new Usuario(),
        public token: string = String(),
        public expira: number = Number(),
        public nomeUsuario: string = String()
    ) {
    }
}
