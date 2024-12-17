import { jsx as _jsx, jsxs as _jsxs } from "@uif-js/core/jsx-runtime";
import { useEffect, useState } from '@uif-js/core';
import { query } from "N";
// const THEMES: ITheme[] = [
//   { primaryColor: 'deepskyblue', secondaryColor: 'coral' },
//   { primaryColor: 'orchid',      secondaryColor: 'mediumseagreen' }
// ];
function ThemeItem(props) {
    return (_jsxs("span", { onClick: props.onClick, style: { cursor: 'pointer', paddingLeft: '8px', fontWeight: props.active ? 'bold' : 'normal' }, children: [_jsx("span", { style: { color: props.theme.primaryColor }, children: "Primary" }), " / ", _jsx("span", { style: { color: props.theme.secondaryColor }, children: "Secondary" })] }));
}
export default function ChangeTheme(props) {
    const [themes, setThemes] = useState([]);
    const getThemes = () => {
        query.runSuiteQL.promise({ query: `SELECT name, id, custrecord_blog_theme_secondary_color FROM customrecord_blog_theme` }).then((resultSet) => {
            const results = resultSet.asMappedResults();
            const storedThemes = [];
            for (const result of results) {
                storedThemes.push({ id: result.id, primaryColor: result.name, secondaryColor: result.custrecord_blog_theme_secondary_color });
            }
            setThemes(storedThemes);
        });
    };
    useEffect(getThemes, []);
    function isActive(t) {
        return t.primaryColor == props.theme.primaryColor && t.secondaryColor == props.theme.secondaryColor;
    }
    return (_jsxs("div", { children: ["Change theme:", themes.map((t, i) => _jsx(ThemeItem, { theme: t, active: isActive(t), onClick: () => props.setTheme(t) }, 'theme-' + i))] }));
}
