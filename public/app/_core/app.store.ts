import {User} from '../user/user.model'
import {Project} from '../project/project.model'

export interface AppStore
{
  user$: User,
  projects$: Project[]
}
