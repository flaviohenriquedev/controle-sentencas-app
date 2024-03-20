import tw from 'tailwind-styled-components'

export const Container = tw.div`
    flex
    bg-gray-100
    justify-center
    items-center
    h-screen
`

export const Image = tw.div`
    w-1/2
    h-screen
    hidden
    bg-primary
    flex
    items-center
    justify-center
`
export const InputLogin = tw.input`
    text-[1rem]

    h-8
    input
    input-bordered
    input-xs
`
