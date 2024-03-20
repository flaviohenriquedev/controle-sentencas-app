import * as S from "./style";
import {CommonInterface} from "@/interface/common-interface";

interface Props extends CommonInterface{
    classname?: string
}

export function TableContainer({children, classname}: Props) {
    return (
        <S.Table className={classname}>
            {children}
        </S.Table>
    )
}
