import { JSX, Router, useReducer, useEffect, VDom, useState } from '@uif-js/core';
import appReducer from "./reducers";
import { ThemeContext } from './contexts';
import log from 'N/log';
import HeaderBar from "./pages/HeaderBar";
import HomePage from "./pages/HomePage";
import {RootRoute} from "./BlogAppRoute";
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

  // <PostPage id={6} />
  return (
    <Router.Hash>
      <VDom.Context value={context}>
        <div style={{padding: 8}}>
          <HeaderBar user={user} posts={posts} postDispatch={dispatch} setTheme={setTheme} userBarDispatch={dispatch} />
          <hr/>
          <Router.Routes>
            <Router.Route path={RootRoute.HOMEPAGE} exact={true}>
              <HomePage posts={posts} dispatch={dispatch} error={error} />
            </Router.Route>
            <Router.Route path={RootRoute.POST} exact={true}>
              <PostPage id={0} />
            </Router.Route>
          </Router.Routes>
        </div>
      </VDom.Context>
    </Router.Hash>
  )
}
