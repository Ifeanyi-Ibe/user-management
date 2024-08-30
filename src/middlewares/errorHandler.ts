import { Request, Response, NextFunction } from 'express';
import { CustomError } from '../errors/customError';

export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof CustomError) {
    return res.status(err.statusCode).send({ hasErrors: true, errors: err.serializeErrors() });
  }

  res.status(500).send({
    errors: [{ hasErrors: true, message: 'Something went wrong' }],
  });
};
