import { combineReducers } from 'redux';
import { routerReducer as router } from 'react-router-redux';
import counter from './modules/counter';
import hackathons from './modules/hackathons';
import hackathon from './modules/hackathon';
import hacks from './modules/hacks';
import hack from './modules/hack';
import user from './modules/user';
import { reducer as notifs } from 're-notif';

export default combineReducers({
  counter,
  hackathons,
  hackathon,
  hacks,
  hack,
  notifs,
  user,
  router
});
