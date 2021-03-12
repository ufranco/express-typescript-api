import { default as IResponse } from './IResponse';
import { IUser } from '../User'

export default interface IUserResponse extends IResponse {
  user?: IUser
};