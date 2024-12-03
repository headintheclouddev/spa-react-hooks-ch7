import {useEffect, useState} from '@uif-js/core';
import {TextBox} from "@uif-js/component";
import record from "N/record";

export default function Register(props: { dispatch: (params: { type: string, username: string }) => void }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const [userId, setUserId] = useState(0);

  const register = (params: { username: string, password: string }) => {
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
  }

  useEffect(() => {
    debugger;
    if (userId) {
      props.dispatch({ type: 'REGISTER', username: username })
    }
  }, [userId])

  const eventHandlers = {
    [TextBox.Event.TEXT_CHANGED]: ({text}) => {
      console.log('Login username changed to', text); // Runs on every keystroke
      setUsername(text);
    }
  }
  function handlePassword(evt: TextBox.TextChangedArgs) {
    setPassword(evt.text);
  }
  function handlePassword2(evt: TextBox.TextChangedArgs) {
    setPassword2(evt.text);
  }
  function handleRegister() {
    register({ username, password });
    // props.dispatch({ type: 'REGISTER', username: username })
  }

  // disabled=false is still disabled here in UIF, so we have to do this instead
  let submitButton = <input type="button" value="Register" onClick={handleRegister} />
  if (username.length == 0 || password.length == 0 || password != password2) submitButton = <input type="button" value="Register" disabled onClick={handleRegister} />

  return (
    <div>
      <label htmlFor="register-username">Username:</label>
      <TextBox type={TextBox.Type.TEXT} name="register-username" text={username} on={eventHandlers} />
      <label htmlFor="register-password">Password:</label>
      <TextBox type={TextBox.Type.PASSWORD} name="register-password" text={password} onTextChanged={handlePassword} />
      <label htmlFor="register-password-repeat">Repeat password:</label>
      <TextBox type={TextBox.Type.PASSWORD} name="register-password-repeat" text={password2} onTextChanged={handlePassword2} />
      {submitButton}
    </div>
    // <form onSubmit={(e: FormDataEvent) => { e.preventDefault(); props.setUser(username); }}>
    // </form>
  );
}
