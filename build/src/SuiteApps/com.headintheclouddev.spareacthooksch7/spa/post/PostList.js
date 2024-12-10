import { jsx as _jsx, jsxs as _jsxs } from "@uif-js/core/jsx-runtime";
import { VDom } from '@uif-js/core';
import Post from './Post';
// import { StateContext } from '../contexts';
export default function PostList(props = { posts: [] }) {
    // const { state } = useContext(StateContext);
    // const { posts } = state;
    const posts = [];
    for (const post of props.posts) {
        posts.push(_jsx("div", { children: _jsxs(VDom.Fragment, { children: [_jsx(Post, { ...post, short: true }), _jsx("hr", {})] }) }));
    }
    return (_jsx("div", { children: posts }));
}
