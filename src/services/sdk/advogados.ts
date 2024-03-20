import {axiosInstance} from "@/services";
import {Advogado} from "@/class/Advogado";

export const getAdvogados = async (filtro?: string, take?: string, skip?: string) => {
    try {
        let url = "/advogados";
        let params = '';
        
        if (filtro) {
            params += `?filtro=${filtro}`;
        }
        if (take) {
            params += `${params ? '&' : '?'}take=${take}`;
        }
        if (skip) {
            params += `${params ? '&' : '?'}skip=${skip}`;
        }
        
        url += params;
        
        const res = await axiosInstance({
            method: "get",
            url: url,
        });
        
        return Promise.resolve(res);
    } catch (error) {
        return Promise.reject(error);
    }
};

export const getAdvogadosAutoComplete = async (filtro: string) => {
    try {
        const res = await axiosInstance({
            method: "get",
            url: "/advogados/auto-complete" + (filtro && "?filtro=" + filtro),
        });
        
        return Promise.resolve(res);
    } catch (error) {
        return Promise.reject(error);
    }
};

export const salvarAdvogado = async (advogado: Advogado) => {
    try {
        const res = await axiosInstance({
            method: advogado.id ? "put" : "post",
            url: "/advogados" + (advogado.id ? "/" + advogado.id : ""),
            data: {nome: advogado.nome},
        });
        
        return Promise.resolve(res);
    } catch (error) {
        return Promise.reject(error);
    }
};

export const excluirAdvogado = async (id: number) => {
    try {
        const res = await axiosInstance({
            method: "delete",
            url: "/advogados/" + id,
        });
        
        return Promise.resolve(res);
    } catch (error) {
        return Promise.reject(error);
    }
};
