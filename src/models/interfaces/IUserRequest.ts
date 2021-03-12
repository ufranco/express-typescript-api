import IRequest from './IRequest';
import { IUser } from '../User';

export default interface IUserRequest extends IRequest {
  user?: IUser,
}