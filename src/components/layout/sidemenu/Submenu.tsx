import React, {useEffect, useState} from "react";
import {usePathname, useRouter} from "next/navigation";
import * as S from "./style";
import {BsChevronDoubleDown} from 'react-icons/bs'
import {TbPointFilled} from "react-icons/tb";


interface SubMenuProps {
    description: string;
    children: React.ReactNode;
    href?: string;
}

export const SubMenu = ({
                            description,
                            children,
                            href,
                        }: SubMenuProps) => {
    const pathURL = usePathname()
    const route = useRouter();
    
    const [subMenuListClosed, setSubMenuListClosed] = useState(true);
    
    const [isSameURL, setIsSameURL] = useState<boolean>(false)
    
    useEffect(() => {
        setIsSameURL(pathURL === href)
    }, [pathURL, href]);
    
    
    function handleClick() {
        if (href) {
            route.push(href.startsWith("/") ? href : "/" + href);
        } else {
            setSubMenuListClosed(!subMenuListClosed);
        }
    }
    
    return (
        <S.SideMenuSubItemDescription onClick={() => handleClick()} issameurl={isSameURL.toString()}>
            <S.SideMenuSubItemIcon>
                {children ? <BsChevronDoubleDown color="base-100"/> :
                    <TbPointFilled className={`transition-all duration-300`} size={isSameURL ? 13 : 10}
                                   color='base-100'/>}
            
            </S.SideMenuSubItemIcon>
            <S.SideMenuSubItemTitle issameurl={isSameURL.toString()}>
                {children ? <strong>{description}</strong> : description}
            </S.SideMenuSubItemTitle>
        </S.SideMenuSubItemDescription>
    );
};
