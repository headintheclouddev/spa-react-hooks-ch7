import { VDom } from '@uif-js/core';
import Login from './Login';
import Logout from './Logout';
import Register from './Register';
// import { StateContext } from '../contexts';

export default function UserBar(props: { user: string, dispatch: (params: { type: string, username: string }) => void }) {
  if (props.user) {
    return <Logout user={props.user} dispatch={props.dispatch} />;
  } else {
    return (
      <VDom.Fragment>
        <Login dispatch={props.dispatch} />
        <Register dispatch={props.dispatch} />
      </VDom.Fragment>
    )
  }
}
