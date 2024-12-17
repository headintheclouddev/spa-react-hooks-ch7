import { jsx as _jsx, jsxs as _jsxs } from "@uif-js/core/jsx-runtime";
import { Router, useReducer, useEffect, VDom, useState } from '@uif-js/core';
import appReducer from "./reducers";
import { ThemeContext } from './contexts';
import log from 'N/log';
import HeaderBar from "./pages/HeaderBar";
import HomePage from "./pages/HomePage";
import { RootRoute } from "./BlogAppRoute";
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
    // <PostPage id={6} />
    return (_jsx(Router.Hash, { children: _jsx(VDom.Context, { value: context, children: _jsxs("div", { style: { padding: 8 }, children: [_jsx(HeaderBar, { user: user, posts: posts, postDispatch: dispatch, setTheme: setTheme, userBarDispatch: dispatch }), _jsx("hr", {}), _jsxs(Router.Routes, { children: [_jsx(Router.Route, { path: RootRoute.HOMEPAGE, exact: true, children: _jsx(HomePage, { posts: posts, dispatch: dispatch, error: error }) }), _jsx(Router.Route, { path: RootRoute.POST, exact: true, children: _jsx(PostPage, { id: 0 }) })] })] }) }) }));
}
