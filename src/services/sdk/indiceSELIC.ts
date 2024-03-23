import {axiosInstance} from "@/services";
import {IndiceSELIC} from "@/class/IndiceSELIC";

export const getIndiceSELIC = async (filtro?: string, take?: string, skip?: string) => {
    try {
        let url = "/indicesSELIC";
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

export const salvarIndiceSELIC = async (indiceSELIC: IndiceSELIC) => {
    try {
        const res = await axiosInstance({
            method: indiceSELIC.id ? "put" : "post",
            url: "/indicesSELIC" + (indiceSELIC.id ? "/" + indiceSELIC.id : ""),
            data: {
                ano: indiceSELIC.ano,
                mes: indiceSELIC.mes,
                valor: indiceSELIC.valor
            },
        });
        
        return Promise.resolve(res);
    } catch (error) {
        return Promise.reject(error);
    }
};

export const excluirIndiceSELIC = async (id: number) => {
    try {
        const res = await axiosInstance({
            method: "delete",
            url: "/indicesSELIC/" + id,
        });
        
        return Promise.resolve(res);
    } catch (error) {
        return Promise.reject(error);
    }
};
