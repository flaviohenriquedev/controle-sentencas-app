'use client'

import Image from "next/image";
import Logo from "../../../../public/logo.png";
import * as S from "./style"
import {useRouter} from "next/navigation";

export function DadosCliente() {
    const route = useRouter()
    
    const classLogo = `
        transition-all
        duration-200
        
        rounded-full
        border-2
    
        hover:border-primary
        hover:bg-base-200
        hover:cursor-pointer
    `
    
    return (
        <S.LogoContainer>
            <div className={classLogo}>
                <Image src={Logo}
                       alt="logo"
                       id="logo"
                       width={40}
                       height={40}
                       onClick={() => route.push('/manager')}/>
            </div>
            <S.Descricao>
                Stabile & Pessoa Advogados Associados
            </S.Descricao>
        </S.LogoContainer>
    )
}
