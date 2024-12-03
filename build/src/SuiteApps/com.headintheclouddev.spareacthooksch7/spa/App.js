import { jsx as _jsx, jsxs as _jsxs } from "@uif-js/core/jsx-runtime";
import { useReducer, useEffect, VDom, useState } from '@uif-js/core';
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
export default function App() {
    log.debug('App', `Initializing at ${new Date()}`);
    const [theme, setTheme] = useState({ primaryColor: 'deepskyblue', secondaryColor: 'coral' });
    const [state, dispatch] = useReducer(appReducer, { user: '', posts: [], error: '' });
    const { user, posts, error } = state;
    const getPosts = () => {
        query.runSuiteQL.promise({ query: `SELECT id, name AS title, custrecord_blog_content AS content, BUILTIN.DF(owner) AS author FROM customrecord_blog_post` }).then((resultSet) => {
            const results = resultSet.asMappedResults();
            dispatch({ type: 'FETCH_POSTS', posts: results });
        });
    };
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
        }
        else {
            document.title = 'React Hooks Blog';
        }
    }, [user]);
    const context = {
        // [StateContext]: { state, dispatch }, // This doesn't seem to work
        [ThemeContext]: theme
    };
    return (_jsx(VDom.Context, { value: context, children: _jsxs("div", { style: { padding: 8 }, children: [_jsx(HeaderBar, { user: user, posts: posts, postDispatch: dispatch, setTheme: setTheme, userBarDispatch: dispatch }), _jsx("hr", {}), error && _jsx("b", { children: error }), _jsx(PostList, { posts: posts })] }) }));
}
