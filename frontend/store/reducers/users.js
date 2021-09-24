import * as actionsTypes from "../actions/actionsTypes";

const initialState = {
  users: [],
  feed: [],
};

const usersReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionsTypes.USERS_DATA_STATE_CHANGE:
      return {
        ...state,
        users: [...state.users, action.user],
      };
    case actionsTypes.USERS_POSTS_STATE_CHANGE:
      return {
        ...state,
        feed: [...state.feed, ...action.posts],
      };
    case actionsTypes.RELOAD_USERS_POSTS:
      return {
        ...state,
        feed: [...state.feed, ...action.posts],
      };
    case actionsTypes.USERS_LIKES_STATE_CHANGE:
      return {
        ...state,
        feed: state.feed.map((post) =>
          post.id == action.postId
            ? {
                ...post,
                currentUserLike: action.currentUserLike,
              }
            : post
        ),
      };
    case actionsTypes.REMOVE_POSTS_UNFOLLOWED_USER:
      return {
        ...state,
        users: state.users.filter((post) => post.uid !== action.uid),
        feed: state.feed.filter((post) => post.user.uid !== action.uid),
      };
    case actionsTypes.LIKE_POST_USER:
      const indexPostL = state.feed.findIndex(
        (post) => post.id === action.postId
      );
      return {
        ...state,
        feed: state.feed.map((post, i) =>
          i === indexPostL ? { ...post, likesCount: post.likesCount + 1 } : post
        ),
      };
    case actionsTypes.DISLIKE_POST_USER:
      const indexPostD = state.feed.findIndex(
        (post) => post.id === action.postId
      );
      return {
        ...state,
        feed: state.feed.map((post, i) =>
          i === indexPostD ? { ...post, likesCount: post.likesCount - 1 } : post
        ),
      };
    case actionsTypes.CLEAR_DATA:
      return initialState;
    default:
      return state;
  }
};

export default usersReducer;
