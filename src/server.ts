import express, { Application } from 'express';
import { config } from 'dotenv';
import morgan from "morgan";
import 'colorts/lib/string';
import { default as connectDB } from './config/connectDB';
import errorHandler from './middleware/errorHandler';

//ROUTES
import { default as users } from './routes/users';
import { default as tasks } from './routes/tasks';
// import { default as groups }  from './routes/groups';
// import { default as auth }  from './routes/auth';


//LOAD ENVIROMENT VARIABLES
config({
  path: '../config/config.env'
});


//SET UP CONNECTION WITH MONGO CLUSTER
connectDB();

const app: Application = express();

// BODY PARSER
app.use(express.json());

// DEV LOGGING
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(errorHandler);
app.use('/api/users', users);
app.use('/api/tasks', tasks);
// app.use('/api/groups', groups);
// app.use('/api/auth', auth);

const PORT = process.env.PORT || 5000;

const server = app.listen(
  PORT,
  () => console.log(`Server running in ${process.env.NODE_ENV} on port ${PORT}`.blue.bold)
);

process.on(
  'unhandledRejection',
  (err: Error, promise: Promise<any>) => {
    console.log(`Error: ${err.message}`.red.bold);
    server.close(() => process.exit(1));
  }
);