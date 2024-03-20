import {axiosInstance} from "@/services";
import {Empresa} from "@/class/Empresa";

export const getEmpresa = async (filtro?: string, take?: string, skip?: string) => {
    try {
        let url = "/empresas";
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

export const getEmpresasAutoComplete = async (filtro: string) => {
    try {
        const res = await axiosInstance({
            method: "get",
            url: "/empresas/auto-complete" + (filtro && "?filtro=" + filtro),
        });
        
        return Promise.resolve(res);
    } catch (error) {
        return Promise.reject(error);
    }
};

export const salvarEmpresa = async (company: Empresa) => {
    try {
        const res = await axiosInstance({
            method: company.id ? "put" : "post",
            url: "/empresas" + (company.id ? "/" + company.id : ""),
            data: {nome: company.nome},
        });
        
        return Promise.resolve(res);
    } catch (error) {
        return Promise.reject(error);
    }
};

export const excluirEmpresa = async (id: number) => {
    try {
        const res = await axiosInstance({
            method: "delete",
            url: "/empresas/" + id,
        });
        
        return Promise.resolve(res);
    } catch (error) {
        return Promise.reject(error);
    }
};

export const ativarEmpresa = async ({id}: any) => {
    try {
        const res = await axiosInstance({
            method: "patch",
            url: "/empresas/ativar/" + id,
        });
        
        return Promise.resolve(res);
    } catch (error) {
        return Promise.reject(error);
    }
};

export const inativarEmpresa = async ({id}: any) => {
    try {
        const res = await axiosInstance({
            method: "patch",
            url: "/empresas/inativar/" + id,
        });
        
        return Promise.resolve(res);
    } catch (error) {
        return Promise.reject(error);
    }
};
