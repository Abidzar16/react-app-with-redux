/**
 * @TODO: Define reducer for the users state
 */

import { ActionType } from './action';
// import { ActionType } from './actionAPI';

function usersReducer(users = [], action = {}) {
  switch (action.type) {
    case ActionType.RECEIVE_USERS:
      return action.payload.users;
    default:
      return users;
  }
}

export default usersReducer;
