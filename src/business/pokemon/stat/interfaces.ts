import { IBase } from '@base/interface';

export interface IStat extends IBase {
	url: string;
	name: string;
	order: number;
	effort: number;
	base_stat: number;
}
