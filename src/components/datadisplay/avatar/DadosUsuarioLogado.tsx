import {getServerSession} from "next-auth";
import {nextAuthOptions} from "@/app/api/auth/[...nextauth]/options";
import SeletorDeTemas from "@/components/datadisplay/temas/SeletorDeTemas";
import {Avatar} from "@/components/datadisplay/avatar/Avatar";

export async function DadosUsuarioLogado() {
    const session = await getServerSession(nextAuthOptions)
    
    return (
        <div className={`flex items-center gap-2 w-full h-full`}>
            <SeletorDeTemas/>
            <span
                className={`flex items-center justify-end w-auto min-w-[6rem] flex-nowrap`}>{`Olá ${session?.user.nomeUsuario ? session.user.nomeUsuario : ', seja bem vindo.'}`}</span>
            
            <Avatar nomeUsuario={session?.user.nomeUsuario ? session.user.nomeUsuario : 'Usuario'}/>
        </div>
    )
}
