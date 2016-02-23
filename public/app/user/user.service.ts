import {Injectable} from 'angular2/core'
import {AuthHttp} from 'angular2-jwt'
import {Observable} from 'rxjs/Observable'
import {Response} from 'angular2/http'
import {Store} from '@ngrx/store'

import {User} from './user.model'
import {REGISTER_USER} from './user.reducer.ts'
import {AppStore} from '../_core/app.store'

@Injectable()
export class UserService
{
  user$: Observable<User>
  constructor(private authHttp: AuthHttp, private store: Store<AppStore>)
  {
    this.user$ = this.store.select('UserReducer')
  }

  public fetchUser()
  {
    return Observable.create(observer =>
    {
      this.authHttp
        .get('/api/me')
        .map((res: Response) => res.json())
        .map(payload => ({type: REGISTER_USER, payload}))
        .subscribe
        (
          (action) =>
          {
            this.store.dispatch(action)
            observer.next()
          },
          (err) => console.error(err)
        )
    })
  }
}
