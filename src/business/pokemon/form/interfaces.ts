import { IBase } from '@base/interface';

export interface IForm extends IBase {
	name: string;
	url: string;
	order: number;
	is_mega: boolean;
	is_default: boolean;
	back_shiny?: string;
	back_female?: string;
	front_shiny?: string;
	front_female?: string;
	back_default?: string;
	front_default?: string;
	is_battle_only: boolean;
	version_group_url: string;
	back_shiny_female?: string;
	version_group_name: string;
	front_shiny_female?: string;
}
