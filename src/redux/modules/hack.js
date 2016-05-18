import axios from 'axios';
import { reducer as notifReducer, actions as notifActions, Notifs } from 're-notif';
const { notifSend } = notifActions;
import notification from './notification';

export const HACK = 'HACK';
export const UPDATE = 'UPDATE';

// ------------------------------------
// Actions
// ------------------------------------
export function hack (value: Object): Action {
  return {
    type: HACK,
    payload: value
  };
}

export function update (value: Object): Action {
  return {
    type: UPDATE,
    payload: value
  };
}

export const fetchFromServer = (id) => (dispatch) => {
  // TODO use config path instead
  axios.get('http://localhost:3000/api/hacks/' + id)
    .then((res) => {
      dispatch(hack(res.data));
    });
};

export const reset = () => (dispatch) => {
  dispatch(hack({}));
};

export const updateToSever = (id, req) => (dispatch) => {
  // TODO use config path instead
  if(id) {
    axios.put('http://localhost:3000/api/hacks/' + id, req)
      .then((res) => {
        dispatch(update(res.data));
        dispatch(notifSend(notification(res.data.title + ' is now updated', 'success')));
      });
  } else {
    axios.post('http://localhost:3000/api/hacks/', req)
      .then((res) => {
        dispatch(update(res.data));
        dispatch(notifSend(notification(res.data.title + ' is now created', 'success')));
      });
  }
};

export const actions = {
  fetchFromServer,
  updateToSever,
  reset
};

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [HACK]: (state: Object, action: {payload: Object}): Object => action.payload,
  [UPDATE]: (state: Object, action: {payload: Object}) : Object => action.payload
};

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = new Object();
export default function hackReducer (state: Object = initialState, action: Action): Object {
  const handler = ACTION_HANDLERS[action.type];

  return handler ? handler(state, action) : state;
}
