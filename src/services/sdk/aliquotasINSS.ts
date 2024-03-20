import {axiosInstance} from "@/services";
import {AliquotaINSS} from "@/class/AliquotaINSS";

export const getAliquotasINSS = async (take?: string, skip?: string) => {
    try {
        let url = "/aliquotasINSS";
        let params = '';
        
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

export const salvarAliquotasINSS = async (aliquotaINSS: AliquotaINSS) => {
    try {
        const res = await axiosInstance({
            method: aliquotaINSS.id ? "put" : "post",
            url: "/aliquotasINSS" + (aliquotaINSS.id ? "/" + aliquotaINSS.id : ""),
            data: {
                ano: aliquotaINSS.ano,
                mes: aliquotaINSS.mes,
                aliquota: aliquotaINSS.aliquota,
                faixa: aliquotaINSS.faixa,
                teto: aliquotaINSS.teto,
                tetoCooperativa: aliquotaINSS.tetoCooperativa,
            },
        });
        
        return Promise.resolve(res);
    } catch (error) {
        return Promise.reject(error);
    }
};

export const excluirAliquotaINSS = async (id: number) => {
    try {
        const res = await axiosInstance({
            method: "delete",
            url: "/aliquotasINSS/" + id,
        });
        
        return Promise.resolve(res);
    } catch (error) {
        return Promise.reject(error);
    }
};
