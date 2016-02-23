// Component decorator = square one
//import {Component} from 'angular2/core'
import {Component, ViewEncapsulation} from 'angular2/core'
// RouteConfig: decorator for the route config
// RouterOutlet: directive that should be included in the template. This will be
//  replaced with the template from the particular route
// ROUTER_DIRECTIVES this gives you [routerLink] and <router-outlet> (amongst other things)
import {RouteConfig, RouterOutlet, ROUTER_DIRECTIVES} from 'angular2/router'

import {LoginCmp} from './login/login.component'
import {HomeCmp} from './home/home.component'
import {AdminCmp} from './admin/admin.component'
import {ProjectCmp} from './project/project.component'

@Component
({
  directives: [ROUTER_DIRECTIVES, RouterOutlet],
  selector: 'app',
  styles: [require('./app.scss')],
  encapsulation: ViewEncapsulation.None,
  template: `<router-outlet></router-outlet>`
})

@RouteConfig
([
  {path: '/', redirectTo: ['./Login']},
  {path: '/login', name: 'Login', component: LoginCmp},
  {path: '/home', name: 'Home', component: HomeCmp, useAsDefault: true},
  {path: '/admin', name: 'Admin', component: AdminCmp},
  {path: '/:client/:project', name: 'Project', component: ProjectCmp}
])

export class App {}
