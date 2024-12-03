import { jsx as _jsx, jsxs as _jsxs } from "@uif-js/core/jsx-runtime";
import { Button } from "@uif-js/component";
export default function Logout(props) {
    function handleLogout() {
        console.log('LOGOUT');
        // evt.preventDefault();
        props.dispatch({ type: 'LOGOUT' });
    }
    // const logoutButton = <input type="button" value="Logout" onClick={handleLogout} />;
    return (
    // <form onSubmit={(e: FormDataEvent) => { e.preventDefault(); props.setUser(''); } }>
    _jsxs("div", { children: ["Logged in as: ", _jsx("b", { children: props.user }), " ", _jsx(Button, { label: "Logout", action: handleLogout })] })
    // </form>
    );
}
