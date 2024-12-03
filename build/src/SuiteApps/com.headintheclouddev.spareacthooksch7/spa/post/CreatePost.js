import { jsx as _jsx, jsxs as _jsxs } from "@uif-js/core/jsx-runtime";
import { useState } from "@uif-js/core";
import { TextArea, TextBox } from "@uif-js/component";
import record from 'N/record';
export default function CreatePost(props) {
    // const { state, dispatch } = useContext(StateContext); // These are left here because the StateContext didn't work :(
    // const { user } = state; // TODO: To get the author's id, need to add it as a prop above and pass down from App :(
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const createPost = (params) => {
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
    };
    function handleTitle(evt) {
        console.log('handleTitle');
        setTitle(evt.text);
    }
    function handleContent(evt) {
        console.log('handleContent');
        setContent(evt.text);
    }
    function handleCreate() {
        createPost({ title, content, author: props.user });
        props.dispatch({ type: 'CREATE_POST', title, content, author: props.user });
    }
    return (
    // <form onSubmit={(e: FormDataEvent) => { e.preventDefault(); handleCreate(); } }>
    _jsxs("div", { children: [_jsxs("div", { children: ["Author: ", _jsx("b", { children: props.user })] }), _jsxs("div", { children: [_jsx("label", { htmlFor: "create-title", children: "Title:" }), _jsx(TextBox, { type: TextBox.Type.TEXT, name: "create-title", text: title, onTextChanged: handleTitle })] }), _jsx(TextArea, { text: content, onTextChanged: handleContent }), _jsx("input", { type: "button", value: "Create", onClick: handleCreate })] })
    // </form>
    );
}
