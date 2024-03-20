import tw from 'tailwind-styled-components'

type Props = {
    tipo?: 'salvar' | 'cancelar' | 'novo'
    aberto?: string
}

export const Container = tw.section`
    w-full
    min-h-full
    pl-1
`

export const Header = tw.label`

    flex
    items-center
    w-full
    mb-[0.3rem]
    gap-2
`

export const Label = tw.label`
    flex
    items-center
    p-2
    bg-primary
    text-primary-content
    w-full
    max-h-[3rem]
    rounded-md
    font-bold
`

export const Botao = tw.div<Props>`
    
    ${(p) => (p.tipo === 'novo' ? 'bg-info text-info-content' :
    p.tipo === 'salvar' ? 'bg-success text-success-content' :
        p.tipo === 'cancelar' ? 'bg-warning text-warning-content' :
            'bg-info text-info-content')}

    text-center
    p-2
    rounded-md
    max-h-[3rem]
    hover:cursor-pointer
`
