import { useContext } from '@uif-js/core';
import { ThemeContext } from './contexts';

const Header = (props: { text: string }) => {
  const { primaryColor } = useContext(ThemeContext);
  return <h1 style={{ color: primaryColor }}>{props.text}</h1>
}

export default Header;
