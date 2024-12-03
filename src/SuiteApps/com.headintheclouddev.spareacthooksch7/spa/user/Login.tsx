import { useEffect, useState } from '@uif-js/core';
import {TextBox} from "@uif-js/component";
import query from 'N/query'

export default function Login(props: { dispatch: (params: { type: string, username: string }) => void }) {
  const [username, setUsername] = useState('');
  const [loginFailed, setLoginFailed] = useState(false);
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);

  const login = (params: { username: string; password: string }) => {
    query.runSuiteQL.promise({
      query: `SELECT id FROM contact WHERE entityid = ? AND custentity_blog_password = ?`,
      params: [params.username, params.password],
    }).then((resultSet) => {
      const results: { id: number }[] = resultSet.asMappedResults() as any;
      if (results.length) {
        setUser({ data: [{ username: params.username, id: results[0].id }] });
      } else {
        setUser({ error: 'No match' });
      }
    });
  }

  useEffect(() => {
    if (user && user.data) {
      if (user.data.length > 0) {
        setLoginFailed(false);
        props.dispatch({ type: 'LOGIN', username: user.data[0].username })
      } else {
        setLoginFailed(true);
      }
    }
    if (user && user.error) {
      setLoginFailed(true);
    }
  }, [user])

  const eventHandlers = {
    [TextBox.Event.TEXT_CHANGED]: ({text}) => {
      console.log('Login username changed to', text); // Runs on every keystroke
      setUsername(text);
    }
  }

  function handleLogin() {
    // props.dispatch({ type: 'LOGIN', username })
    login({username, password});
  }

  function handlePassword(evt: TextBox.TextChangedArgs) {
    setPassword(evt.text);
  }

  // disabled=false is still disabled here in UIF, so we have to do this instead
  const submitButton = username ? <input type="button" value="Login" onClick={handleLogin}/> :
    <input type="button" value="Login" disabled onClick={handleLogin}/>
  const errorSpan = loginFailed ? <span style={{color: 'red'}}> Invalid username or password</span> : null;

  return (
    // <form onSubmit={(e: FormDataEvent) => {
    //   console.log('Login form submitted');
    //   e.preventDefault();
    //   props.setUser(username);
    // }}>
    <div>
      <label htmlFor="login-username">Username:</label>
      <TextBox type={TextBox.Type.TEXT} name="login-username" text={username} on={eventHandlers}/>
      <label htmlFor="login-password">Password:</label>
      <TextBox type={TextBox.Type.PASSWORD} name="login-password" text={password} onTextChanged={handlePassword}/>
      {submitButton}
      {errorSpan}
    </div>
    // </form>
  )
}
