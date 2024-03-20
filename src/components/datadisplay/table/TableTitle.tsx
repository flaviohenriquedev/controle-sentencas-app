import * as S from "./style";

interface Props {
    title: string
}

export function TableTitle({title} : Props) {
    return (
        <S.Title>
            {title}
        </S.Title>
    )
}
