import {SelectItem} from "@/interface/common-interface";

export enum TipoProcesso {
    JUDICIAL = 'JUDICIAL',
    ADMINISTRATIVO = 'ADMINISTRATIVO'
}

export class TipoProcessoFactory {
    
    private static readonly status: TipoProcesso[] = [
        TipoProcesso.JUDICIAL,
        TipoProcesso.ADMINISTRATIVO,
    ];
    
    private static readonly infos = {
        JUDICIAL: {
            label: 'Judicial'
        },
        ADMINISTRATIVO: {
            label: 'Administrativo'
        }
    };
    
    static getStatus(): TipoProcesso[] {
        return this.status;
    }
    
    static getSelectItens(): SelectItem[] {
        return this.status.map(item => {
            return {label: this.getLabel(item), value: item};
        });
    }
    
    static getLabel(status: TipoProcesso): string {
        return status ? this.infos[status].label : '';
    }
    
    static getItemByInfo(info: string): SelectItem | undefined {
        const tipoProcesso = this.status.find(item => item === info);
        
        if (tipoProcesso) {
            return {
                label: this.infos[tipoProcesso].label,
                value: info
            };
        } else {
            return undefined;
        }
    }
}
