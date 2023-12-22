import { IBase } from '@interfaces/base';

export interface IMove extends IBase {
	url: string;
	order: number;
	name: string;
}
