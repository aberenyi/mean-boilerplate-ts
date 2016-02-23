//counter.ts
import {Reducer, Action} from '@ngrx/store';
import {User} from './user.model.ts'

export const REGISTER_USER = 'REGISTER_USER';
export const RESET_USER = 'RESET_USER';

export const UserReducer: Reducer<User> = (state: User = new User(), action: Action) =>
{
  switch (action.type)
  {
    case REGISTER_USER:
      console.log(`[User] Incoming ${action.type}`)
      return new User(action.payload)

    case RESET_USER:
      console.log(`[User] Incoming ${action.type}`)
      return new User();

    default:
      return state;
  }
}
