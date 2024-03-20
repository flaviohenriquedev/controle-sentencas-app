import * as S from './style'
import {TbReportAnalytics} from "react-icons/tb";


interface Props {
    descricao: string
    action?: () => void
}

export function GerarRelatorioComponent({descricao, action}: Props) {
    return (
        <S.Container onClick={action}>
            <TbReportAnalytics size={50}/>
            {descricao}
        </S.Container>
    )
}
