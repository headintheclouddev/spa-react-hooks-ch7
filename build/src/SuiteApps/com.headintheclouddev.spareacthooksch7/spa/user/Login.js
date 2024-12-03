import { jsx as _jsx, jsxs as _jsxs } from "@uif-js/core/jsx-runtime";
import { useEffect, useState } from '@uif-js/core';
import { TextBox } from "@uif-js/component";
import query from 'N/query';
export default function Login(props) {
    const [username, setUsername] = useState('');
    const [loginFailed, setLoginFailed] = useState(false);
    const [password, setPassword] = useState('');
    const [user, setUser] = useState(null);
    const login = (params) => {
        query.runSuiteQL.promise({
            query: `SELECT id FROM contact WHERE entityid = ? AND custentity_blog_password = ?`,
            params: [params.username, params.password],
        }).then((resultSet) => {
            const results = resultSet.asMappedResults();
            if (results.length) {
                setUser({ data: [{ username: params.username, id: results[0].id }] });
            }
            else {
                setUser({ error: 'No match' });
            }
        });
    };
    useEffect(() => {
        if (user && user.data) {
            if (user.data.length > 0) {
                setLoginFailed(false);
                props.dispatch({ type: 'LOGIN', username: user.data[0].username });
            }
            else {
                setLoginFailed(true);
            }
        }
        if (user && user.error) {
            setLoginFailed(true);
        }
    }, [user]);
    const eventHandlers = {
        [TextBox.Event.TEXT_CHANGED]: ({ text }) => {
            console.log('Login username changed to', text); // Runs on every keystroke
            setUsername(text);
        }
    };
    function handleLogin() {
        // props.dispatch({ type: 'LOGIN', username })
        login({ username, password });
    }
    function handlePassword(evt) {
        setPassword(evt.text);
    }
    // disabled=false is still disabled here in UIF, so we have to do this instead
    const submitButton = username ? _jsx("input", { type: "button", value: "Login", onClick: handleLogin }) :
        _jsx("input", { type: "button", value: "Login", disabled: true, onClick: handleLogin });
    const errorSpan = loginFailed ? _jsx("span", { style: { color: 'red' }, children: " Invalid username or password" }) : null;
    return (
    // <form onSubmit={(e: FormDataEvent) => {
    //   console.log('Login form submitted');
    //   e.preventDefault();
    //   props.setUser(username);
    // }}>
    _jsxs("div", { children: [_jsx("label", { htmlFor: "login-username", children: "Username:" }), _jsx(TextBox, { type: TextBox.Type.TEXT, name: "login-username", text: username, on: eventHandlers }), _jsx("label", { htmlFor: "login-password", children: "Password:" }), _jsx(TextBox, { type: TextBox.Type.PASSWORD, name: "login-password", text: password, onTextChanged: handlePassword }), submitButton, errorSpan] })
    // </form>
    );
}
