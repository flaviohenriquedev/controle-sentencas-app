import tw from 'tailwind-styled-components'

interface Props {
    temaselecionado?: string
}

export const Container = tw.div`
    
    relative
    w-full
    
    hover:cursor-pointer
`
export const Card = tw.div<Props>`
    ${p => p.temaselecionado === 'true' ? 'border-4 border-success' : ''}

    flex
    flex-col
    gap-1
    w-[10rem]
    h-[5.5rem]
    rounded-lg
    relative
    bg-base-100
`
