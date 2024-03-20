import React from "react";

export interface CommonInterface {
    children: React.ReactNode
}

export interface SelectItem {
    label?: string;
    value: any;
    styleClass?: string;
    icon?: string;
    title?: string;
    disabled?: boolean;
}
