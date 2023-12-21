import { type IBase } from '@interfaces/base';

export interface ISpecie extends IBase {
	url: string;
	name: string;
	order: number;
	language: string;
	eye_colors: string;
	designation: string;
	skin_colors: string;
	hair_colors: string;
	classification: string;
	average_height: string;
	average_lifespan: string;
}
