import {injectable, BindingScope} from '@loopback/core';
import {randomBytes} from 'crypto';
import {sign, verify, VerifyOptions} from 'jsonwebtoken';

@injectable({scope: BindingScope.TRANSIENT})
export class JWTService {
  private readonly secret: string;

  constructor() {
    this.secret = randomBytes(20).toString('hex');
  }

  sign<T extends object>(payload: T): Promise<string> {
    return new Promise((resolve, reject) => {
      sign(payload, this.secret, (err, token) => {
        if (err) return reject(err);
        resolve(token as string);
      });
    });
  }

  verify<T extends object>(token: string, options?: VerifyOptions): Promise<T> {
    return new Promise((resolve, reject) => {
      verify(token, this.secret, options, (err, decoded) => {
        if (err) return reject(err);
        resolve(decoded as T);
      });
    });
  }
}
