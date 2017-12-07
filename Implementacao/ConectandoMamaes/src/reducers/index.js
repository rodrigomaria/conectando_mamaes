import { combineReducers } from 'redux';
import currentUser from './reducer_user';
import posts from './reducer_savePost';

export default combineReducers({
  currentUser,
  posts
});
