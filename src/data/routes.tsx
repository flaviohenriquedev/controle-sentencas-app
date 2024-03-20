import {RouteType} from "@/types/RouteType";
import {Icons} from "@/components/icons/Icons";
import {ModuloType} from "@/types/ModuloType";
import {SiGoogletagmanager} from "react-icons/si";
import {MdOutlineAdminPanelSettings, MdOutlineSettingsBackupRestore} from "react-icons/md";
import {FaMoneyBillTransfer} from "react-icons/fa6";
import {BsHouseDoor} from "react-icons/bs";


export const RoutesBISentencas: RouteType[] = [
    {
        label: "Administração",
        icon: Icons.administracao,
        submenu: [
            {
                label: "Empresas",
                href: "/manager/bi_sentencas/admin/company"
            },
            {
                label: "Usuários",
                href: "/manager/bi_sentencas/admin/usuario"
            }
        ]
    },
    {
        label: "Cadastros",
        icon: Icons.cadastro,
        submenu: [
            {
                label: "Advogados",
                href: "/manager/bi_sentencas/cadastros/advogados"
            },
            {
                label: "Andamentos",
                href: "/manager/bi_sentencas/cadastros/andamentos"
            },
            {
                label: "Clientes",
                href: "/manager/bi_sentencas/cadastros/clientes"
            },
            {
                label: "Comarcas",
                href: "/manager/bi_sentencas/cadastros/comarcas"
            },
            {
                label: "Naturezas",
                href: "/manager/bi_sentencas/cadastros/naturezas"
            },
            {
                label: "Relatórios",
                href: "/manager/bi_sentencas/cadastros/relatorios"
            }
        ]
    },
    {
        label: "Processos",
        icon: Icons.protocolo,
        href: "/manager/bi_sentencas/processos",
    },
]

export const RoutesAdministracaoSistema: RouteType[] = [
    {
        label: "Alíquotas",
        icon: Icons.administracao,
        submenu: [
            {
                label: "Alíquotas INSS",
                href: "/manager/administracao_sistema/aliquota-inss"
            },
            {
                label: "Índice INPC",
                href: "/manager/administracao_sistema/indice-inpc"
            },
            {
                label: "Índice IPCA-E",
                href: "/manager/administracao_sistema/indice-ipcae"
            },
            {
                label: "Índice SELIC",
                href: "/manager/administracao_sistema/indice-selic"
            }
        ]
    },
]

const iconSize = 70
export const Modulos: ModuloType[] = [
    {
        label: 'Administração do Sistema',
        icone: <MdOutlineAdminPanelSettings size={iconSize}/>,
        rota: '/manager/administracao_sistema',
        ativo: true
    },
    {
        label: 'Controle Sentenças',
        icone: <SiGoogletagmanager size={iconSize}/>,
        rota: '/manager/bi_sentencas',
        ativo: true
    },
    {
        label: 'Restituição',
        icone: <MdOutlineSettingsBackupRestore size={iconSize}/>,
        ativo: false
    },
    {
        label: 'Auxilio Moradia',
        icone: <BsHouseDoor size={iconSize}/>,
        ativo: false
    },
    {
        label: 'Consignados',
        icone: <FaMoneyBillTransfer size={iconSize}/>,
        ativo: false
    },
]
