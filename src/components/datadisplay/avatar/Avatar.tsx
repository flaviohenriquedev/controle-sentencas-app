'use client'

import {IoKeyOutline} from "react-icons/io5";
import {RxExit} from "react-icons/rx";
import {Modal} from "@/components/datadisplay/modal";
import {closeModal, openModal} from "@/functions/functions";
import React, {useState} from "react";
import {signOut} from "next-auth/react";
import {useRouter} from "next/navigation";
import {LineContent} from "@/components/layout/linecontent/LineContent";
import LabelContainer from "@/components/datainput/label/LabelContainer";
import {Input} from "@/components/datainput/input/Input";
import {Button} from "@/components/action/button/Button";
import {toast} from "react-hot-toast";
import {alterarSenhaUsuario} from "@/services";
import * as S from "@/components/datadisplay/avatar/style";

interface Props {
    nomeUsuario?: string
}

export const Avatar = ({nomeUsuario}: Props) => {
    
    const [senhaAtual, setSenhaAtual] = useState<string>('')
    const [novaSenha, setNovaSenha] = useState<string>('')
    const [confirmarNovaSenha, setConfirmarNovaSenha] = useState<string>('')
    
    const route = useRouter()
    
    function abrirModalAlterarSenha() {
        openModal('alterar_senha')
        setSenhaAtual('')
        setNovaSenha('')
        setConfirmarNovaSenha('')
    }
    
    const handleSubmitAlterarSenha = () => {
        if (!senhaAtual || !novaSenha || !confirmarNovaSenha) {
            return;
        }
        if (novaSenha !== confirmarNovaSenha) {
            toast.error("As novas senhas informadas são diferentes!");
        } else {
            alterarSenhaUsuario(senhaAtual, novaSenha)
                .then((response) => {
                    toast.success(response.data.mensagem);
                    closeModal(`alterar_senha`)
                })
                .catch((error) => {
                    toast.error(error.response.data.mensagem);
                });
        }
    };
    
    async function logout() {
        await signOut({redirect: false})
        route.replace("/")
    }
    
    return (
        <>
            <div className="flex items-center relative">
                
                <div className="dropdown dropdown-end">
                    <div className={`flex gap-2 items-center`}>
                        <label
                            tabIndex={0}
                            className="btn btn-ghost btn-circle avatar placeholder online bg-primary"
                        >
                            <S.AvatarContent>
                                <div className={`flex items-center justify-center w-full h-full`}>
                                    <h1>{nomeUsuario?.toUpperCase().substring(0, 2)}</h1>
                                </div>
                            </S.AvatarContent>
                        </label>
                    </div>
                    <div tabIndex={0}
                         className="dropdown-content z-[1] card card-compact w-64 bg-base-100 text-base-content shadow-sm border-2 border-base-200">
                        <div className="card-body">
                            <ul className={`flex flex-col`}
                            >
                                <div className={`flex flex-col`}>
                                    {/*<div*/}
                                    {/*    className={`flex gap-2 items-center p-2 rounded-lg hover:cursor-pointer hover:bg-base-200`}*/}
                                    {/*    onClick={() => openModal('seletor_de_temas')}>*/}
                                    {/*    <div>*/}
                                    {/*        <PiGear/>*/}
                                    {/*    </div>*/}
                                    {/*    <span>Configurações</span>*/}
                                    {/*</div>*/}
                                    
                                    {/*<div className="divider text-base-100"></div>*/}
                                    <div onClick={abrirModalAlterarSenha}
                                         className={`flex gap-2 items-center p-2 rounded-lg hover:cursor-pointer hover:bg-base-200`}>
                                        <div>
                                            <IoKeyOutline/>
                                        </div>
                                        <span>Alterar Senha</span>
                                    </div>
                                    <div onClick={logout}
                                         className={`flex gap-2 items-center p-2 rounded-lg hover:cursor-pointer hover:bg-base-200`}>
                                        <div>
                                            <RxExit/>
                                        </div>
                                        <span>Sair</span>
                                    </div>
                                </div>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            
            <Modal.Container id={`alterar_senha`}
                             title={`Alterar senha`}>
                <Modal.Content classname={`w-[30rem]`}>
                    <LineContent>
                        <LabelContainer title={`Senha atual`}>
                            <Input onChange={(e) => setSenhaAtual(e.target.value)} type={`password`}
                                   value={senhaAtual}
                                   typeof={`password`}
                                   autoComplete={`off`}/>
                        </LabelContainer>
                    </LineContent>
                    <div className="divider text-base-100"></div>
                    <LineContent>
                        <LabelContainer title={`Nova senha`}>
                            <Input onChange={(e) => setNovaSenha(e.target.value)} type={`password`}
                                   value={novaSenha}
                                   typeof={`password`}
                                   autoComplete={`off`}/>
                        </LabelContainer>
                    </LineContent>
                    <LineContent>
                        <LabelContainer title={`Confirmar nova senha`}>
                            <Input onChange={(e) => setConfirmarNovaSenha(e.target.value)} type={`password`}
                                   value={confirmarNovaSenha}
                                   typeof={`password`}
                                   autoComplete={`off`}/>
                        </LabelContainer>
                    </LineContent>
                    
                    <LineContent className={`mt-10`}>
                        <Button identifier={`Alterar`} className={`w-full`} onClick={handleSubmitAlterarSenha}/>
                    </LineContent>
                </Modal.Content>
            </Modal.Container>
        </>
    );
};
