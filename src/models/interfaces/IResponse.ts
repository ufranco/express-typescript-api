import IPagination from './IPagination';
import { Response } from 'express';

export default interface IResponse extends Response {
  pagination?: IPagination;
};