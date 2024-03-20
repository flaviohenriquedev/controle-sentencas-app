import React, {ReactElement} from "react";

export interface Tab {
    label: string;
    component: ReactElement;
    condicaoRenderizar?: boolean
}
