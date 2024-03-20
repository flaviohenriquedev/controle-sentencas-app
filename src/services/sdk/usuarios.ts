import {axiosInstance} from "@/services";
import {Usuario} from "@/class/Usuario";

export const getUsuarios = async (filtro?: string, take?: string, skip?: string) => {
    try {
        let url = "/usuarios";
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

export const salvarUsuario = async (usuario: Usuario) => {
    try {
        const res = await axiosInstance({
            method: usuario.id ? "put" : "post",
            url: "/usuarios" + (usuario.id ? "/" + usuario.id : ""),
            data: {
                nome: usuario.nome,
                email: usuario.email,
            },
        });
        
        return Promise.resolve(res);
    } catch (error) {
        return Promise.reject(error);
    }
};

export const excluirUsuario = async (id: number) => {
    try {
        const res = await axiosInstance({
            method: "delete",
            url: "/usuarios/" + id,
        });
        
        return Promise.resolve(res);
    } catch (error) {
        return Promise.reject(error);
    }
};

export const ativarUsuario = async (id: number) => {
    try {
        const res = await axiosInstance({
            method: "patch",
            url: "/usuarios/ativar/" + id,
        });
        
        return Promise.resolve(res);
    } catch (error) {
        return Promise.reject(error);
    }
};

export const inativarUsuario = async (id: number) => {
    try {
        const res = await axiosInstance({
            method: "patch",
            url: "/usuarios/inativar/" + id,
        });
        
        return Promise.resolve(res);
    } catch (error) {
        return Promise.reject(error);
    }
};

export const resetarSenhaUsuario = async (id: number) => {
    try {
        const res = await axiosInstance({
            method: "patch",
            url: "/usuarios/resetar-senha/" + id,
        });
        
        return Promise.resolve(res);
    } catch (error) {
        return Promise.reject(error);
    }
};

export const alterarSenhaUsuario = async (senhaAtual: string, novaSenha: string) => {
    try {
        const res = await axiosInstance({
            method: "patch",
            url: "/usuarios/alterar-senha",
            data: {
                senhaAtual,
                novaSenha,
            },
        });
        
        return Promise.resolve(res);
    } catch (error) {
        return Promise.reject(error);
    }
};
