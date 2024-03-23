interface Props {
    tamanho?: 'sm'
    tipo?: 'dots' | 'bars' | 'infinity'
}

export function Loading({tamanho, tipo}: Props) {
    return (
        <div
            className={`flex items-center justify-center w-full h-full backdrop-blur-sm bg-base-200/20`}>
            <span className={`
                loading
                ${tipo ? tipo === 'dots' ? 'loading-dots'
                        : tipo === 'infinity' ? 'loading-infinity'
                        : 'loading-bars'
                        : 'loading-bars' }
                ${tamanho ? tamanho === 'sm' ? 'loading-sm' : 'loading-lg' : 'loading-lg'}`}></span>
        </div>
    )
}
