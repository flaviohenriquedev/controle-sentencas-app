import tw from 'tailwind-styled-components'

interface Props {
    qtdColunas: number
}

export const Grid = tw.div<Props>`
    ${p => 'grid-cols-' + p.qtdColunas}
    
    grid
    
    grid-rows-1
    bg-blue-300
`
