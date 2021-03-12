import { NextFunction } from 'express';
import IRequest from '../models/interfaces/IRequest';
import IResponse from '../models/interfaces/IResponse';

export default (req: IRequest, res: IResponse, next: NextFunction) => {
  const token = req.header('x-auth-token');

  if (!token) {
    return res.status(401).json({ msg: 'No token, authorizaton denied' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.user;
    next();

  } catch (err) {
    res.status(401).json({ msg: 'Token not valid' })
  }
};