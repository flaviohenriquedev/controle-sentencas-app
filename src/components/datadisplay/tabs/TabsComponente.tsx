'use client'

import React, {useEffect, useState} from 'react';
import {Tab} from "@/interface/tabs";

interface TabsProps {
    tabs: Tab[];
}

export function TabsComponente({tabs}: TabsProps) {
    const [activeTabIndex, setActiveTabIndex] = useState<number>(0);

    useEffect(() => {
        setActiveTabIndex(0)
    }, [tabs]);
    
    const handleTabClick = (index: number) => {
        setActiveTabIndex(index);
    };
    
    return (
        <div className={`flex flex-col gap-5`}>
            <div role="tablist" className="tabs tabs-boxed">
                {tabs.map((tab, index) => (
                    tab.condicaoRenderizar && (
                        <a key={index}
                           onClick={() => handleTabClick(index)}
                           role="tab"
                           className={`tab ${index === activeTabIndex ? 'tab-active' : ''}`}>
                            {tab.label}
                        </a>
                    )
                ))}
            </div>
            <div>{tabs[activeTabIndex].component}</div>
        </div>
    );
};
