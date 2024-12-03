import {IPostProps} from "./post/Post";

function userReducer(state: string, action: { type: string, username: string }) {
  switch (action.type) {
    case 'LOGIN':
    case 'REGISTER':
      return action.username;
    case 'LOGOUT':
      return '';
    default:
      return state;
      // throw new Error(`Unknown action type ${action.type}`);
  }
}

function postsReducer(state: IPostProps[], action: { type: string, title: string, content: string, author: string, posts: IPostProps[] }) {
  console.log('postsReducer state', state);
  switch (action.type) {
    case 'FETCH_POSTS':
      return action.posts;
    case 'CREATE_POST':
      const newPost = { title: action.title, content: action.content, author: action.author };
      return [newPost, ...state];
    default:
      return state;
      // throw new Error(`Unknown action type ${action.type}`);
  }
}

function errorReducer(state: string, action: { type: string }) {
  switch (action.type) {
    case 'POSTS_ERROR':
      return 'Failed to fetch posts';
    default:
      return state;
  }
}

export default function appReducer(state: { user: string, posts: IPostProps[], error: string }, action: { type: string, title: string, content: string, author: string, username: string, posts: IPostProps[] }) {
  console.log('appReducer state', state);
  return {
    user: userReducer(state.user, action),
    posts: postsReducer(state.posts, action),
    error: errorReducer(state.error, action)
  };
}
