import IPagination from './IPagination';
import { Request } from 'express';

export default interface IRequest extends Request {
  pagination?: IPagination,
};