'use client'

import {Theme} from "@/types/Theme";
import {Themes} from "@/data/Themes";
import {useCallback, useEffect, useState} from "react";
import {RadioTema} from "@/components/datadisplay/temas/RadioTema";
import {IoIosArrowBack, IoIosArrowForward} from "react-icons/io";


export default function SeletorDeTemas() {
    const [temas, setTemas] = useState<Theme[]>(Themes);
    const [mostrarTemas, setMostrarTemas] = useState<boolean>(false)
    const [mouseEnter, setMouseEnter] = useState<boolean>(false)
    
    function renderThemes() {
        const temasOrdenados: Theme[] = temas.slice().sort((a, b) => {
            if (a.type < b.type) return -1;
            if (a.type > b.type) return 1;
            return 0;
        });
        
        return (temasOrdenados && temasOrdenados.map((tm, i) => (
            <RadioTema key={i} tema={tm.value}/>
        )))
    }
    
    const handleMostrarTemas = useCallback(() => {
        setMostrarTemas(!mostrarTemas)
    }, [mostrarTemas])
    
    useEffect(() => {
        let timeout: any;
        if (mostrarTemas && !mouseEnter) {
            timeout = setTimeout(() => {
                handleMostrarTemas();
            }, 2000);
        }
        
        return () => clearTimeout(timeout);
    }, [handleMostrarTemas, mostrarTemas, mouseEnter]);
    
    return (
        <>
            <div
                className={`flex h-[2rem] px-2 items-center justify-center hover:cursor-pointer border-r border-base-content`}
                onClick={handleMostrarTemas}>
                {mostrarTemas ? <IoIosArrowForward/> : <IoIosArrowBack/>}
            </div>
            <div onMouseEnter={() => setMouseEnter(true)}
                 onMouseLeave={() => setMouseEnter(false)}
                 className={`
                    overflow-hidden
                    ${mostrarTemas ? 'max-w-2xl px-2' : 'max-w-0'}
                    flex
                    items-center
                    h-[3rem]
                    gap-2
                    flex-nowrap
                    transition-max-w duration-500
                `}>
                {renderThemes()}
            
            </div>
        
        </>
    )
}
