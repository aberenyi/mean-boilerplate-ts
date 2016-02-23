import {bootstrap, ELEMENT_PROBE_PROVIDERS} from 'angular2/platform/browser'
import {Http, HTTP_PROVIDERS} from 'angular2/http'
import {ROUTER_PROVIDERS, APP_BASE_HREF} from 'angular2/router'
import {enableProdMode, provide, ComponentRef} from 'angular2/core'
import {AuthHttp, AuthConfig} from 'angular2-jwt'
import {provideStore} from '@ngrx/store'

const ENV_PROVIDERS = [];
'production' === process.env.ENV  ? enableProdMode() : ENV_PROVIDERS.push(ELEMENT_PROBE_PROVIDERS)

import {App} from './app/app.ts'
import {UserReducer} from './app/user/user.reducer.ts'
import {appInjector} from './app/_core/app.injector'
import {ProjectsReducer} from './app/project/projects.reducer.ts'
import {UserService} from './app/user/user.service'
import {ProjectsService} from './app/project/projects.service'

// import services here to make sure the whole application can access them
// HTTP_PROVIDERS: provides http for *all* components,
// ROUTER_PROVIDERS, APP_BASE_HREF: http://julienrenaux.fr/2015/12/25/angular2-series-routing/
bootstrap(App,
[
  ENV_PROVIDERS,
  HTTP_PROVIDERS,
  ROUTER_PROVIDERS,
  provide(APP_BASE_HREF, {useValue: '/'}),
  provide(AuthHttp,
  {
    useFactory: (http) =>
    {
      return new AuthHttp(new AuthConfig({tokenName: 'token'}), http)
    },
    deps: [Http]
  }),
  provideStore({UserReducer, ProjectsReducer}),
  UserService,
  ProjectsService
])
.then((appRef: ComponentRef) =>
{
  // store a reference to the injector
  appInjector(appRef.injector)
})
.catch(err => console.error(err))
