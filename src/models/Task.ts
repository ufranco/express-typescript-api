import { model, Schema, Document } from 'mongoose';
import { IUser } from './User';

export interface ITask extends Document {
  name: String,
  description?: String,
  points?: Number,
  review?: Number,
  startDate?: Date,
  finished: Boolean,
  responsible?: IUser,
};

const taskSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
  },
  points : {
    type: Number,
    min: 0,
    max: 10,
  },
});

export default model<ITask>('Task', taskSchema);