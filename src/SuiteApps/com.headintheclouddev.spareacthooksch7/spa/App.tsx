import { JSX, useReducer, useEffect, VDom, useState } from '@uif-js/core';
// import UserBar from './user/UserBar';
import PostList from './post/PostList';
// import CreatePost from './post/CreatePost';
import appReducer from "./reducers";
// import Header from './Header';
// import ChangeTheme from './ChangeTheme';
import { ThemeContext } from './contexts';
import log from 'N/log';
import query from "N/query";
import HeaderBar from "./pages/HeaderBar";

// const defaultPosts: IPostProps[] = [
//   { title: 'React Hooks', content: 'The greatest thing since sliced bread!', author: 'Daniel Bugl' },
//   { title: 'Using React Fragments', content: 'Keeping the DOM tree clean!', author: 'Daniel Bugl' }
// ];

export default function App(): JSX.Element {
  log.debug('App', `Initializing at ${new Date()}`);

  const [theme, setTheme] = useState({ primaryColor: 'deepskyblue', secondaryColor: 'coral' });
  const [state, dispatch] = useReducer(appReducer, { user: '', posts: [], error: '' });
  const { user, posts, error } = state;

  const getPosts = () => { // Chapter 6_3: Doing this instead of useResource()
    query.runSuiteQL.promise({ query: `SELECT id, name AS title, custrecord_blog_content AS content, BUILTIN.DF(owner) AS author FROM customrecord_blog_post` }).then((resultSet) => {
      const results: { id: number, title: string, content: string, author: string }[] = resultSet.asMappedResults() as any;
      dispatch({ type: 'FETCH_POSTS', posts: results });
    });
  }

  useEffect(getPosts, []);
  useEffect(() => {
    if (posts && posts.error) {
      dispatch({ type: 'POSTS_ERROR' });
    }
    if (posts && posts.data) {
      dispatch({ type: 'FETCH_POSTS', posts: posts.data.reverse() });
    }
  }, [posts]);


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

  return (
    <VDom.Context value={context}>
      <div style={{padding: 8}}>
        <HeaderBar user={user} posts={posts} postDispatch={dispatch} setTheme={setTheme} userBarDispatch={dispatch} />
        <hr/>
        {error && <b>{error}</b>}
        <PostList posts={posts} />
      </div>
    </VDom.Context>
  )
}
