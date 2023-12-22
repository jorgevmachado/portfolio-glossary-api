import { IBase } from '@interfaces/base';

export interface IAbility extends IBase {
	url: string;
	name: string;
	slot: number;
	order: number;
	is_hidden: boolean;
}
