import { jsx as _jsx, jsxs as _jsxs } from "@uif-js/core/jsx-runtime";
import { Route, useContext } from '@uif-js/core';
import { ThemeContext } from '../contexts';
import { RootRoute } from "../BlogAppRoute";
import { Link } from "@uif-js/component";
export default function Post(props) {
    const { secondaryColor } = useContext(ThemeContext);
    let processedContent = props.content;
    if (props.short && props.content.length > 30)
        processedContent = props.content.substring(0, 30) + '...';
    const blogPostRoute = Route.create(RootRoute.POST);
    let linkToFullContent = null;
    if (props.short)
        linkToFullContent = _jsxs("div", { children: [_jsx("br", {}), _jsx(Link, { url: blogPostRoute.constructUrl({ id: props.id }), children: "View full post" })] });
    return (_jsxs("div", { children: [_jsx("h3", { style: { color: secondaryColor }, children: props.title }), _jsx("div", { children: processedContent }), linkToFullContent, _jsx("br", {}), _jsxs("i", { children: ["Written by ", _jsx("b", { children: props.author })] })] }));
}
