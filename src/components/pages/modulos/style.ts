import tw from 'tailwind-styled-components'

interface Props {
    disable?: string
}

export const Container = tw.div`
    flex
    justify-start
    px-4
    gap-2
    h-auto
    w-full
    -z-1
`

export const Grid = tw.div`
    grid
    
    sm: grid-cols-1
    md: grid-cols-2
    lg: grid-cols-4
    
    w-full

`

export const GridContent = tw.div`
    flex
    items-center
    justify-center
    p-10
    w-auto
    h-auto
`

export const Card = tw.div<Props>`
    ${p => p.disable === 'false'
        ? ` bg-primary/30
            text-base-100/30`
        : ` group
            
            bg-primary
            text-base-100
            hover:text-primary-content
            hover:cursor-pointer`}
    
    relative
    flex
    items-center
    w-60
    h-24
    rounded-lg
    shadow-lg
`

export const Icon = tw.div<Props>`
    ${p => p.disable === 'false'
        ? ` bg-primary/30
            text-base-100/30`
        : ` transition-all
            duration-300
            group-hover:-translate-x-2`}
    absolute
    flex
    justify-start
    items-center
    h-full
    w-full
    rounded-tl-lg
    rounded-bl-lg
    py-3
    px-4
`;

export const DescriptionContainer = tw.div`
    flex
    items-center
    justify-end
    h-full
    w-full
`;

export const Description = tw.div<Props>`
    ${p => p.disable === 'false'
        ? ` bg-primary/30
            text-base-100/30`

        : ` backdrop-brightness-110
            bg-primary/30
            active:-scale-1`}
                
    flex
    items-center
    h-full
    w-48
    pl-4
    shadow-xl
    rounded-lg
    backdrop-blur-sm
    
    absolute
    text-xl
`;
