import {ChangeDetectionStrategy, Component} from 'angular2/core'
import {CanActivate, RouteParams} from 'angular2/router'
import {Observable} from 'rxjs/Observable'

import {authorize} from '../_core/authorize'
import {NavCmp} from '../nav/nav.component'
import {Project} from './project.model'
import {ProjectsService} from './projects.service'

@CanActivate((to, from) => authorize(to, from))

@Component
({
  directives: [NavCmp],
  template:
  `
    <nav></nav>
    <div>This is a project</div>
    <div>{{project$ | async | json}}</div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class ProjectCmp
{
  project$: Observable<Project>
  constructor(private routeParams: RouteParams, private projectsService: ProjectsService)
  {
    this. project$ = projectsService.getProject(this.routeParams.get('client') + '/' + this.routeParams.get('project'))
  }
}
