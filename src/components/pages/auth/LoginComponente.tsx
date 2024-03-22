'use client'

import LabelContainer from "@/components/datainput/label/LabelContainer";
import {LineContent} from "@/components/layout/linecontent/LineContent";
import {Button} from "@/components/action/button/Button";
import {useRouter} from "next/navigation";
import {SyntheticEvent, useState} from "react";
import {signIn} from "next-auth/react";
import {toast} from "react-hot-toast";
import * as S from './style'

interface Props {
    loginOrForgotPass: boolean
    setLoginOrForgotPass: (valor: boolean) => void
}

export function LoginComponente({loginOrForgotPass, setLoginOrForgotPass}: Props) {
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    
    const route = useRouter()
    
    async function handleSubmit(event: SyntheticEvent) {
        event.preventDefault()
        
        const result = await signIn('credentials', {
            email,
            password,
            redirect: false
        })
        if (result?.error) {
            return toast.error('Usuário e/ou Senha incorretos.')
        }
        route.replace("/manager")
    }
    
    return (
        <form className={`w-full h-full p-10`}>
            <div className={`flex items-center justify-center w-full h-full `}>
                <div className={`w-full bg-transparent`}>
                    <LineContent>
                        <LineContent>
                            <h1 className={`font-bold text-[2.5rem]`}>Login</h1>
                        </LineContent>
                    </LineContent>
                    
                    <LineContent>
                        <LabelContainer title={`Email`}>
                            <S.InputLogin className={`h-12`}
                                          type={`email`}
                                          onChange={(e) => setEmail(e.target.value)}/>
                        </LabelContainer>
                    </LineContent>
                    
                    <LineContent>
                        <LabelContainer title={`Senha`}>
                            <S.InputLogin className={`h-12`}
                                          type={`password`}
                                          onChange={(e) => setPassword(e.target.value)}/>
                        </LabelContainer>
                    </LineContent>
                    <LineContent alignment={`right`}>
                        <label onClick={() => setLoginOrForgotPass(!loginOrForgotPass)}
                               className={`hover:text-info hover:cursor-pointer`}>
                            Esqueci minha senha
                        </label>
                    </LineContent>
                    <LineContent>
                        <Button identifier={`Entrar`} className={`w-full`} onClick={handleSubmit}/>
                    </LineContent>
                </div>
            </div>
        </form>
    )
}
