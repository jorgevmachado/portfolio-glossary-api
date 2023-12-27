import { BaseService } from '@base/service';
import { type IUser } from '@business/auth/user/interfaces';
import UserRepository from '@business/auth/user/repository';
import { hash } from 'bcryptjs';
import UserMapper from '@business/auth/user/mapper';

import { User } from '@entity/User';

export class UserService extends BaseService<User, IUser> {
    constructor() {
        const repository = new UserRepository();
        super(repository);
    }

    async signup(request: Omit<IUser, 'id' | 'created_at' | 'updated_at' | 'deleted_at'>): Promise<any> {
        request.admin = false;
        const iRequest = UserMapper.requestToInterface(request);
        const emailExists = await this.repository.findByEmail(iRequest.email);
        if(emailExists) {
            throw new Error('Email already exists');
        }
        iRequest.password = await hash(iRequest.password, 8);
        const entity = UserMapper.interfaceToEntity(iRequest);
        return await this.repository.create(entity);
    }
}
