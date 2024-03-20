interface Props {
    skip: number // page
    take: number // limit
    total: number
}

export const ELLIPSIS_LEFT = -10
export const ELLIPSIS_RIGHT = -20
export const SELECT_TAKE = -30

function gerarPaginas(pagina: number, totalPaginas: number, take: number) {
    
    const atual = Math.min(pagina, totalPaginas);
    const total = Math.max(1, totalPaginas);
    
    const L = ELLIPSIS_LEFT
    const R = ELLIPSIS_RIGHT
    const ST = SELECT_TAKE
    
    if (total <= 7) {
        const array1 = Array.from({length: total}, (_, i) => i + 1);
        
        return [...array1, ST]
    }
    
    if (atual < 3) {
        return [1, 2, 3, L, total - 1, total, ST]
    }
    
    if (atual === 3) {
        return [1, 2, 3, 4, L, total - 1, total, ST]
    }
    
    if (atual > total - 2) {
        return [1, 2, R, total - 2, total - 1, total, ST]
    }
    
    if (atual === total - 2) {
        return [1, 2, R, total - 3, total - 2, total - 1, total, ST]
    }
    
    return [1, L, atual - 1, atual, atual + 1, R, total, ST]
};


export function usePaginacao({skip, take, total}: Props) {
    const totalDePaginas = Math.ceil(total / take)
    const pagina = Math.trunc((skip / take) + 1)
    
    const paginas = gerarPaginas(pagina, totalDePaginas, take)
    
    const isPaginaAtual = (n: number) => n === pagina;
    
    return {paginas, isPaginaAtual}
}
