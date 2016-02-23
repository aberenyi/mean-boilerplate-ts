import {Component} from 'angular2/core'
import {CanActivate} from 'angular2/router'

import {authorize} from '../_core/authorize'
import {NavCmp} from '../nav/nav.component'
import {ProjectsListCmp} from '../project/projects-list.component'

@CanActivate((to, from) => authorize(to, from, {checkRole: 'admin'}))

@Component
({
  directives: [NavCmp, ProjectsListCmp],
  template:
  `
    <nav></nav>
    <h2>Admin pages...</h2>
    <projects-list></projects-list>
  `
})

export class AdminCmp {}
