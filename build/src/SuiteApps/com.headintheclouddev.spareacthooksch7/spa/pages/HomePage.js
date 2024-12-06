import { jsx as _jsx, jsxs as _jsxs } from "@uif-js/core/jsx-runtime";
import { useEffect } from '@uif-js/core';
// import { StateContext } from '../contexts';
import PostList from "../post/PostList";
import query from "N/query";
export default function HomePage(props) {
    // const { state, dispatch } = useContext(StateContext);
    // const { error } = state;
    const getPosts = () => {
        query.runSuiteQL.promise({ query: `SELECT id, name AS title, custrecord_blog_content AS content, BUILTIN.DF(owner) AS author FROM customrecord_blog_post` }).then((resultSet) => {
            const results = resultSet.asMappedResults();
            props.dispatch({ type: 'FETCH_POSTS', posts: results });
        });
    };
    useEffect(getPosts, []);
    useEffect(() => {
        // if (props.posts && props.posts.error) {
        //   props.dispatch({ type: 'POSTS_ERROR' });
        // }
        if (props.posts) {
            props.dispatch({ type: 'FETCH_POSTS', posts: props.posts.reverse() });
        }
    }, [props.posts]);
    return (_jsxs("div", { children: [props.error && _jsx("b", { children: props.error }), _jsx(PostList, { posts: props.posts })] }));
}
