import {Injectable} from 'angular2/core'

@Injectable()
export class Project
{
  _id: string
  url: string
  groups: string[]
  favourite: Boolean = false
  constructor(config: Object = {_id: null, url: null, groups: [], favourite: false})
  {
    Object.assign(this, config)
  }

  public getUrlPart(part): string
  {
    let index = part === 'client' ? 0 : 1;
    return this.url.split('/')[index]
  }
}
