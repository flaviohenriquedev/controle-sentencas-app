import {axiosInstance} from "@/services";
import {IndiceINPC} from "@/class/IndiceINPC";

export const getIndiceINPC = async (take?: string, skip?: string) => {
    try {
        let url = "/indicesINPC";
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

export const salvarIndiceINPC = async (indiceINPC: IndiceINPC) => {
    try {
        const res = await axiosInstance({
            method: indiceINPC.id ? "put" : "post",
            url: "/indicesINPC" + (indiceINPC.id ? "/" + indiceINPC.id : ""),
            data: {
                ano: indiceINPC.ano,
                mes: indiceINPC.mes,
                valor: indiceINPC.valor
            },
        });
        
        return Promise.resolve(res);
    } catch (error) {
        return Promise.reject(error);
    }
};

export const excluirIndiceINPC = async (id: number) => {
    try {
        const res = await axiosInstance({
            method: "delete",
            url: "/indicesINPC/" + id,
        });
        
        return Promise.resolve(res);
    } catch (error) {
        return Promise.reject(error);
    }
};
