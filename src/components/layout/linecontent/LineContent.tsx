import * as S from "./style";
import {HTMLAttributes, ReactNode} from "react";

interface LineContentProps extends HTMLAttributes<HTMLDivElement> {
    children: ReactNode;
    alignment?: "left" | "center" | "right";
    alignmentitem?: "start" | "center" | "end";
}

export function LineContent({id, children, alignment, alignmentitem, className}: LineContentProps) {
    return <S.Container id={id}
                        className={className}
                        alignment={alignment}
                        alignmentitem={alignmentitem}>{children}</S.Container>;
}
