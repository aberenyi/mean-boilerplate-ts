import {Component, ChangeDetectionStrategy} from 'angular2/core'
import {CanActivate, ROUTER_DIRECTIVES} from 'angular2/router'
import {Observable} from 'rxjs/Observable'

import {authorize} from '../_core/authorize'
import {Project} from '../project/project.model'
import {ProjectsService} from '../project/projects.service'
import {UserService} from '../user/user.service'
import {User} from '../user/user.model'

@CanActivate((to, from) => authorize(to, from, {checkRole: 'user'}))

@Component
({
  selector: 'projects-list',
  directives: [ROUTER_DIRECTIVES],
  template:
  `
  <div layout="row">
    <md-card *ngFor="#project of (projects$ | async)">
      <md-card-title>
        <md-card-title-text>
          <span class="md-headline">{{project.name}}</span>
          <span class="md-subhead">Favourite: {{project.favourite}}</span>
        </md-card-title-text>
        <md-card-title-media>
          <!--<img class="card-media md-media-sm" src="public/images/avatars/avatar13.svg">-->
        </md-card-title-media>
      </md-card-title>
      <md-card-actions layout="row" layout-align="end center">
        <button (click)="toggleFavourite(project); $event.stopPropagation();">toggleFavourite</button>
        <!--<button md-button>Action 2</button>-->
        <a [routerLink]="['/Project', {client: project.getUrlPart('client'), project: project.getUrlPart('project')}]">
          Go
        </a>
      </md-card-actions>
    </md-card>
    </div>
<!--    <div><strong>Projects Listing</strong></div>
    <div *ngFor="#project of (projects$ | async)">
      <div style="border: 1px solid black; padding-bottom: 10px">
        <h4>{{project.url}} {{project._id}}</h4>
        <h4>{{project.groups | json}}</h4>
        <div>
          {{project.favourite}}
          <button (click)="toggleFavourite(project); $event.stopPropagation();">toggleFavourite</button>
        </div>
        <a [routerLink]="['/Project', {client: project.getUrlPart('client'), project: project.getUrlPart('project')}]">
          Go
        </a>
        <button *ngIf="(user$ | async).hasRole('admin')" (click)="console.log('DANGER!'); $event.stopPropagation();">
          say DANGER!
        </button>
      </div>
    </div>-->
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class ProjectsListCmp
{
  projects$: Observable<Array<Project>>
  user$: Observable<User>
  constructor(private _projectsService: ProjectsService, private _userService: UserService)
  {
    this.projects$ = _projectsService.projects$
    this.user$ = _userService.user$
  }


  private toggleFavourite(project: Project)
  {
    project.favourite = !project.favourite
    this._projectsService.updateItem(project)
  }
}
