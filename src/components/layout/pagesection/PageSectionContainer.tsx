'use client'

import React, {useEffect, useState} from "react";
import * as S from './style'
import {Modal} from "@/components/datadisplay/modal";
import {closeModal, openModal} from "@/functions/functions";
import {EntidadePadrao} from "@/class/EntidadePadrao";
import {CommonInterface} from "@/interface/common-interface";
import {Button} from "@/components/action/button/Button";

interface Props<T extends EntidadePadrao> extends CommonInterface {
    acaoExecutada?: string
    titulo?: string
    tituloComponenteCadastro?: string
    clearModal?: () => void
    funcaoNovoCadastro?: () => void
    funcaoSalvarCadastro?: (entidade: T) => void
    funcaoEditarCadastro?: (entidade: T) => void
    componenteCadastro?: React.ReactElement
    entidade?: T
    scalamodal?: 'auto' | 'full'
    totalDeRegistros?: number
}

export function PageSectionContainer({
                                         children,
                                         acaoExecutada,
                                         titulo,
                                         tituloComponenteCadastro,
                                         funcaoNovoCadastro,
                                         funcaoSalvarCadastro,
                                         componenteCadastro,
                                         entidade,
                                         clearModal,
                                         scalamodal,
                                         totalDeRegistros
                                     }: Props<any>) {
    const [idModal, setIdModal] = useState<string>('')
    
    useEffect(() => {
        setIdModal(`mdl_register_${Math.random()}`)
    }, [componenteCadastro]);
    
    function handleNovoCadastro() {
        if (funcaoNovoCadastro) {
            funcaoNovoCadastro()
        }
        openModal(idModal)
    }
    
    useEffect(() => {
        if (entidade && entidade.id && (acaoExecutada === 'selecionar' || acaoExecutada === 'editar')) {
            openModal(idModal)
        }
    }, [entidade, acaoExecutada, idModal]);
    
    async function handleSalvarCadastro() {
        if (funcaoSalvarCadastro) {
            await funcaoSalvarCadastro(entidade)
        }
        clearModal && clearModal()
        closeModal(idModal)
    }
    
    return (
        <>
            <S.Container>
                {titulo && (
                    <S.Header>
                        <S.Label>
                            {titulo}
                            {totalDeRegistros && totalDeRegistros > 0 ? ' | ' + totalDeRegistros + (totalDeRegistros > 1 ? ' registros' : ' registro') : null}
                        </S.Label>

                        <S.Botao tipo={`novo`}
                                 onClick={handleNovoCadastro}
                                 className={`w-52`}>
                            Novo Cadastro
                        </S.Botao>
                    </S.Header>
                )}
                {children}
            </S.Container>
            
            <Modal.Container id={idModal}
                             title={tituloComponenteCadastro}
                             clearModal={clearModal}
                             scalamodal={scalamodal}>
                <Modal.Content>
                    {componenteCadastro}
                </Modal.Content>
                
                <Modal.Footer>
                    <Button identifier={`Salvar`} onClick={handleSalvarCadastro}/>
                </Modal.Footer>
            </Modal.Container>
        </>
    )
}
