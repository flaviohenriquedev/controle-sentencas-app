import {axiosInstance} from "@/services";
import {Comarca} from "@/class/Comarca";

export const getComarcas = async (filtro?: string, take?: string, skip?: string) => {
    try {
        let url = "/comarcas";
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

export const getComarcasAutoComplete = async (filtro: string) => {
    try {
        const res = await axiosInstance({
            method: "get",
            url: "/comarcas/auto-complete" + (filtro && "?filtro=" + filtro),
        });
        
        return Promise.resolve(res);
    } catch (error) {
        return Promise.reject(error);
    }
};

export const salvarComarca = async (comarca: Comarca) => {
    try {
        const res = await axiosInstance({
            method: comarca.id ? "put" : "post",
            url: "/comarcas" + (comarca.id ? "/" + comarca.id : ""),
            data: {
                municipio: comarca.municipio,
                estado: comarca.estado,
                descricao: comarca.descricao,
                tipo: comarca.tipo,
            },
        });
        
        return Promise.resolve(res);
    } catch (error) {
        return Promise.reject(error);
    }
};

export const excluirComarca = async (id: number) => {
    try {
        const res = await axiosInstance({
            method: "delete",
            url: "/comarcas/" + id,
        });
        
        return Promise.resolve(res);
    } catch (error) {
        return Promise.reject(error);
    }
};

export const ativarComarca = async (id: number) => {
    try {
        const res = await axiosInstance({
            method: "patch",
            url: "/comarcas/ativar/" + id,
        });
        
        return Promise.resolve(res);
    } catch (error) {
        return Promise.reject(error);
    }
};

export const inativarComarca = async (id: number) => {
    try {
        const res = await axiosInstance({
            method: "patch",
            url: "/comarcas/inativar/" + id,
        });
        
        return Promise.resolve(res);
    } catch (error) {
        return Promise.reject(error);
    }
};
