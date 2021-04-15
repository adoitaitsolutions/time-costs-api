import {inject, Getter} from '@loopback/core';
import {
  DefaultCrudRepository,
  repository,
  BelongsToAccessor,
} from '@loopback/repository';
import {MainDataSource} from '../datasources';
import {User, UserRelations, Rol} from '../models';
import {RolRepository} from './';

export class UserRepository extends DefaultCrudRepository<
  User,
  typeof User.prototype.id,
  UserRelations
> {
  public readonly rol: BelongsToAccessor<Rol, typeof User.prototype.id>;

  constructor(
    @inject('datasources.main') dataSource: MainDataSource,
    @repository.getter('RolRepository')
    protected rolRepositoryGetter: Getter<RolRepository>,
  ) {
    super(User, dataSource);

    this.rol = this.createBelongsToAccessorFor('rol', rolRepositoryGetter);
  }
}
