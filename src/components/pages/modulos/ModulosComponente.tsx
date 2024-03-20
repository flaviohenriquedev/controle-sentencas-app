'use client'

import {Modulos as modulos} from "@/data/routes";
import {ModuloType} from "@/types/ModuloType";
import {useRouter} from "next/navigation";
import * as S from './style'

export function ModulosComponente() {
    const route = useRouter()
    
    function handleClick(modulo: ModuloType) {
        if (modulo.ativo) {
            return route.replace(modulo.rota ? modulo.rota : '#')
        } else {
            return null
        }
    }

    function renderModulos() {
        return modulos.map(m => {
            return (
                <S.GridContent key={m.label}>
                    <S.Card disable={m.ativo.toString()}>
                        <S.Icon disable={m.ativo.toString()}>{m.icone}</S.Icon>
                        <S.DescriptionContainer>
                            <S.Description
                                disable={m.ativo.toString()}
                                id="module_card_description"
                                onClick={() => handleClick(m)}
                            >
                                {m.label}
                            </S.Description>
                        </S.DescriptionContainer>
                    </S.Card>
                </S.GridContent>
            )
        })
    }

    return (
        <S.Container className={`pt-[6rem]`}>
            <S.Grid className={`grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4`}>
                {renderModulos()}
            </S.Grid>
        </S.Container>
    )
}
