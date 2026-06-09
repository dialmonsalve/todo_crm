import { type Request } from 'express';
import { JWTPayload } from './jwt-payload.interface';

export interface IUserRequest extends Request {
  user: JWTPayload;
}
