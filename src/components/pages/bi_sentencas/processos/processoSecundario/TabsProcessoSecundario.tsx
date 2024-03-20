import {Tab} from "@/interface/tabs";
import {Processo} from "@/class/Processo";
import {Despachos} from "@/components/pages/bi_sentencas/processos/Despachos";
import {
    ProcessoSecundarioDadosBasicos
} from "@/components/pages/bi_sentencas/processos/processoSecundario/ProcessoSecundarioDadosBasicos";
import {
    ProcessoSecundarioDespachos
} from "@/components/pages/bi_sentencas/processos/processoSecundario/ProcessoSecundarioDespachos";


export function TabsProcessoSecundario(entidade: Processo, editavel: boolean = false) {
    
    const tabs: Tab[] = [
        {
            label: 'Dados Básicos',
            component: <ProcessoSecundarioDadosBasicos processo={entidade}
                                                       editavel={editavel}/>,
            condicaoRenderizar: true
        },
        {
            label: 'Despachos',
            component: <ProcessoSecundarioDespachos processo={entidade}/>,
            condicaoRenderizar: (entidade.id > 0)
        }
    ]
    
    return tabs;
}
