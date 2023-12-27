export interface IBase {
	id: string;
	created_at: Date;
	updated_at?: Date;
	deleted_at?: Date;
}

export interface IResponseMessage {
	message: string;
}
