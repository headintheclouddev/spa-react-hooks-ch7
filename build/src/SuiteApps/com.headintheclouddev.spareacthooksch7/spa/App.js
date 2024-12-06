import { jsx as _jsx, jsxs as _jsxs } from "@uif-js/core/jsx-runtime";
import { useReducer, useEffect, VDom, useState } from '@uif-js/core';
// import PostList from './post/PostList';
import appReducer from "./reducers";
import { ThemeContext } from './contexts';
import log from 'N/log';
import HeaderBar from "./pages/HeaderBar";
// import HomePage from "./pages/HomePage";
import PostPage from "./pages/PostPage";
export default function App() {
    log.debug('App', `Initializing at ${new Date()}`);
    const [theme, setTheme] = useState({ primaryColor: 'deepskyblue', secondaryColor: 'coral' });
    const [state, dispatch] = useReducer(appReducer, { user: '', posts: [], error: '' });
    const { user, posts, error } = state;
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
    // <HomePage posts={posts} dispatch={dispatch} error={error} />
    return (_jsx(VDom.Context, { value: context, children: _jsxs("div", { style: { padding: 8 }, children: [_jsx(HeaderBar, { user: user, posts: posts, postDispatch: dispatch, setTheme: setTheme, userBarDispatch: dispatch }), _jsx("hr", {}), _jsx(PostPage, { id: 6 })] }) }));
}
