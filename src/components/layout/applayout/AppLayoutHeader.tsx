import * as S from './style'
import {DadosUsuarioLogado} from "@/components/datadisplay/avatar/DadosUsuarioLogado";
import {DadosCliente} from "@/components/datadisplay/cliente/DadosCliente";

export function AppLayoutHeader() {
    return (
        <S.Header>
            <DadosCliente/>
            <div className={`flex items-center h-full justify-end mr-4 gap-2`}>
                <DadosUsuarioLogado/>
            </div>
        </S.Header>
    )
}
