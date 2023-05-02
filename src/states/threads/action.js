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
    type: ActionType.DOWNVOTE_THREAD,
    payload: {
      threadId,
      userId,
    },
  };
}

function neutralvoteThreadActionCreator({ threadId, userId }) {
  return {
    type: ActionType.NEUTRALVOTE_THREAD,
    payload: {
      threadId,
      userId,
    },
  };
}

function asyncAddThread({ title = '', body = '', category = '' }) {
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

function asyncUpvoteThread(threadId) {
  return async (dispatch, getState) => {
    dispatch(showLoading());

    const { authUser } = getState();
    dispatch(upvoteThreadActionCreator({ threadId, userId: authUser.id }));

    try {
      await dicodingAPI.upVoteThread(threadId);
    } catch (error) {
      alert(error.message);
      dispatch(upvoteThreadActionCreator({ threadId, userId: authUser.id }));
    }

    dispatch(hideLoading());
  };
}

function asyncDownvoteThread(threadId) {
  return async (dispatch, getState) => {
    dispatch(showLoading());

    const { authUser } = getState();
    dispatch(downvoteThreadActionCreator({ threadId, userId: authUser.id }));

    try {
      await dicodingAPI.downVoteThread(threadId);
    } catch (error) {
      alert(error.message);
      dispatch(downvoteThreadActionCreator({ threadId, userId: authUser.id }));
    }

    dispatch(hideLoading());
  };
}

function asyncNeutralvoteThread(threadId) {
  return async (dispatch, getState) => {
    dispatch(showLoading());

    const { authUser } = getState();
    dispatch(neutralvoteThreadActionCreator({ threadId, userId: authUser.id }));

    try {
      await dicodingAPI.neutralVoteThread(threadId);
    } catch (error) {
      alert(error.message);
      dispatch(neutralvoteThreadActionCreator({ threadId, userId: authUser.id }));
    }

    dispatch(hideLoading());
  };
}

export {
  ActionType,
  receiveThreadsActionCreator,
  addThreadActionCreator,
  upvoteThreadActionCreator,
  downvoteThreadActionCreator,
  neutralvoteThreadActionCreator,
  asyncAddThread,
  asyncUpvoteThread,
  asyncDownvoteThread,
  asyncNeutralvoteThread,
};
