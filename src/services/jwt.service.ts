import {injectable, BindingScope} from '@loopback/core';
import {randomBytes} from 'crypto';
import {sign, SignOptions, verify, VerifyOptions} from 'jsonwebtoken';

@injectable({scope: BindingScope.TRANSIENT})
export class JWTService {
  private readonly secret: string;

  constructor() {
    this.secret = randomBytes(20).toString('hex');
  }

  sign<T extends object>(
    payload: T,
    options: SignOptions = {},
  ): Promise<string> {
    return new Promise((resolve, reject) => {
      sign(payload, this.secret, options, (err, token) => {
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
