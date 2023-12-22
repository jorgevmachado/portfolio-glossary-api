import { IBase } from '@interfaces/base';

export interface IType extends IBase {
	name: string;
	url: string;
	order: number;
	textColor: string;
	backgroundColor: string;
}
