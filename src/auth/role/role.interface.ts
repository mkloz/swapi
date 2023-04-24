import { ID } from 'src/common/common.interface';
import { IDiscriptionsUser } from 'src/auth/user/user.interface';

export interface IDiscriptionsRole {
  name: string;
}
export interface IRelationsRole {
  users: IDiscriptionsUser[];
}
export interface IRole extends IDiscriptionsRole, IRelationsRole, ID {}
