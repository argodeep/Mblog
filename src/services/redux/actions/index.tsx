import { SET_USER, SET_USERS} from './types';
import { User } from '../../models/user';

export const setUser = (user: User|null) => {
  return {
    type: SET_USER,
    data: user
  }
}


export const setUsers = (user: User[]) => {
  return {
    type: SET_USERS,
    data: user
  }
}
