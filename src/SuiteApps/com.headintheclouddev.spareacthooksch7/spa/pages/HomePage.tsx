import { useEffect } from '@uif-js/core';
// import { StateContext } from '../contexts';
import PostList from "../post/PostList";
import query from "N/query";
import {IPostProps} from "../post/Post";

export default function HomePage(props: { posts: IPostProps[], dispatch: (action: { type: string, posts: IPostProps[] }) => void, error: string }) {
  // const { state, dispatch } = useContext(StateContext);
  // const { error } = state;

  const getPosts = () => { // Chapter 6_3: Doing this instead of useResource()
    query.runSuiteQL.promise({ query: `SELECT id, name AS title, custrecord_blog_content AS content, BUILTIN.DF(owner) AS author FROM customrecord_blog_post` }).then((resultSet) => {
      const results: { id: number, title: string, content: string, author: string }[] = resultSet.asMappedResults() as any;
      props.dispatch({ type: 'FETCH_POSTS', posts: results });
    });
  }

  useEffect(getPosts, []);
  useEffect(() => {
    // if (props.posts && props.posts.error) {
    //   props.dispatch({ type: 'POSTS_ERROR' });
    // }
    if (props.posts) {
      props.dispatch({ type: 'FETCH_POSTS', posts: props.posts.reverse() });
    }
  }, [props.posts]);

  return (
    <div>
      {props.error && <b>{props.error}</b>}
      <PostList posts={props.posts} />
    </div>
  );
}
