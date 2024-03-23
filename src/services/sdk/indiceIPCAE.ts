import {axiosInstance} from "@/services";
import {IndiceIPCAE} from "@/class/IndiceIPCAE";

export const getIndiceIPCAE = async (filtro?: string, take?: string, skip?: string) => {
    try {
        let url = "/indicesIPCAE";
        let params = '';
        
        if (take) {
            params += `${params ? '&' : '?'}take=${take}`;
        }
        if (skip) {
            params += `${params ? '&' : '?'}skip=${skip}`;
        }
        
        // Combina a URL base com os parâmetros
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

export const salvarIndiceIPCAE = async (indiceIPCAE: IndiceIPCAE) => {
    try {
        const res = await axiosInstance({
            method: indiceIPCAE.id ? "put" : "post",
            url: "/indicesIPCAE" + (indiceIPCAE.id ? "/" + indiceIPCAE.id : ""),
            data: {
                ano: indiceIPCAE.ano,
                mes: indiceIPCAE.mes,
                valor: indiceIPCAE.valor
            },
        });
        
        return Promise.resolve(res);
    } catch (error) {
        return Promise.reject(error);
    }
};

export const excluirIndiceIPCAE = async (id: number) => {
    try {
        const res = await axiosInstance({
            method: "delete",
            url: "/indicesIPCAE/" + id,
        });
        
        return Promise.resolve(res);
    } catch (error) {
        return Promise.reject(error);
    }
};
