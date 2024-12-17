import { jsx as _jsx, jsxs as _jsxs } from "@uif-js/core/jsx-runtime";
import { useEffect, useState } from '@uif-js/core';
import { TextBox } from "@uif-js/component";
import record from "N/record";
export default function Register(props) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [password2, setPassword2] = useState('');
    const [userId, setUserId] = useState(0);
    const register = (params) => {
        record.create.promise({ type: 'contact' }).then((contact) => {
            contact.setValue('subsidiary', '1');
            contact.setValue('entityid', params.username);
            contact.setValue('custentity_blog_password', params.password);
            contact.save.promise().then((id) => {
                console.log("Successfully created contact", id);
                setUserId(id);
            }).catch((error) => {
                alert(error);
            });
        });
    };
    useEffect(() => {
        debugger;
        if (userId) {
            props.dispatch({ type: 'REGISTER', username: username });
        }
    }, [userId]);
    const eventHandlers = {
        [TextBox.Event.TEXT_CHANGED]: ({ text }) => {
            console.log('Login username changed to', text); // Runs on every keystroke
            setUsername(text);
        }
    };
    function handlePassword(evt) {
        setPassword(evt.text);
    }
    function handlePassword2(evt) {
        setPassword2(evt.text);
    }
    function handleRegister() {
        register({ username, password });
        // props.dispatch({ type: 'REGISTER', username: username })
    }
    // disabled=false is still disabled here in UIF, so we have to do this instead
    let submitButton = _jsx("input", { type: "button", value: "Register", onClick: handleRegister });
    if (username.length == 0 || password.length == 0 || password != password2)
        submitButton = _jsx("input", { type: "button", value: "Register", disabled: true, onClick: handleRegister });
    return (_jsxs("div", { children: [_jsx("label", { htmlFor: "register-username", children: "Username:" }), _jsx(TextBox, { type: TextBox.Type.TEXT, name: "register-username", text: username, on: eventHandlers }), _jsx("label", { htmlFor: "register-password", children: "Password:" }), _jsx(TextBox, { type: TextBox.Type.PASSWORD, name: "register-password", text: password, onTextChanged: handlePassword }), _jsx("label", { htmlFor: "register-password-repeat", children: "Repeat password:" }), _jsx(TextBox, { type: TextBox.Type.PASSWORD, name: "register-password-repeat", text: password2, onTextChanged: handlePassword2 }), submitButton] })
    // <form onSubmit={(e: FormDataEvent) => { e.preventDefault(); props.setUser(username); }}>
    // </form>
    );
}
