import {inject, lifeCycleObserver, LifeCycleObserver} from '@loopback/core';
import {juggler} from '@loopback/repository';

const config = {
  name: 'main',
  connector: 'postgresql',
  host: process.env.PG_HOST ?? '127.0.0.1',
  port: +(process.env.PG_PORT ?? 5432),
  user: process.env.PG_USER ?? 'loopback',
  password: process.env.PG_PASS,
  database: 'time-costs',
};

// Observe application's life cycle to disconnect the datasource when
// application is stopped. This allows the application to be shut down
// gracefully. The `stop()` method is inherited from `juggler.DataSource`.
// Learn more at https://loopback.io/doc/en/lb4/Life-cycle.html
@lifeCycleObserver('datasource')
export class MainDataSource
  extends juggler.DataSource
  implements LifeCycleObserver {
  static dataSourceName = 'main';
  static readonly defaultConfig = config;

  constructor(
    @inject('datasources.config.main', {optional: true})
    dsConfig: object = config,
  ) {
    super(dsConfig);
  }
}
