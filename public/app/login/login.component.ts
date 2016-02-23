import {Component} from 'angular2/core'
import {Http, Headers, Response} from 'angular2/http'
import {Router} from 'angular2/router'
import {tokenNotExpired} from 'angular2-jwt'
import {MATERIAL_DIRECTIVES} from 'ng2-material/all'

import {UserService} from '../user/user.service'
import {ProjectsService} from '../project/projects.service'

@Component
({
  directives: [MATERIAL_DIRECTIVES],
  selector: 'login-form',
  template: require('./login.html')
})

export class LoginCmp
{
  private date: Date
  constructor(private http: Http, private router: Router, private _userService: UserService,
              private _projectService: ProjectsService)
  {
    this.date = new Date()
    //check whether the user has already logged in...
    if (tokenNotExpired(null, localStorage.getItem('token')))
    {
      this.defaultRedirect()
    }
  }

  private authenticate(username: string, password: string)
  {
    let credentials = 'username=' + username + '&password=' + password;
    let headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');

    this.http
      .post('http://localhost:3000/login', credentials, {headers: headers})
      .map(res => res.json())
      .subscribe
      (
        (res: Response) => this.checkResponse(res),
        err => console.error(err)
      );
  }

  private checkResponse(res)
  {
    if (res.success && res.user.token)
    {
      //store the token in localStorage
      localStorage.setItem('token', res.user.token)

      //logged in okay, redirect
      this.defaultRedirect()
    }
    else
    {
      console.log('Auth failed');
    }
  }

  private defaultRedirect()
  {
    //fetch user profile
    this
      ._userService
      .fetchUser()
      .subscribe
      (
        // default route to redirect to
        () =>
        {
          this.router.parent.navigate(['./Home'])
          this._projectService.fetchProjects()
        },
        (err) => console.error(err)
      )
  }
}
