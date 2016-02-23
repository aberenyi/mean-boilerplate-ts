import {Component, ChangeDetectionStrategy} from 'angular2/core'
import {CanActivate} from 'angular2/router'

import {authorize} from '../_core/authorize'
import {NavCmp} from '../nav/nav.component'
import {ProjectsListCmp} from '../project/projects-list.component.ts'
import {ProjectsService} from '../project/projects.service'

@CanActivate((to, from) => authorize(to, from, {checkRole: 'user'}))

@Component
({
  selector: 'home',
  directives: [NavCmp, ProjectsListCmp],
  template:
  `
    <nav></nav>
    <projects-list></projects-list>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class HomeCmp {}
