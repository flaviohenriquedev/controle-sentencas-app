import * as S from './style'
import {CommonInterface} from "@/interface/common-interface";

interface TableBodyProps extends CommonInterface{
    classname?: string
}

export function TableBody({children, classname}: TableBodyProps) {
    return (
        <S.Body className={classname}>
            {children}
        </S.Body>
    )
}
