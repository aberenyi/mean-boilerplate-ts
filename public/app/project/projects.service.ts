import {Injectable} from 'angular2/core'
import {AuthHttp} from 'angular2-jwt'
import {Observable} from 'rxjs/Observable'
import {Response} from 'angular2/http'
import {Store} from '@ngrx/store'

import {Project} from './project.model'
import {AppStore} from '../_core/app.store'
import {REGISTER_PROJECTS, UPDATE_PROJECT} from './projects.reducer'

@Injectable()
export class ProjectsService
{
  projects$: Observable<Array<Project>>
  constructor(private authHttp: AuthHttp, private store: Store<AppStore>)
  {
    this.projects$ = this.store.select('ProjectsReducer')
    //this.fetchProjects()
  }

  public fetchProjects(): void
  {
    this.authHttp
      .get('/api/projects')
      .map((res: Response) => res.json())
      .subscribe
      (
        (data) =>
        {
          this.store.dispatch({type: REGISTER_PROJECTS, payload: data})
        },
        (err) => console.error(err)
      )
  }

  public getProject(url): Observable<Project>
  {
    return this.projects$
      .flatMap(project => project)
      .filter(project => project.url === url)
  }

  public updateItem(project: Project): void
  {
    //this.http.put(`${BASE_URL}${item.id}`, JSON.stringify(item), HEADER)
    //  .subscribe(action => this.store.dispatch({ type: 'UPDATE_ITEM', payload: item }));
    this.store.dispatch({type: UPDATE_PROJECT, payload: project})
  }
}
