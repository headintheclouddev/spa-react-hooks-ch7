import query from "N/query";
import { useEffect, useState } from "@uif-js/core";
import Post from "../post/Post";

export default function PostPage(props: { id: number }) {
  const [post, setPost] = useState(null);
  const getPost = (id: number) => { // Chapter 6_3: Doing this instead of useResource()
    query.runSuiteQL.promise({
      query: `SELECT id, name AS title, custrecord_blog_content AS content, BUILTIN.DF(owner) AS author FROM customrecord_blog_post WHERE id = ${id}`
    }).then((resultSet) => {
      const results: { id: number, title: string, content: string, author: string }[] = resultSet.asMappedResults() as any;
      if (results.length > 0) setPost({ id: results[0].id, data: { title: results[0].title, content: results[0].content, author: results[0].author } });
    });
  }

  useEffect(() => {
    getPost(props.id);
  }, [props.id]);
  return (
    <div>
      {(post && post.data) ? <Post {...post.data} /> : 'Loading...'}
      <hr />
    </div>
  )
}
