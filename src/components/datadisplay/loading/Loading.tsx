interface Props {
    tamanho?: string
}

export function Loading({tamanho} : Props) {
    return (
        <div
            className={`flex items-center justify-center w-full h-full backdrop-blur-sm bg-base-200/20`}>
            <span className={`loading loading-bars ${tamanho ? tamanho === 'sm' ? 'loading-sm' : 'loading-lg' : 'loading-lg'}`}></span>
        </div>
    )
}
