import { IBase } from '@base/interface';

export interface IAbility extends IBase {
	url: string;
	name: string;
	slot: number;
	order: number;
	is_hidden: boolean;
}
