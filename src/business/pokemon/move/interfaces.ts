import { IBase } from '@base/interface';

export interface IMove extends IBase {
	url: string;
	order: number;
	name: string;
}
