import {axiosInstance} from "./axiosIntance";
import {Despacho} from "@/class/Despacho";

export const getDespachos = async (idCadastroPai: number, take?: string, skip?: string) => {
    try {
        const res = await axiosInstance({
            method: "get",
            url: "/despachos/" + (idCadastroPai && idCadastroPai),
        });
        
        return Promise.resolve(res);
    } catch (error) {
        return Promise.reject(error);
    }
};

export const salvarDespacho = async (cadastro: Despacho) => {
    try {
        const res = await axiosInstance({
            method: cadastro.id ? "put" : "post",
            url: "/despachos" + (cadastro.id ? "/" + cadastro.id : ""),
            data: {
                dataDespacho: cadastro.dataDespacho,
                dataValidade: cadastro.dataValidade,
                processoId: cadastro.processoId,
                andamentoId: cadastro.andamentoId,
                observacao: cadastro.observacao,
            },
        });
        
        return Promise.resolve(res);
    } catch (error) {
        console.error(error);
        return Promise.reject(error);
    }
};

export const excluirDespacho = async (id: number) => {
    try {
        const res = await axiosInstance({
            method: "delete",
            url: "/despachos/" + id,
        });
        
        return Promise.resolve(res);
    } catch (error) {
        return Promise.reject(error);
    }
};
