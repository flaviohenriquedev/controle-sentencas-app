'use client'

import {useTheme} from "next-themes";
import {useEffect, useState} from "react";

interface Props {
    tema: string
}

export function RadioTema({tema}: Props) {
    const {setTheme, theme} = useTheme();
    const [temaSelecionado, setTemaSelecionado] = useState<boolean>(false)
    const [isHover, setIsHover] = useState<boolean>(false)
    
    useEffect(() => {
        setTemaSelecionado(tema === theme)
    }, [tema, theme]);
    
    function handleSelecionarTema(tema: string) {
        setTheme(tema)
        setTemaSelecionado(true)
    }
    
    return (
        <div data-theme={tema}
             className={`
                    flex
                    items-center
                    justify-center
                    rounded-full
                    p-1
                    bg-base-100
                    w-auto
                    h-auto
                    hover:cursor-pointer
                    border-2
                    transition-all
                    duration-300
                    ${temaSelecionado ? 'border-primary scale-125' : 'border-base-200'}
                 `}
             onClick={() => handleSelecionarTema(tema)}>
            <div className={`w-3 h-3 rounded-full bg-primary`}>
            </div>
        </div>
    )
}
