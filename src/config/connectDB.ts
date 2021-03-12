import mongoose, { ConnectOptions } from 'mongoose';
import config from './config';

export default async () => {

  const DBOptions: ConnectOptions = {
    useNewUrlParser: true,
    useCreateIndex: true,
    autoIndex: true,
    keepAlive: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  }

  mongoose.connect(config.DB.URI, DBOptions);
  const connection = mongoose.connection;

  connection.once('open', () => console.log(`MongoDB Connected: ${config.DB.URI}`.cyan.italic.bold));
  connection.once('error', err => console.log(`MongoDB connection failed : ${err}`.red.bold));

};