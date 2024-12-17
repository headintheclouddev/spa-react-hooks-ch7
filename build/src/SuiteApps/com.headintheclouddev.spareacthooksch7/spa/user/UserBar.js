import { jsx as _jsx, jsxs as _jsxs } from "@uif-js/core/jsx-runtime";
import { VDom } from '@uif-js/core';
import Login from './Login';
import Logout from './Logout';
import Register from './Register';
// import { StateContext } from '../contexts';
export default function UserBar(props) {
    if (props.user) {
        return _jsx(Logout, { user: props.user, dispatch: props.dispatch });
    }
    else {
        return (_jsxs(VDom.Fragment, { children: [_jsx(Login, { dispatch: props.dispatch }), _jsx(Register, { dispatch: props.dispatch })] }));
    }
}
