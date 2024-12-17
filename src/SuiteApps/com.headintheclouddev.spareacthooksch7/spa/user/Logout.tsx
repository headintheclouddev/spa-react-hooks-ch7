import {Button} from "@uif-js/component";

export default function Logout(props: { user: string, dispatch: (params: { type: string }) => void }) {
  function handleLogout() {
    console.log('LOGOUT');
    // evt.preventDefault();
    props.dispatch({ type: 'LOGOUT' });
  }
  // const logoutButton = <input type="button" value="Logout" onClick={handleLogout} />;
  return (
    // <form onSubmit={(e: FormDataEvent) => { e.preventDefault(); props.setUser(''); } }>
    <div>
      Logged in as: <b>{props.user}</b> <Button label="Logout" action={handleLogout} />
    </div>
    // </form>
  )
}
