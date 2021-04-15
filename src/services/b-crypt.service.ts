import {injectable, BindingScope} from '@loopback/core';
import {hash, compare, genSalt} from 'bcrypt';

@injectable({scope: BindingScope.TRANSIENT})
export class BCryptService {
  constructor() {}

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async hash(data: any): Promise<string> {
    const salt = await genSalt(15);
    return hash(data, salt);
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  compare(data: any, encrypted: string): Promise<boolean> {
    return compare(data, encrypted);
  }
}
