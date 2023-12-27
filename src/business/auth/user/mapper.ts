import { type IUser } from '@business/auth/user/interfaces';

import { User } from '@entity/User';

export default class UserMapper {
    static urlDefault = '';

    static defaultInterface(): IUser {
        return {
            id: 'user',
            name: '',
            admin: false,
            email: '',
            phone: '',
            avatar: '',
            mobile: '',
            password: '',
            birthday: new Date(),
            created_at: new Date(),
        };
    }

    static requestToInterface(request: Omit<IUser, 'id' | 'created_at' | 'updated_at' | 'deleted_at'>) {
        const iEntity = UserMapper.defaultInterface();
        iEntity.name = request.name;
        iEntity.admin = request.admin;
        iEntity.email = request.email;
        iEntity.phone = request.phone;
        iEntity.avatar = request.avatar;
        iEntity.mobile = request.mobile;
        iEntity.password = request.password;
        iEntity.birthday = new Date(request.birthday);
        return iEntity;
    }

    static interfaceToEntity(IEntity: IUser, update: boolean = false): User {
        const entity = new User();
        entity.name = IEntity.name;
        entity.admin = IEntity.admin;
        entity.email = IEntity.email;
        entity.phone = IEntity.phone;
        entity.avatar = IEntity.avatar;
        entity.mobile = IEntity.mobile;
        entity.password = IEntity.password;
        entity.birthday = IEntity.birthday;
        entity.created_at = IEntity.created_at;
        if(update) {
            entity.id = IEntity.id;
            entity.updated_at = IEntity.updated_at;
        }
        return entity;
    }
}
