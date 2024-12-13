import { VDom } from '@uif-js/core';
import Post, {IPostProps} from './Post';
// import { StateContext } from '../contexts';

export default function PostList(props: { posts: IPostProps[] } = { posts: [] }) {
  // const { state } = useContext(StateContext);
  // const { posts } = state;
  const posts: IPostProps[] = [];
  for (const post of props.posts) {
    posts.push(
      <VDom.Fragment>
        <Post {...post} short={true} />
        <hr />
      </VDom.Fragment>
    );
  }
  return (<div>{posts}</div>);
}
