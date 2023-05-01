/**
 * @TODO: Define all the actions (creator) for the threads state
 */

import { hideLoading, showLoading } from 'react-redux-loading-bar';
import dicodingAPI from '../../utils/dicodingAPI';

const ActionType = {
  RECEIVE_THREADS: 'RECEIVE_THREADS',
  ADD_THREAD: 'ADD_THREAD',
  // TOGGLE_LIKE_THREAD: 'TOGGLE_LIKE_THREAD',
  UPVOTE_THREAD: 'UPVOTE_THREAD',
  DOWNVOTE_THREAD: 'DOWNVOTE_THREAD',
  NEUTRALVOTE_THREAD: 'NEUTRALVOTE_THREAD',
};

function receiveThreadsActionCreator(threads) {
  return {
    type: ActionType.RECEIVE_THREADS,
    payload: {
      threads,
    },
  };
}

function addThreadActionCreator(thread) {
  return {
    type: ActionType.ADD_THREAD,
    payload: {
      thread,
    },
  };
}

// function toggleLikeThreadActionCreator({ threadId, userId }) {
//   return {
//     type: ActionType.TOGGLE_LIKE_THREAD,
//     payload: {
//       threadId,
//       userId,
//     },
//   };
// }

function upvoteThreadActionCreator({ threadId, userId }) {
  return {
    type: ActionType.UPVOTE_THREAD,
    payload: {
      threadId,
      userId,
    },
  };
}

function downvoteThreadActionCreator({ threadId, userId }) {
  return {
    type: ActionType.UPVOTE_THREAD,
    payload: {
      threadId,
      userId,
    },
  };
}

function neutralvoteThreadActionCreator({ threadId, userId }) {
  return {
    type: ActionType.UPVOTE_THREAD,
    payload: {
      threadId,
      userId,
    },
  };
}

function asyncAddThread({ title = '', body = '', category }) {
  return async (dispatch) => {
    dispatch(showLoading());
    try {
      const thread = await dicodingAPI.createThread({ title, body, category });
      dispatch(addThreadActionCreator(thread));
    } catch (error) {
      alert(error.message);
    }
    dispatch(hideLoading());
  };
}

function asyncToogleLikeThread(threadId) {
  return async (dispatch, getState) => {
    dispatch(showLoading());

    const { authUser } = getState();
    dispatch(toggleLikeThreadActionCreator({ threadId, userId: authUser.id }));

    try {
      await dicodingAPI.toggleLikeThread(threadId);
    } catch (error) {
      alert(error.message);
      dispatch(toggleLikeThreadActionCreator({ threadId, userId: authUser.id }));
    }

    dispatch(hideLoading());
  };
}

export {
  ActionType,
  receiveThreadsActionCreator,
  addThreadActionCreator,
  toggleLikeThreadActionCreator,
  asyncAddThread,
  asyncToogleLikeThread,
};
