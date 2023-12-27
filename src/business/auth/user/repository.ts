import { BaseRepository } from '@base/repository';
import { type IUser } from '@business/auth/user/interfaces';

import { User } from '@entity/User';

import { AppDataSource } from '../../../data-source';

export default class UserRepository extends BaseRepository<User, IUser> {
    constructor() {
        const repository = AppDataSource.manager.getRepository(User);
        super(repository, 'user');
    }
}
