import {axiosInstance} from "@/services";
import {Processo} from "@/class/Processo";

export const getProcessos = async (filtro?: string, take?: string, skip?: string) => {
    try {
        let url = "/processos";
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

export const salvarProcesso = async (processo: Processo) => {
    try {
        const res = await axiosInstance({
            method: processo.id ? "put" : "post",
            url: "/processos" + (processo.id ? "/" + processo.id : ""),
            data: {
                numeroProcessoPrincipal: processo.numeroProcessoPrincipal,
                tipoProcessoPrincipal: processo.tipoProcessoPrincipal,
                dataIntimacao: processo.dataIntimacao,
                dataSentenca: processo.dataSentenca,
                dataPagamentoProcessoPrincipal: processo.dataPagamentoProcessoPrincipal,
                dataInicioBeneficio: processo.dataInicioBeneficio,
                dataInicioPagamentoBeneficio: processo.dataInicioPagamentoBeneficio,
                banco: processo.banco,
                valorRendaMensalInicial: processo.valorRendaMensalInicial,
                naturezaId: processo.naturezaId,
                comarcaProcessoPrincipalId: processo.comarcaProcessoPrincipalId,
                clienteId: processo.clienteId,
                empresaId: processo.empresaId,
                advogadoId: processo.advogadoId,
                observacoesProcessoPrincipal: processo.observacoesProcessoPrincipal
            },
        });
        return Promise.resolve(res);
    } catch (error) {
        return Promise.reject(error);
    }
};

export const excluirProcesso = async (id: number) => {
    try {
        const res = await axiosInstance({
            method: "delete",
            url: "/processos/" + id,
        });
        
        return Promise.resolve(res);
    } catch (error) {
        return Promise.reject(error);
    }
};
