import { IBase } from '@base/interface';

export interface IUser extends IBase {
	name: string;
	admin: boolean;
	email: string;
	phone?: string;
	avatar?: string;
	mobile: string;
	password: string;
	birthday: Date;
}
