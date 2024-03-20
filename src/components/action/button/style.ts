import tw from 'tailwind-styled-components'
import {ButtonClass} from "@/types/BbuttonType";

type Props = {
    classbutton: ButtonClass
}

export const ButtonStyle = tw.button<Props>`

    ${p =>
    p.classbutton === 'info' ? 'btn-info'
        : p.classbutton === 'success' ? 'btn-success'
            : p.classbutton === 'warning' ? 'btn-warning'
                : p.classbutton === 'error' ? 'btn-error'
                    : 'bg-info text-info-content'}

    btn
    flex
    items-center
    justify-center
    max-h-[2.2rem]
    min-h-[2.2rem]
    rounded-lg
    min-w-[8rem]
`
