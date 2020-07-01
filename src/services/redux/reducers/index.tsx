import { combineReducers } from 'redux';
import { user, users } from './user';


const allReducers = combineReducers({
    user, users
});
export default allReducers;