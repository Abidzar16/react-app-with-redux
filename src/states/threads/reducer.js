/**
 * @TODO: Define the reducer for the threads state
 */

import { ActionType } from './action';

function threadsReducer(threads = [], action = {}) {
  const { userId } = action.payload;

  switch (action.type) {
    case ActionType.RECEIVE_THREADS:
      return action.payload.threads;
    case ActionType.ADD_THREAD:
      return [action.payload.thread, ...threads];
    case ActionType.UPVOTE_THREAD:
      return threads.map((thread) => {
        if (thread.id === action.payload.threadId) {
          const { upVotesBy } = thread;
          return {
            ...thread,
            upVotesBy: upVotesBy.includes(userId)
              ? upVotesBy.filter((id) => id !== userId)
              : upVotesBy.concat([userId]),
          };
        }
        return thread;
      });
    case ActionType.DOWNVOTE_THREAD:
      return threads.map((thread) => {
        if (thread.id === action.payload.threadId) {
          const { downVotesBy } = thread;
          return {
            ...thread,
            downVotesBy: downVotesBy.includes(userId)
              ? downVotesBy.filter((id) => id !== userId)
              : downVotesBy.concat([userId]),
          };
        }
        return thread;
      });
    case ActionType.NEUTRALVOTE_THREAD:
      return threads.map((thread) => {
        if (thread.id === action.payload.threadId) {
          const { upVotesBy, downVotesBy } = thread;
          return {
            ...thread,
            upVotesBy: upVotesBy.includes(userId)
              ? upVotesBy.filter((id) => id !== userId)
              : upVotesBy.concat([userId]),
            downVotesBy: downVotesBy.includes(userId)
              ? downVotesBy.filter((id) => id !== userId)
              : downVotesBy.concat([userId]),
          };
        }
        return thread;
      });
    default:
      return threads;
  }
}

export default threadsReducer;
