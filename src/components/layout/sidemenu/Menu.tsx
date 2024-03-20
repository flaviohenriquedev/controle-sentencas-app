'use client'

import {RouteType} from "@/types/RouteType";
import {usePathname, useRouter} from "next/navigation";
import {useContext, useEffect, useState} from "react";
import {SubMenu} from "@/components/layout/sidemenu/Submenu";
import * as S from './style'
import {SideMenuContext} from "@/context/app/SideMenuContext";
import {MdExpandMore} from "react-icons/md";
import {Tooltip} from "@/components/datadisplay/tooltip/Tooltip";

interface Props {
    submenu?: RouteType[]
    description: string;
    icon?: JSX.Element;
    href?: string;
}

export function Menu({submenu, href, icon, description}: Props) {
    
    const pathURL = usePathname()
    const route = useRouter();
    const [menuListClosed, setMenuListClosed] = useState(true);
    const {expanded, sideMenuEntered, setExpanded} = useContext(SideMenuContext)
    
    const [isSameURL, setIsSameURL] = useState<boolean>(false)
    
    useEffect(() => {
        setIsSameURL(pathURL === href)
    }, [pathURL, href]);
    
    function renderSubMenuItem(routes: RouteType[]) {
        return routes.map((route) => (
            <SubMenu
                key={route.label}
                description={route.label}
                href={route.href}
            >
                {route.submenu && renderSubMenuItem(route.submenu)}
            </SubMenu>
        ));
    }
    
    function handleClick() {
        if (submenu) {
            setMenuListClosed(!menuListClosed);
        } else if (href) {
            route.push(
                href.startsWith("/") ? href : "/" + href
            );
        }
        
        if (!expanded) {
            setExpanded(true)
        }
    }
    
    return (
        <S.SideMenuItem expanded={menuListClosed.toString()} id="side_menu_item" issameurl={isSameURL.toString()}>
            <S.SideMenuItemHeader id="side_menu_item_header"
                                  onClick={() => handleClick()}
                                  expanded={menuListClosed.toString()}
                                  issameurl={isSameURL.toString()}>
                <div className={`flex justify-center items-center group`}>
                    {expanded ? (
                        <S.IconContainer id="side_menu_icon">{icon}</S.IconContainer>
                    ) : (
                        <Tooltip texto={description}>
                            <S.IconContainer id="side_menu_icon">{icon}</S.IconContainer>
                        </Tooltip>
                    )}
                    <S.DescriptionContainer expanded={expanded.toString() || sideMenuEntered.toString()}
                                            issameurl={isSameURL.toString()}>
                        {description}
                    </S.DescriptionContainer>
                </div>
                {(expanded || sideMenuEntered) && submenu && submenu.length > 0 && (
                    <S.ExpandIcon expanded={menuListClosed.toString()}>
                        <MdExpandMore/>
                    </S.ExpandIcon>
                )}
            </S.SideMenuItemHeader>
            
            {submenu && (expanded || sideMenuEntered) && (
                <S.SideMenuSubList closed={menuListClosed.toString()}>
                    {renderSubMenuItem(submenu)}
                </S.SideMenuSubList>
            )}
        </S.SideMenuItem>
    );
}
