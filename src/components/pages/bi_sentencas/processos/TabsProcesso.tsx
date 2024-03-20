import {Tab} from "@/interface/tabs";
import {DadosBasicos} from "@/components/pages/bi_sentencas/processos/DadosBasicos";
import {Processo} from "@/class/Processo";
import {Despachos} from "@/components/pages/bi_sentencas/processos/Despachos";
import {
    ProcessoSecundarioComponente
} from "@/components/pages/bi_sentencas/processos/processoSecundario/ProcessoSecundarioComponente";


export function TabsProcesso(processo: Processo, editavel: boolean = false) {

    const tabs: Tab[] = [
        {
            label: 'Dados Básicos',
            component: <DadosBasicos processo={processo}
                                     editavel={editavel}/>,
            condicaoRenderizar: true
        },
        {
            label: 'Despachos',
            component: <Despachos processo={processo}/>,
            condicaoRenderizar: (processo.id > 0)
        },
        {
            label: 'Processo Secundário',
            component: <ProcessoSecundarioComponente processo={processo}/>,
            condicaoRenderizar: (processo.id > 0)
        }
    ]
    
    return tabs;
}
