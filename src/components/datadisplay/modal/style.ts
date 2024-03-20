import tw from 'tailwind-styled-components'
import {ScalaModalType} from "@/types/ScalaModalType";

interface Props {
    scalamodal?: ScalaModalType
}

export const Container = tw.dialog`
    fixed
    
    flex
    justify-center
    items-start
    w-screen
    h-screen
    top-0
    left-0
    right-0
    bottom-0
    backdrop-blur-sm
    bg-base-300/40
    invisible
    opacity-0
    px-4
    py-4
    
    transition-all
    duration-100

`

export const Children = tw.div<Props>`
    
    ${p => (
    p.scalamodal === 'scala70' ? 'w-[70%] h-auto' :
        p.scalamodal === 'scala80' ? 'w-[80%] h-auto' :
            p.scalamodal === 'full' ? 'w-full h-full' :
                p.scalamodal === 'auto' ? 'w-auto h-auto' : 'w-min-[30rem] h-auto'
)
}

    flex
    flex-col
    flex-nowrap
    items-center
    max-w-[90%]
    gap-2
    mb-10
    px-4
    py-2
    rounded-lg
    bg-base-100
    
    shadow-md
    shadow-base-200
`

export const Button = tw.div`

    flex
    items-center
    justify-center
    w-7
    h-7
    rounded-lg
    font-bold
    text-base-content
    
    hover:cursor-pointer
    hover:bg-base-200
`

export const Content = tw.div`
    overflow-y-scroll
    w-full
    h-full
    p-2
`

export const Footer = tw.footer`
    flex
    flex-1
    justify-end
    items-center
    gap-2
    w-full
`

export const Result = tw.div`
    flex
    justify-center
    w-full
    overflow-x-scroll
`
