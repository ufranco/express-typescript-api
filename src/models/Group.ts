import { model, Schema, Document, Mongoose } from 'mongoose';

export interface IGroup extends Document {
  name: String,

};

const userSchema = new Schema({
  name : {
    type: String,
    required: true
  }
});

export default model<IGroup>('Notification', userSchema);