import React, {HTMLAttributes, ReactNode} from "react";
import * as S from './style'
import {closeModal} from "@/functions/functions";
import {IoMdClose} from "react-icons/io";
import {ScalaModalType} from "@/types/ScalaModalType";


interface ModalRootProps extends HTMLAttributes<HTMLInputElement> {
    id: string
    children: ReactNode
    title?: string
    clearModal?: () => void
    scalamodal?: ScalaModalType
}


export function ModalContainer({id, children, title, clearModal, className, scalamodal}: ModalRootProps) {
    function handleCloseModal() {
        closeModal(id);
        
        setTimeout(() => {
            clearModal && clearModal();
        }, 100);
    }
    
    return (
        <S.Container id={`mdl_ctn_${id}`}>
            <S.Children scalamodal={scalamodal}>
                <div
                    className="flex justify-between items-center w-full rounded-lg px-2 flex-nowrap">
                    <div className="flex justify-start w-full text-[1rem]">
                        {title}
                    </div>
                    <div className="flex items-center justify-end w-auto h-10 gap-2"
                    >
                        <S.Button onClick={() => handleCloseModal()}>
                            <IoMdClose size={15}/>
                        </S.Button>
                    </div>
                </div>
                {children}
            </S.Children>
        </S.Container>
    )
}
