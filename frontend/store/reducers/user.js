import * as actionsTypes from "../actions/actionsTypes";

const initialState = {
  currentUser: null,
  posts: [],
  following: [],
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionsTypes.USER_STATE_CHANGE:
      return {
        ...state,
        currentUser: action.currentUser,
      };
    case actionsTypes.USER_POSTS_STATE_CHANGE:
      return {
        ...state,
        posts: action.posts,
      };
    case actionsTypes.ADD_USER_DATA_TO_POST:
      return {
        ...state,
        posts: state.posts.map((post) => {
          let newPost = {
            ...post,
            user: action.user,
          };
          return newPost;
        }),
      };
    case actionsTypes.USER_FOLLOWING_STATE_CHANGE:
      return {
        ...state,
        following: action.following,
      };
    case actionsTypes.USER_LIKES_STATE_CHANGE:
      return {
        ...state,
        posts: state.posts.map((post) =>
          post.id == action.postId
            ? {
                ...post,
                currentUserLike: action.currentUserLike,
              }
            : post
        ),
      };
    case actionsTypes.CLEAR_DATA:
      return initialState;
    default:
      return state;
  }
};

export default userReducer;
