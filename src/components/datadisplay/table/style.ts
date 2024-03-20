import tw from 'tailwind-styled-components'

interface Props {
    alignment?: "left" | "center" | "right"
    selecionarvalor?: string
}

export const Table = tw.table`
    text-[0.7rem]

    bg-base-100
    w-full
    border
    border-base-300
    rounded-lg
    overflow-auto
`

export const Header = tw.thead`
    bg-base-200
    h-9
    text-[0.8rem]
    font-bold
`

export const Body = tw.tbody`

`

export const Footer = tw.tfoot`

`

export const Row = tw.tr<Props>`
    ${p => p.selecionarvalor === 'true' ? 'hover:cursor-pointer' : ''}
    group
    h-7
    rounded-lg
`

export const Title = tw.th`
    text-base-content
    border-2
    border-base-100
    h-6
`

export const Value = tw.td`
    px-2
    border
    border-base-200
    
    group-hover:bg-base-300
    group-hover:text-base-content
`

export const ValueContent = tw.div<Props>`
        ${(p) =>
    p.alignment === "left" ? "justify-start" :
        p.alignment === "center" ? "justify-center" :
            p.alignment === "right" ? "justify-end" : "justify-start"}
        
    flex
`
