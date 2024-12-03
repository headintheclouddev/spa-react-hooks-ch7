import { jsx as _jsx } from "@uif-js/core/jsx-runtime";
import { useContext } from '@uif-js/core';
import { ThemeContext } from './contexts';
const Header = (props) => {
    const { primaryColor } = useContext(ThemeContext);
    return _jsx("h1", { style: { color: primaryColor }, children: props.text });
};
export default Header;
