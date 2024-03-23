'use client'

import * as S from './style'
import {RouteType} from "@/types/RouteType";
import {Menu} from "@/components/layout/sidemenu/Menu";
import {useContext, useEffect, useState} from "react";
import {SideMenuContext} from "@/context/app/SideMenuContext";
import {IoIosMenu} from "react-icons/io";
import {InputFilter} from "@/components/datainput/inputfilter/InputFilter";

interface Props {
    routes: RouteType[]
}

export function AppLayoutSideMenu({routes}: Props) {
    const {expanded, setExpanded} = useContext(SideMenuContext)
    const [searchMenu, setSearchMenu] = useState("");
    const [filteredData, setFilteredData] = useState<RouteType[]>(routes);
    
    useEffect(() => {
        const filterMenu = () => {
            const filteredMap: { [key: string]: RouteType } = {};
            
            if (routes) {
                routes.forEach((d) => {
                    const filteredMenu: RouteType = {...d};
                    if (
                        d.label
                            .toLowerCase()
                            .includes(searchMenu.toLowerCase()) ||
                        (d.submenu &&
                            d.submenu.some((sub) =>
                                sub.label
                                    .toLowerCase()
                                    .includes(searchMenu.toLowerCase())
                            ))
                    ) {
                        filteredMap[d.label] = filteredMenu;
                    }
                    
                    if (d.submenu) {
                        const filteredSubmenu = d.submenu.filter((sub) =>
                            sub.label
                                .toLowerCase()
                                .includes(searchMenu.toLowerCase())
                        );
                        if (filteredSubmenu.length > 0) {
                            filteredMenu.submenu = filteredSubmenu;
                            filteredMap[d.label] = filteredMenu;
                        }
                    }
                });
            }
            
            const filtered: RouteType[] = Object.values(filteredMap);
            setFilteredData(filtered);
        };
        
        filterMenu();
    }, [routes, searchMenu]);
    
    function renderMenu() {
        return filteredData.map((route) => {
            return (
                <Menu
                    key={route.label}
                    description={route.label && route.label}
                    icon={route.icon}
                    href={route.href}
                    submenu={route.submenu}
                />
            );
        });
    }
    
    return (
        <S.Sidemenu expandido={expanded.toString()}>
            <div className={`flex ${expanded ? 'justify-between' : 'justify-center'} items-center w-full p-2 mb-5`}>
                <InputFilter placeholder={`Buscar Menu`}
                             className={`${expanded ? 'block' : 'hidden'}`}
                             onChange={(e) => setSearchMenu(e.target.value)}/>
                <button onClick={() => setExpanded(!expanded)}
                        className={`flex justify-center items-center w-8 h-8 p-1 bg-base-100 text-base-content rounded-full`}>
                    <IoIosMenu size={25}/></button>
            </div>
            <div className={`flex flex-col gap-2`}>
                {renderMenu()}
            </div>
        </S.Sidemenu>
    )
}
