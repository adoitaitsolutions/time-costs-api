import {Entity, model, property, belongsTo} from '@loopback/repository';
import {Rol} from './';

@model({
  settings: {
    hiddenProperties: ['password', 'verifiedEmail'],
    postgresql: {
      // schema: 'public',
      table: 'users',
    },
  },
})
export class User extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
    jsonSchema: {
      format: 'uuid',
    },
  })
  id: string;

  @property({
    type: 'string',
    required: true,
  })
  name: string;

  @property({
    type: 'string',
    required: true,
    postgresql: {
      columnName: 'last_name',
    },
  })
  lastName: string;

  @property({
    type: 'string',
    required: true,
    jsonSchema: {
      format: 'email',
      transform: ['toLowerCase'],
    },
  })
  email: string;

  @property({
    type: 'string',
    required: true,
    jsonSchema: {
      minLength: 8,
    },
  })
  password: string;

  @property({
    type: 'boolean',
    postgresql: {
      columnName: 'verified_email',
    },
  })
  verifiedEmail?: boolean;

  @belongsTo(() => Rol, undefined, {
    postgresql: {
      columnName: 'rol_id',
    },
    default: 2,
  })
  rolId: number;

  @property({
    type: 'date',
    postgresql: {
      columnName: 'created_at',
    },
  })
  createdAt?: string;

  constructor(data?: Partial<User>) {
    super(data);
  }
}

export interface UserRelations {
  // describe navigational properties here
  rol: Rol; // User belongsTo Rol
}

export type UserWithRelations = User & UserRelations;
