import {Reducer, Action} from '@ngrx/store'
import {Project} from './project.model.ts'

//export const REGISTER_PROJECT = 'REGISTER_PROJECT';
export const REGISTER_PROJECTS = 'REGISTER_PROJECTS'
export const RESET_PROJECTS = 'RESET_PROJECTS'
export const UPDATE_PROJECT = 'UPDATE_PROJECT'

export const ProjectsReducer: Reducer<Array<Project>> = (state: Array<Project> = [], action: Action) =>
{
  switch (action.type)
  {
    //case REGISTER_PROJECT:
    //  console.log(`[Project] Incoming ${action.type} `)
    //  return [...state, new Project(action.payload)]

    case REGISTER_PROJECTS:
      console.log(`[Project] Incoming ${action.type} `)
      return [...state, ...action.payload.map(data => new Project(data))]

    case RESET_PROJECTS:
      console.log(`[Project] Incoming ${action.type} `)
      return []

    case UPDATE_PROJECT:
      console.log(`[Project] Incoming ${action.type} `)
      return state.map(project => project._id === action.payload._id
        ? Object.assign(new Project(), project, action.payload)
        : project)

    default:
      return state;
  }
}
