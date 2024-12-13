import { jsx as _jsx, jsxs as _jsxs } from "@uif-js/core/jsx-runtime";
import query from "N/query";
import { useEffect, useState } from "@uif-js/core";
import Post from "../post/Post";
import { Link } from "@uif-js/component";
export default function PostPage(props) {
    const [post, setPost] = useState(null);
    const getPost = (id) => {
        query.runSuiteQL.promise({
            query: `SELECT id, name AS title, custrecord_blog_content AS content, BUILTIN.DF(owner) AS author FROM customrecord_blog_post WHERE id = ${id}`
        }).then((resultSet) => {
            const results = resultSet.asMappedResults();
            if (results.length > 0)
                setPost({ id: results[0].id, data: { title: results[0].title, content: results[0].content, author: results[0].author } });
        });
    };
    useEffect(() => {
        getPost(props.id);
    }, [props.id]);
    return (_jsxs("div", { children: [_jsx(Link, { route: { route: '/' }, children: "Go back" }), (post && post.data) ? _jsx(Post, { ...post.data }) : 'Loading...', _jsx("hr", {})] }));
}
