import {axiosInstance} from "..";
import {Processo} from "@/class/Processo";

export const getProcessoSecundario = async (processo: Processo, filtro?: string, take?: string, skip?: string) => {
    try {
        let url = `/processosFilhos/${processo.id}`;
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

export const salvarProcessoSecundario = async (processo: Processo) => {
    try {
        const res = await axiosInstance({
            method: processo.id ? "put" : "post",
            url: "/processosFilhos" + (processo.id ? "/" + processo.id : ""),
            data: {
                numeroProcessoPrincipal: processo.numeroProcessoPrincipal,
                tipoProcessoPrincipal: processo.tipoProcessoPrincipal,
                numeroProcessoFilho: processo.numeroProcessoFilho,
                tipoProcessoFilho: processo.tipoProcessoFilho,
                dataPagamentoProcessoFilho: processo.dataPagamentoProcessoFilho,
                banco: processo.banco,
                valorProcessoFilho: processo.valorProcessoFilho,
                valorHonorariosProcessoFilho: processo.valorHonorariosProcessoFilho,
                observacoesProcessoFilho: processo.observacoesProcessoFilho,
                naturezaId: processo.naturezaId,
                comarcaProcessoPrincipalId: processo.comarcaProcessoPrincipalId,
                comarcaProcessoFilhoId: processo.comarcaProcessoFilhoId,
                clienteId: processo.clienteId,
                empresaId: processo.empresaId,
                advogadoId: processo.advogadoId,
                processoPrincipalId: processo.processoPrincipalId
            },
        });
        
        return Promise.resolve(res);
    } catch (error) {
        return Promise.reject(error);
    }
};

export const excluirProcessoSecundario = async (id: number) => {
    try {
        const res = await axiosInstance({
            method: "delete",
            url: "/processosFilhos/" + id,
        });
        
        return Promise.resolve(res);
    } catch (error) {
        return Promise.reject(error);
    }
};
