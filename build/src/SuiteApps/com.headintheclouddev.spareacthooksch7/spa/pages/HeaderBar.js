import { jsx as _jsx, jsxs as _jsxs } from "@uif-js/core/jsx-runtime";
import { useContext } from '@uif-js/core';
import { ThemeContext } from '../contexts';
import Header from "../Header";
import ChangeTheme from "../ChangeTheme";
import UserBar from "../user/UserBar";
import CreatePost from "../post/CreatePost";
export default function HeaderBar(props) {
    const theme = useContext(ThemeContext);
    // const { state } = useContext(StateContext);
    // const { user } = state;
    return (_jsxs("div", { children: [_jsx(Header, { text: "React Hooks Blog" }), _jsx(ChangeTheme, { theme: theme, setTheme: props.setTheme }), _jsx("br", {}), _jsx(UserBar, { user: props.user, dispatch: props.userBarDispatch }), _jsx("br", {}), props.user && _jsx(CreatePost, { user: props.user, posts: props.posts, dispatch: props.postDispatch })] }));
}
