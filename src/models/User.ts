import { model, Schema, Document } from 'mongoose';
import * as bcrypt from "bcrypt";
import { IGroup } from './Group';
import { ITask } from './Task';

export interface IUser extends Document {
  name: String;
  email: String;
  password: String;
  group?: IGroup;
  tasks?: ITask;
  averageReview?: Number;
};

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    required: true,
  },
  group: {
    type: Schema.Types.ObjectId,
    ref: 'Group',
  },
  tasks: {
    type: Schema.Types.ObjectId,
    ref: 'Task',
  },
  averageReview: {
    type: Number,
    min: 0,
    max: 10,
  },
});

userSchema.pre<IUser>('save', async function (next) {
  const user = this;
  if (user.isModified('password')){
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt); 
  }

  next();

});

userSchema.methods.comparePassword = async function (password: String): Promise<Boolean> {
  const user = this;
  return await bcrypt.compare(password, user.password);
};


export default model<IUser>('User', userSchema);