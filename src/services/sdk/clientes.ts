import {axiosInstance} from "./axiosIntance";
import {Cliente} from "@/class/Cliente";

export const getClientes = async (filtro?: string, take?: string, skip?: string) => {
    try {
        let url = "/clientes";
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


export const getClientesAutoComplete = async (filtro: string) => {
    try {
        const res = await axiosInstance({
            method: "get",
            url: "/clientes/auto-complete" + (filtro && "?filtro=" + filtro),
        });
        
        return Promise.resolve(res);
    } catch (error) {
        return Promise.reject(error);
    }
};

export const salvarCliente = async (cliente: Cliente) => {
    try {
        const res = await axiosInstance({
            method: cliente.id ? "put" : "post",
            url: "/clientes" + (cliente.id ? "/" + cliente.id : ""),
            data: {
                nome: cliente.nome,
                cpf: cliente.cpf
            },
        });
        
        return Promise.resolve(res);
    } catch (error) {
        return Promise.reject(error);
    }
};

export const excluirCliente = async (id: number) => {
    try {
        const res = await axiosInstance({
            method: "delete",
            url: "/clientes/" + id,
        });
        
        return Promise.resolve(res);
    } catch (error) {
        return Promise.reject(error);
    }
};
