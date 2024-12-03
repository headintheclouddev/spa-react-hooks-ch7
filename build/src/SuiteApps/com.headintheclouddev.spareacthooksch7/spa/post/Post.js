import { jsx as _jsx, jsxs as _jsxs } from "@uif-js/core/jsx-runtime";
import { useContext } from '@uif-js/core';
import { ThemeContext } from '../contexts';
export default function Post(props) {
    const { secondaryColor } = useContext(ThemeContext);
    return (_jsxs("div", { children: [_jsx("h3", { style: { color: secondaryColor }, children: props.title }), _jsx("div", { children: props.content }), _jsx("br", {}), _jsxs("i", { children: ["Written by ", _jsx("b", { children: props.author })] })] }));
}
