import tw from "tailwind-styled-components";

interface Props {
    closed?: string;
    expanded?: string;
    issameurl?: string
}

export const SideMenuItem = tw.li<Props>`
    
    ${(p) => p.expanded === 'false' || p.issameurl === 'true' ? "bg-base-100/50" : ""}
    flex
    flex-col
    flex-nowrap
    relative
    rounded-md
    mx-2
`;

export const SideMenuItemHeader = tw.h2<Props>`
    transition-all
    duration-200
    ease-in-out
    ${p => p.issameurl === 'true' ? 'bg-base-200/50 text-primary' : ''}
    w-full
    h-8
    flex
    justify-between
    items-center
    rounded-md
    
    hover:bg-base-200
    hover:cursor-pointer
`;

export const IconContainer = tw.div`
    flex
    justify-center
    items-center
    max-w-[4rem]
    min-w-[4rem]
`;

export const ExpandIcon = tw.div<Props>`

    ${(p) => p.expanded === 'false' ? "-rotate-180 " : ""}
    
    flex
    items-center
    justify-center
    mr-2
    
    transition-all
    duration-300
`

export const DescriptionContainer = tw.div<Props>`
    ${(p) => (p.expanded === 'true' ? "" : "text-[0]")}
    ${p => p.issameurl === 'true' ? 'translate-x-1 text-primary' : ''}
    
    transition-all
    ease-in-out
`;

export const SideMenuSubList = tw.ul<Props>`
    transition-max-h duration-300
    max-h-0 overflow-hidden
    ${(p) => (p.closed === 'true' ? "max-h-0" : "max-h-screen")}
    ml-4
`;

export const SideMenuSubItemDescription = tw.li<Props>`
    transition-all
    duration-200
    ease-in-out
    ${p => p.issameurl === 'true' ? 'bg-base-200/60' : ''}
    group
    
    text-[0.9em]
   
    flex
    my-1
    mx-[0.4rem]
    pl-6
    py-1
    rounded-lg
    items-center
    hover:cursor-pointer
    hover:bg-base-200
`;

export const SideMenuSubItemIcon = tw.h4`
    mr-2
    transition-all
    duration-200
    ease-in-out
    group-active:translate-x-2
`;

export const SideMenuSubItemTitle = tw.div<Props>`
    ${p => p.issameurl === 'true' ? 'translate-x-1 text-primary' : ''}
    
    transition-all
    duration-200
    ease-in-out
`
