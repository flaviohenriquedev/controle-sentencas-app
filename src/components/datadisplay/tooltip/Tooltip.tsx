import {CommonInterface} from "@/interface/common-interface";

interface Props extends CommonInterface {
    texto: string
}

export function Tooltip({children, texto}: Props) {
    return (
        <div className="lg:tooltip lg:tooltip-right lg:tooltip-secondary" data-tip={texto}>
            {children}
        </div>
    )
}
