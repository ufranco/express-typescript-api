import { model, Schema, Document, Mongoose } from 'mongoose';
import { ITask } from './Task'

export interface INotification extends Document {
  dueDate: Date;
  name: String;
  summary: String;
  task: ITask;
  read: Boolean;
};

const notificationSchema = new Schema({
  dueDate: {
    type: Date,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  summary : {
    type: String,
  },
  task: {
    type: Schema.Types.ObjectId,
    ref: "Task",
    required: true,
  },
  read: {
    type: Boolean,
    default: false,
  }

});

export default model<INotification>('Notification', notificationSchema);