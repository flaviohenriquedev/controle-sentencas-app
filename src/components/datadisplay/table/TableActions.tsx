import * as S from './style'
import {AiFillDelete} from "react-icons/ai";
import {closeModal, openModal} from "@/functions/functions";
import {FaEdit} from "react-icons/fa";
import {BiSolidShow} from "react-icons/bi";
import {GoArrowSwitch} from "react-icons/go";
import {Modal} from "@/components/datadisplay/modal";
import {LineContent} from "@/components/layout/linecontent/LineContent";
import {Button} from "@/components/action/button/Button";


interface Props<T> {
    metodoExcluir?: (valor: number) => void
    metodoEditar?: (objeto: any) => void | undefined
    metodoSelecionar?: (valor: any) => void | undefined
    objeto: any
    alignment?: "left" | "center" | "right"
    acaopersonalizada?: (valor: any) => void
}

export function TableActions({
                                 metodoExcluir,
                                 metodoEditar,
                                 metodoSelecionar,
                                 objeto,
                                 alignment = "center",
                                 acaopersonalizada
                             }: Props<any>) {
    
    const modalId = `confirmar_exclusao_${objeto.id}`
    
    function handleExcluirRegistro(id: number) {
        metodoExcluir && metodoExcluir(id)
        closeModal(modalId)
    }
    
    return (
        <>
            <S.Value>
                <div className={`flex justify-center gap-5`}>
                    {acaopersonalizada && (
                        <S.ValueContent onClick={acaopersonalizada} alignment={alignment}
                                        className={`text-success hover:cursor-pointer`}>
                            <GoArrowSwitch size={17}/>
                        </S.ValueContent>
                    )}
                    
                    {metodoSelecionar && (
                        <S.ValueContent onClick={metodoSelecionar} alignment={alignment}
                                        className={`text-info hover:cursor-pointer`}>
                            <BiSolidShow size={17}/>
                        </S.ValueContent>
                    )}
                    
                    {metodoEditar && (
                        <S.ValueContent onClick={metodoEditar} alignment={alignment}
                                        className={`text-warning hover:cursor-pointer`}>
                            <FaEdit size={17}/>
                        </S.ValueContent>
                    )}
                    
                    {metodoExcluir && (
                        <S.ValueContent onClick={() => openModal(modalId)} alignment={alignment}
                                        className={`text-error hover:cursor-pointer`}>
                            <AiFillDelete size={17}/>
                        </S.ValueContent>
                    )}
                </div>
            </S.Value>
            
            <Modal.Container id={modalId} title={`ATENÇÃO`}>
                <Modal.Content>
                    <LineContent>
                        <label>TEM CERTEZA QUE DESEJA EXCLUIR ESSE REGISTRO?</label>
                    </LineContent>
                </Modal.Content>
                <Modal.Footer>
                    <LineContent alignment={`center`}>
                        <Button identifier={`Sim`} onClick={() => handleExcluirRegistro(objeto.id)}/>
                        <Button identifier={`Não`} onClick={() => closeModal(modalId)} classbutton={`warning`}/>
                    </LineContent>
                </Modal.Footer>
            </Modal.Container>
        </>
    )
}
