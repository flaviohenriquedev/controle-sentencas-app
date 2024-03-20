import * as S from './style'

interface Props {
    value: string | number | boolean | JSX.Element | undefined | null
    alignment?: "left" | "center" | "right"
}

export function TableValue({value, alignment = "center"}: Props) {
    return (
        <S.Value>
            <S.ValueContent alignment={alignment}>
                {value}
            </S.ValueContent>
        </S.Value>
    )
}
