import { NextFunction } from "express";

const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction): void => {
  console.log(`<ErrorHandler>: `, err);
};

export default errorHandler;