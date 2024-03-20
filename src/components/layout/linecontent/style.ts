import tw from 'tailwind-styled-components'

interface Props {
    alignment?: "left" | "center" | "right"
    alignmentitem?: "start" | "center" | "end"
}

export const Container = tw.div<Props>`
    ${(p) => p.alignment === "left" ? "justify-start" :
    p.alignment === "center" ? "justify-center" :
        p.alignment === "right" ? "justify-end" : "justify-start"}
                                                        
    ${(p) => p.alignmentitem === "start" ? "items-start" :
    p.alignmentitem === "center" ? "items-center" :
        p.alignmentitem === "end" ? "items-end"
            : "items-end"}

    flex
    flex-wrap
    w-full
    mb-4
    gap-3
`
