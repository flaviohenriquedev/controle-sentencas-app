'use client'

import {useState} from "react";
import {LoginComponente} from "@/components/pages/auth/LoginComponente";
import {ForgotPasswordComponent} from "@/components/pages/auth/ForgotPasswordComponent";

export function AuthComponent() {
    const [loginOrForgotPass, setLoginOrForgotPass] = useState<boolean>(true)

    return (
        <div data-theme={`synthwave`}
             className={`flex items-center p-4 justify-center lg:justify-end bg-background-logn bg-no-repeat bg-cover w-screen h-screen`}>
            <div className={`lg:w-[50%] w-full h-full rounded-lg backdrop-blur-lg bg-white/10 text-white shadow-2xl`}>
                {loginOrForgotPass ? <LoginComponente loginOrForgotPass={loginOrForgotPass}
                                                      setLoginOrForgotPass={setLoginOrForgotPass}/> :
                    <ForgotPasswordComponent loginOrForgotPass={loginOrForgotPass}
                                             setLoginOrForgotPass={setLoginOrForgotPass}/>}
            </div>
        </div>
    )
}
