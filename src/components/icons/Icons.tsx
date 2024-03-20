import {MdOutlineAdminPanelSettings} from "react-icons/md";
import {IoPersonAddOutline} from "react-icons/io5";
import {LuFileSpreadsheet} from "react-icons/lu";
import {FaRegCreditCard} from "react-icons/fa6";

const iconSize: string = '1.2rem'
export const Icons = {
    administracao: <MdOutlineAdminPanelSettings size={iconSize}/>,
    cadastro: <IoPersonAddOutline size={iconSize}/>,
    protocolo: <LuFileSpreadsheet size={iconSize}/>,
    consignados: <FaRegCreditCard size={iconSize}/>
}
