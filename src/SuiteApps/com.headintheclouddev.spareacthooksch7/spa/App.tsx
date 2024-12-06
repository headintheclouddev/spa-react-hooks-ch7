import { JSX, useReducer, useEffect, VDom, useState } from '@uif-js/core';
// import PostList from './post/PostList';
import appReducer from "./reducers";
import { ThemeContext } from './contexts';
import log from 'N/log';
import HeaderBar from "./pages/HeaderBar";
// import HomePage from "./pages/HomePage";
import PostPage from "./pages/PostPage";

export default function App(): JSX.Element {
  log.debug('App', `Initializing at ${new Date()}`);

  const [theme, setTheme] = useState({ primaryColor: 'deepskyblue', secondaryColor: 'coral' });
  const [state, dispatch] = useReducer(appReducer, { user: '', posts: [], error: '' });
  const { user, posts, error } = state;

  useEffect(() => {
    if (user) {
      document.title = `${user} - React Hooks Blog`;
    } else {
      document.title = 'React Hooks Blog';
    }
  }, [user]);

  const context = {
    // [StateContext]: { state, dispatch }, // This doesn't seem to work
    [ThemeContext]: theme
  };

  // <HomePage posts={posts} dispatch={dispatch} error={error} />
  return (
    <VDom.Context value={context}>
      <div style={{padding: 8}}>
        <HeaderBar user={user} posts={posts} postDispatch={dispatch} setTheme={setTheme} userBarDispatch={dispatch} />
        <hr/>
        <PostPage id={6} />
      </div>
    </VDom.Context>
  )
}
