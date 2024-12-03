import { useState } from "@uif-js/core";
import {TextArea, TextBox} from "@uif-js/component";
import {IPostProps} from "./Post";
import record from 'N/record';

export default function CreatePost(props: { user: string, posts: IPostProps[], dispatch: (action: { type: string, title: string, content: string, author: string }) => void }) {
  // const { state, dispatch } = useContext(StateContext); // These are left here because the StateContext didn't work :(
  // const { user } = state; // TODO: To get the author's id, need to add it as a prop above and pass down from App :(

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const createPost = (params: { title: string, content: string, author: string }) => {
    record.create.promise({ type: 'customrecord_blog_post' }).then((blogPost) => {
      blogPost.setValue('name', params.title);
      blogPost.setValue('custrecord_blog_content', params.content);
      // blogPost.setValue('owner', params.author); // This doesn't work because it isn't the employee id.  maybe revisit after truly implementing login
      blogPost.save.promise().then((id) => {
        console.log("Successfully created blog post", id);
      }).catch((error) => {
        alert(error);
      });
    });
  }

  function handleTitle(evt: TextBox.TextChangedArgs) {
    console.log('handleTitle');
    setTitle(evt.text);
  }
  function handleContent(evt: TextBox.TextChangedArgs) {
    console.log('handleContent');
    setContent(evt.text);
  }
  function handleCreate() {
    createPost({ title, content, author: props.user });
    props.dispatch({ type: 'CREATE_POST', title, content, author: props.user });
  }

  return (
    // <form onSubmit={(e: FormDataEvent) => { e.preventDefault(); handleCreate(); } }>
    <div>
      <div>Author: <b>{props.user}</b></div>
      <div>
        <label htmlFor="create-title">Title:</label>
        <TextBox type={TextBox.Type.TEXT} name="create-title" text={title} onTextChanged={handleTitle} />
      </div>
      <TextArea text={content} onTextChanged={handleContent} />
      <input type="button" value="Create" onClick={handleCreate} />
    </div>
    // </form>
  )
}
