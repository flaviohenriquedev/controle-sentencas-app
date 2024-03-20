import {SelectItem} from "@/interface/common-interface";

export enum TipoProcessoSecundario {
	ACORDO_PARCELADO = 'ACORDO_PARCELADO',
	RPV_MULTA = 'RPV_MULTA',
	RPV_PRECATORIO = 'RPV_PRECATORIO',
	RPV_PRINCIPAL = 'RPV_PRINCIPAL',
	RPV_SUCUMBENCIA = 'RPV_SUCUMBENCIA'
}

export class TipoProcessoSecundarioFactory {
	
	private static readonly status: TipoProcessoSecundario[] = [
		TipoProcessoSecundario.ACORDO_PARCELADO,
		TipoProcessoSecundario.RPV_MULTA,
		TipoProcessoSecundario.RPV_PRECATORIO,
		TipoProcessoSecundario.RPV_PRINCIPAL,
		TipoProcessoSecundario.RPV_SUCUMBENCIA
	];
	
	private static readonly infos = {
		ACORDO_PARCELADO: {
			label: 'Acordo Parcelado'
		},
		RPV_MULTA: {
			label: 'RPV Multa'
		},
		RPV_PRECATORIO: {
			label: 'RPV Precatório'
		},
		RPV_PRINCIPAL: {
			label: 'RPV Principal'
		},
		RPV_SUCUMBENCIA: {
			label: 'RPV Sucumbência'
		}
	};
	
	static getStatus(): TipoProcessoSecundario[] {
		return this.status;
	}
	
	static getSelectItens(): SelectItem[] {
		return this.status.map(item => {
			return {label: this.getLabel(item), value: item};
		});
	}
	
	static getLabel(status: TipoProcessoSecundario): string {
		return status ? this.infos[status].label : '';
	}
	
	static getItemByInfo(info: string): SelectItem | undefined {
		const tipoProcessoSecundario = this.status.find(item => item === info);
		
		if (tipoProcessoSecundario) {
			return {
				label: this.infos[tipoProcessoSecundario].label,
				value: info
			};
		} else {
			return undefined;
		}
	}
}
