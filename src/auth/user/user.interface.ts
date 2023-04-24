import { ID } from 'src/common/common.interface';
import { IDiscriptionsRole } from 'src/auth/role/role.interface';

export interface IDiscriptionsUser {
  username: string;
  password: string;
}
export interface IRelationsRUser {
  roles: IDiscriptionsRole[];
}

export interface ITokenPayload {
  username: string;
  roles: IDiscriptionsRole[];
}
export interface IUser extends IDiscriptionsUser, IRelationsRUser, ID {}
