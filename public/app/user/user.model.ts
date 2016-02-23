import {Injectable} from 'angular2/core'

@Injectable()
export class User
{
  uid: string
  role: string
  groups: string[]
  constructor(profile = {uid: null, role: null, groups: []})
  {
    Object.assign(this, profile)
  }

  public hasRole(role): Boolean
  {
    return this.role === role
  }
}
