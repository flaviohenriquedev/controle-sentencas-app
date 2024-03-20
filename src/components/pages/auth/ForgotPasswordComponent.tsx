'use client'


import LabelContainer from "@/components/datainput/label/LabelContainer";
import {LineContent} from "@/components/layout/linecontent/LineContent";
import {Button} from "@/components/action/button/Button";
import {SyntheticEvent, useState} from "react";
import {forgotPassword} from "@/services";
import {toast} from "react-hot-toast";
import * as S from './style'

interface Props {
    loginOrForgotPass: boolean
    setLoginOrForgotPass: (valor: boolean) => void
}

export function ForgotPasswordComponent(props: Props) {
    const [email, setEmail] = useState<string>('')
    
    function handleSubmitForgotPassword(e: SyntheticEvent) {
        e.preventDefault()
        
        forgotPassword(email)
            .then((response) => {
                return toast.success(response.data);
            })
            .catch((error) => {
                return toast.error(error.response.data);
            });
    }
    
    return (
        <form className={`w-full h-full  p-10`}>
            <div className={`flex items-center justify-center w-full h-full`}>
                <div className={`w-full`}>
                    <LineContent>
                        <LineContent>
                            <h1 className={`font-bold text-[2.5rem]`}>Esqueceu sua senha?</h1>
                        </LineContent>
                    </LineContent>
                    
                    <LineContent>
                        <p>Sem problemas! Informe o email cadastrado para que possamos enviar as instruções de
                            recuperação.</p>
                    </LineContent>
                    
                    <LineContent>
                        <LabelContainer>
                            <S.InputLogin className={`h-12`} type={`email`}
                                          onChange={(e) => setEmail(e.target.value)}/>
                        </LabelContainer>
                    </LineContent>
                    <LineContent alignment={`right`}>
                        <label onClick={() => props.setLoginOrForgotPass(!props.loginOrForgotPass)}
                               className={`hover:text-primary hover:cursor-pointer`}>
                            Voltar para Login
                        </label>
                    </LineContent>
                    <LineContent>
                        <Button identifier={`Enviar`} className={`w-full`} classbutton={`warning`}
                                onClick={handleSubmitForgotPassword}/>
                    </LineContent>
                </div>
            </div>
        </form>
    )
}
