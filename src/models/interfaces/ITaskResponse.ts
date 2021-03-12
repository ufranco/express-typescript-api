import { default as IResponse } from './IResponse';
import { ITask } from '../Task'

export default interface ITaskResponse extends IResponse {
  task?: ITask
};