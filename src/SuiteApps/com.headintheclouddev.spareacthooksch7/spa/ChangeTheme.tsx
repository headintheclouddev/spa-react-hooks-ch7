import { useEffect, useState } from '@uif-js/core';
import {query} from "N";

// const THEMES: ITheme[] = [
//   { primaryColor: 'deepskyblue', secondaryColor: 'coral' },
//   { primaryColor: 'orchid',      secondaryColor: 'mediumseagreen' }
// ];

function ThemeItem(props: { key: string, theme: ITheme, active: boolean, onClick: () => void }) {
  return (
    <span onClick={props.onClick} style={{ cursor: 'pointer', paddingLeft: '8px', fontWeight: props.active ? 'bold' : 'normal' }}>
      <span style={{ color: props.theme.primaryColor }}>Primary</span> / <span style={{color: props.theme.secondaryColor }}>Secondary</span>
    </span>
  )
}

export default function ChangeTheme(props: { theme: ITheme, setTheme: (theme: ITheme) => void }) {
  const [themes, setThemes] = useState([]);

  const getThemes = () => { // Chapter 6_3: Doing this instead of useResource()
    query.runSuiteQL.promise({ query: `SELECT name, id, custrecord_blog_theme_secondary_color FROM customrecord_blog_theme` }).then((resultSet) => {
      const results: { id: number, name: string, custrecord_blog_theme_secondary_color: string }[] = resultSet.asMappedResults() as any;
      const storedThemes: { id: number, primaryColor: string, secondaryColor: string }[] = [];
      for (const result of results) {
        storedThemes.push({ id: result.id, primaryColor: result.name, secondaryColor: result.custrecord_blog_theme_secondary_color });
      }
      setThemes(storedThemes);
    });
  }

  useEffect(getThemes, []);

  function isActive(t: ITheme) {
    return t.primaryColor == props.theme.primaryColor && t.secondaryColor == props.theme.secondaryColor;
  }

  return (
    <div>
      Change theme:
      {themes.map((t, i) =>
        <ThemeItem key={'theme-' + i} theme={t} active={isActive(t)} onClick={ () => props.setTheme(t) } />
      )}
    </div>
  )
}

export interface ITheme {
  primaryColor: string;
  secondaryColor: string;
}
