import { Route, useContext } from '@uif-js/core';
import { ThemeContext } from '../contexts';
import {RootRoute} from "../BlogAppRoute";
import {Link} from "@uif-js/component";

export default function Post(props: IPostProps) {
  const {secondaryColor} = useContext(ThemeContext);
  let processedContent = props.content;
  if (props.short && props.content.length > 30) processedContent = props.content.substring(0, 30) + '...';
  const blogPostRoute = Route.create(RootRoute.POST);
  let linkToFullContent = null;
  if (props.short) linkToFullContent = <div><br/><Link url={blogPostRoute.constructUrl({ id: props.id })}>View full post</Link></div>
  return (
    <div>
      <h3 style={{color: secondaryColor}}>{props.title}</h3>
      <div>{processedContent}</div>
      {linkToFullContent}
      <br/>
      <i>Written by <b>{props.author}</b></i>
    </div>
  )
}

export interface IPostProps {
  id: number;
  title: string;
  content: string;
  author: string;
  short?: boolean;
}
