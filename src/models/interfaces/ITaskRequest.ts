import IRequest from './IRequest';
import { ITask } from '../Task'

export default interface ITaskRequest extends IRequest {
  task?: ITask,
}