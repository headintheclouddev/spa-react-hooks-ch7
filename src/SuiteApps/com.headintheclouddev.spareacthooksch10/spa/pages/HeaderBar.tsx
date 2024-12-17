import { useContext } from '@uif-js/core';
import { ThemeContext } from '../contexts';
import Header from "../Header";
import ChangeTheme, {ITheme} from "../ChangeTheme";
import UserBar from "../user/UserBar";
import CreatePost from "../post/CreatePost";
import {IPostProps} from "../post/Post";

export default function HeaderBar(props: { user: string, posts: IPostProps[], setTheme: (theme: ITheme) => void, postDispatch: (action: { type: string, title: string, content: string, author: string }) => void, userBarDispatch: (params: { type: string, username: string }) => void }) {
  const theme = useContext(ThemeContext);
  // const { state } = useContext(StateContext);
  // const { user } = state;
  return (
    <div>
      <Header text="React Hooks Blog" />
      <ChangeTheme theme={theme} setTheme={props.setTheme} />
      <br />
      <UserBar user={props.user} dispatch={props.userBarDispatch} />
      <br />
      {props.user && <CreatePost user={props.user} posts={props.posts} dispatch={props.postDispatch} />}
    </div>
  )
}
