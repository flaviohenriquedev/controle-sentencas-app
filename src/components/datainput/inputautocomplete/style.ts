import tw from 'tailwind-styled-components'

interface Props {
    aberto?: string
}

export const ListContainer = tw.div<Props>`
    transition-max-h duration-100
    max-h-0
     ${(p) => (p.aberto === 'false' ? "max-h-0 invisible" : "max-h-72 p-2 mb-9")}
    
    text-[0.7rem]
    absolute
    flex
    flex-col
    w-full
    border-s
    border-base-300
    p-1
    rounded-sm
    bg-base-100
    shadow-md
    z-10
`

export const Input = tw.input`
    h-8
    input
    input-bordered
    input-xs
`
