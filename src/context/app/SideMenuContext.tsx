"use client";

import React, {createContext, useState} from "react";

type SidemenuContextProps = {
    expanded: boolean;
    setExpanded: (value: boolean) => void;
    sideMenuEntered: boolean;
    setSideMenuEntered: (value: boolean) => void;
};

export const SideMenuContext = createContext<SidemenuContextProps>({
    expanded: true,
    setExpanded: () => {
    },
    sideMenuEntered: false,
    setSideMenuEntered: () => {
    },
});

export const SideMenuContextProvider = ({
                                            children,
                                        }: {
    children: React.ReactNode;
}) => {
    const [expanded, setExpanded] = useState(true);
    const [sideMenuEntered, setSideMenuEntered] = useState<boolean>(false);
    
    return (
        <SideMenuContext.Provider
            value={{
                expanded,
                setExpanded,
                sideMenuEntered,
                setSideMenuEntered
            }}
        >
            {children}
        </SideMenuContext.Provider>
    );
};
