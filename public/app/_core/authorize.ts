// inspired by https://github.com/angular/angular/issues/4112
import {Injector} from 'angular2/core'
//import {Router, ComponentInstruction} from 'angular2/router'
import {ComponentInstruction} from 'angular2/router'
import {tokenNotExpired} from 'angular2-jwt'
import {Observable} from 'rxjs/Observable'

import {appInjector} from './app.injector'
import {User} from '../user/user.model'
import {UserService} from '../user/user.service'
import {Project} from '../project/project.model'
import {ProjectsService} from '../project/projects.service'

export const authorize = (to: ComponentInstruction, from: ComponentInstruction, params: Object = {}) =>
{
  let injector: Injector = appInjector();
  //let router: Router = injector.get(Router);
  let user$: Observable<User> = injector.get(UserService).user$
  let projects$: Observable<Array<Project>> = injector.get(ProjectsService).projects$

  // checks
  let authorized = false;
  let checkToken = tokenNotExpired(null, localStorage.getItem('token'))
  let checkRole$ = user$.map(user => user.role === 'admin' || user.role === params['checkRole'])
  let checkGroup$ = projects$
    .flatMap(project => project)
    .filter(project => project.url === to.urlPath)
    .zip(user$)
    .map(merged => merged[0].groups.map(projectsGroup => merged[1].groups.indexOf(projectsGroup) !== -1))
    .flatMap(merged => merged)

  Observable
    .merge(checkRole$, checkGroup$)
    .filter(check => check === true)
    .subscribe
    (
      (check: boolean) => authorized = check,
      err => console.error // maybe redirect to custom 4xx page here...
    )

  return new Promise((resolve) => resolve(checkToken && authorized))
}
