import tw from 'tailwind-styled-components'

type Props = {
    expandido?: string
}

export const Container = tw.div`
    flex
    flex-col
    w-full
    h-screen
`

export const Content = tw.div`
    flex
    
    pt-[4rem]
    w-full
    h-full
`

export const Header = tw.header`
    fixed
    
    justify-between
    items-center
    flex
    w-full
    min-h-[3.5rem]
    max-h-[3.5rem]
    bg-base-100
    border-b
    border-base-300
    shadow-sm
    px-3
    z-10
`


export const Sidemenu = tw.aside<Props>`
    ${p => p.expandido === 'true' ? 'min-w-[15rem]' : 'min-w-[4rem]'}
    
    fixed
    
    flex
    flex-col
    h-full
    gap-3
    bg-base-100
    rounded-lg
    border-2
    border-base-200
    shadow-sm
`

export const Children = tw.div<Props>`
    ${p => p.expandido === 'true' ? 'ml-[15rem]' : 'ml-[5rem]'}

    w-full
    h-full
    px-2
    overflow-y-scroll
    scrollbar-thin
    scrollbar-thumb-secondary
    transition-all
    duration-200
`
