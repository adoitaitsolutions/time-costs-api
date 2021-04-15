import {ApplicationConfig} from '@loopback/core';
import {BootMixin} from '@loopback/boot';
import {ServiceMixin} from '@loopback/service-proxy';
import {RestApplication} from '@loopback/rest';
import {
  RestExplorerBindings,
  RestExplorerComponent,
  RestExplorerConfig,
} from '@loopback/rest-explorer';
import {RepositoryMixin} from '@loopback/repository';
import {
  AuthenticationBindings,
  AuthenticationComponent,
  AuthenticationOptions,
} from '@loopback/authentication';
import {
  AuthorizationBindings,
  AuthorizationComponent,
  AuthorizationDecision,
  AuthorizationOptions,
} from '@loopback/authorization';
import path from 'path';
import {MySequence} from './sequence';

export {ApplicationConfig};

export class TimeCostsApplication extends BootMixin(
  ServiceMixin(RepositoryMixin(RestApplication)),
) {
  constructor(options: ApplicationConfig = {}) {
    super(options);

    // Set up the custom sequence
    this.sequence(MySequence);

    // Set up default home page
    this.static('/', path.join(__dirname, '../public'));

    // Customize @loopback/rest-explorer configuration here
    this.configure<RestExplorerConfig>(RestExplorerBindings.COMPONENT).to({
      path: '/explorer',
    });
    this.component(RestExplorerComponent);

    // Customize @loopback/authentication configuration here
    this.configure<AuthenticationOptions>(AuthenticationBindings.COMPONENT).to({
      // defaultMetadata: []
    });
    this.component(AuthenticationComponent);

    // Customize @loopback/authorization configuration here
    this.configure<AuthorizationOptions>(AuthorizationBindings.COMPONENT).to({
      defaultDecision: AuthorizationDecision.DENY,
    });
    this.component(AuthorizationComponent);

    this.projectRoot = __dirname;
    // Customize @loopback/boot Booter Conventions here
    this.bootOptions = {
      controllers: {
        // Customize ControllerBooter Conventions here
        dirs: ['controllers'],
        extensions: ['.controller.js'],
        nested: true,
      },
    };
  }
}
