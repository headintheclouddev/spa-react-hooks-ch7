import { useContext } from '@uif-js/core';
import { ThemeContext } from '../contexts';

export default function Post(props: IPostProps) {
  const { secondaryColor } = useContext(ThemeContext);
  return (
    <div>
      <h3 style={{ color: secondaryColor }}>{props.title}</h3>
      <div>{props.content}</div>
      <br />
      <i>Written by <b>{props.author}</b></i>
    </div>
  )
}

export interface IPostProps {
  title: string;
  content: string;
  author: string;
}
