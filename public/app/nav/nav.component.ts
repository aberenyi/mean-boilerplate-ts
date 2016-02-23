import {Component, ChangeDetectionStrategy} from 'angular2/core'
import {CanActivate, Router, ROUTER_DIRECTIVES} from 'angular2/router'
import {Store} from '@ngrx/store'
import {Observable} from 'rxjs/Observable'

import {User} from '../user/user.model'
import {RESET_USER} from '../user/user.reducer'
import {authorize} from '../_core/authorize'
import {RESET_PROJECTS} from '../project/projects.reducer'
import {AppStore} from '../_core/app.store'

@CanActivate((to, from) => authorize(to, from, 'user'))

@Component
({
  directives: [ROUTER_DIRECTIVES],
  //templateUrl: 'app/nav/nav.html',
  selector: 'nav',
  template:
  `
    <div>
      <a [routerLink]="['/Admin']">Admin (unpriviliged)</a>
      <br>
      <a [routerLink]="['/Project', {client: 'client1', project: 'project1'}]">C1/P1 (unpriviliged)</a>
      <br>
      <a [routerLink]="['/Project', {client: 'client1', project: 'project2'}]">C1/P2 (unpriviliged)</a>
      <br>
      <a [routerLink]="['/Project', {client: 'client1', project: 'project3'}]">C1/P3 (unpriviliged)</a>
      <br>
      <a [routerLink]="['/Project', {client: 'client2', project: 'project1'}]">C2/P1 (unpriviliged)*</a>
      <br>
      <a [routerLink]="['/Home']">Home (nav)</a>
      <br>
      <a *ngIf="(user$ | async).hasRole('admin')" [routerLink]="['/Admin']">Admin (nav)</a>
      <br>
      <div>
        Hiya, <strong>{{(user$ | async).uid}}</strong>.
        Your are a(n) <strong>{{(user$ | async).role}}</strong> and member of the following groups
        {{(user$ |async).groups | json}}.
        <a href="#" (click)="logout($event)">Logout</a>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class NavCmp
{
  user$: Observable<User>
  constructor(private router: Router, public store: Store<AppStore>)
  {
    this.user$ = store.select('UserReducer')
  }

  private logout($event: Event)
  {
    $event.preventDefault();
    localStorage.removeItem('token')
    this.store.dispatch({type: RESET_USER})
    this.store.dispatch({type: RESET_PROJECTS})
    this.router.parent.navigate(['./Login'])
  }
}
