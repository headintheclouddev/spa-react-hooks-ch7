define(["exports","@uif-js/core/jsx-runtime","@uif-js/core","N/log","N","@uif-js/component","N/query","N/record"],(function(e,t,s,o,n,r,c,a){"use strict";function i(e,t){switch(t.type){case"LOGIN":case"REGISTER":return t.username;case"LOGOUT":return"";default:return e}}function u(e,t){switch(console.log("postsReducer state",e),t.type){case"FETCH_POSTS":return t.posts;case"CREATE_POST":return[{title:t.title,content:t.content,author:t.author,id:t.id},...e];default:return e}}function l(e,t){return"POSTS_ERROR"===t.type?"Failed to fetch posts":e}function d(e,t){return console.log("appReducer state",e),{user:i(e.user,t),posts:u(e.posts,t),error:l(e.error,t)}}const p=s.ContextType.new("theme-context");s.ContextType.new("state-context");const x=e=>{const{primaryColor:o}=s.useContext(p);return t.jsx("h1",{style:{color:o},children:e.text})};function h(e){return t.jsxs("span",{onClick:e.onClick,style:{cursor:"pointer",paddingLeft:"8px",fontWeight:e.active?"bold":"normal"},children:[t.jsx("span",{style:{color:e.theme.primaryColor},children:"Primary"})," / ",t.jsx("span",{style:{color:e.theme.secondaryColor},children:"Secondary"})]})}function m(e){const[o,r]=s.useState([]);function c(t){return t.primaryColor==e.theme.primaryColor&&t.secondaryColor==e.theme.secondaryColor}return s.useEffect((()=>{n.query.runSuiteQL.promise({query:"SELECT name, id, custrecord_blog_theme_secondary_color FROM customrecord_blog_theme"}).then((e=>{const t=e.asMappedResults(),s=[];for(const e of t)s.push({id:e.id,primaryColor:e.name,secondaryColor:e.custrecord_blog_theme_secondary_color});r(s)}))}),[]),t.jsxs("div",{children:["Change theme:",o.map(((s,o)=>t.jsx(h,{theme:s,active:c(s),onClick:()=>e.setTheme(s)},"theme-"+o)))]})}function j(e){const[o,n]=s.useState(""),[a,i]=s.useState(!1),[u,l]=s.useState(""),[d,p]=s.useState(null);s.useEffect((()=>{d&&d.data&&(d.data.length>0?(i(!1),e.dispatch({type:"LOGIN",username:d.data[0].username})):i(!0)),d&&d.error&&i(!0)}),[d]);const x={[r.TextBox.Event.TEXT_CHANGED]:({text:e})=>{console.log("Login username changed to",e),n(e)}};function h(){var e;e={username:o,password:u},c.runSuiteQL.promise({query:"SELECT id FROM contact WHERE entityid = ? AND custentity_blog_password = ?",params:[e.username,e.password]}).then((t=>{const s=t.asMappedResults();s.length?p({data:[{username:e.username,id:s[0].id}]}):p({error:"No match"})}))}const m=o?t.jsx("input",{type:"button",value:"Login",onClick:h}):t.jsx("input",{type:"button",value:"Login",disabled:!0,onClick:h}),j=a?t.jsx("span",{style:{color:"red"},children:" Invalid username or password"}):null;return t.jsxs("div",{children:[t.jsx("label",{htmlFor:"login-username",children:"Username:"}),t.jsx(r.TextBox,{type:r.TextBox.Type.TEXT,name:"login-username",text:o,on:x}),t.jsx("label",{htmlFor:"login-password",children:"Password:"}),t.jsx(r.TextBox,{type:r.TextBox.Type.PASSWORD,name:"login-password",text:u,onTextChanged:function(e){l(e.text)}}),m,j]})}function y(e){return t.jsxs("div",{children:["Logged in as: ",t.jsx("b",{children:e.user})," ",t.jsx(r.Button,{label:"Logout",action:function(){console.log("LOGOUT"),e.dispatch({type:"LOGOUT"})}})]})}function g(e){const[o,n]=s.useState(""),[c,i]=s.useState(""),[u,l]=s.useState(""),[d,p]=s.useState(0);s.useEffect((()=>{d&&e.dispatch({type:"REGISTER",username:o})}),[d]);const x={[r.TextBox.Event.TEXT_CHANGED]:({text:e})=>{console.log("Login username changed to",e),n(e)}};function h(){var e;e={username:o,password:c},a.create.promise({type:"contact"}).then((t=>{t.setValue("subsidiary","1"),t.setValue("entityid",e.username),t.setValue("custentity_blog_password",e.password),t.save.promise().then((e=>{console.log("Successfully created contact",e),p(e)})).catch((e=>{alert(e)}))}))}let m=t.jsx("input",{type:"button",value:"Register",onClick:h});return 0!=o.length&&0!=c.length&&c==u||(m=t.jsx("input",{type:"button",value:"Register",disabled:!0,onClick:h})),t.jsxs("div",{children:[t.jsx("label",{htmlFor:"register-username",children:"Username:"}),t.jsx(r.TextBox,{type:r.TextBox.Type.TEXT,name:"register-username",text:o,on:x}),t.jsx("label",{htmlFor:"register-password",children:"Password:"}),t.jsx(r.TextBox,{type:r.TextBox.Type.PASSWORD,name:"register-password",text:c,onTextChanged:function(e){i(e.text)}}),t.jsx("label",{htmlFor:"register-password-repeat",children:"Repeat password:"}),t.jsx(r.TextBox,{type:r.TextBox.Type.PASSWORD,name:"register-password-repeat",text:u,onTextChanged:function(e){l(e.text)}}),m]})}function T(e){return e.user?t.jsx(y,{user:e.user,dispatch:e.dispatch}):t.jsxs(s.VDom.Fragment,{children:[t.jsx(j,{dispatch:e.dispatch}),t.jsx(g,{dispatch:e.dispatch})]})}function f(e){const[o,n]=s.useState(""),[c,i]=s.useState(""),[u,l]=s.useState(null);return s.useEffect((()=>{u&&u.data&&e.dispatch({type:"CREATE_POST",...u.data})}),[u]),t.jsxs("div",{children:[t.jsxs("div",{children:["Author: ",t.jsx("b",{children:e.user})]}),t.jsxs("div",{children:[t.jsx("label",{htmlFor:"create-title",children:"Title:"}),t.jsx(r.TextBox,{type:r.TextBox.Type.TEXT,name:"create-title",text:o,onTextChanged:function(e){console.log("handleTitle"),n(e.text)}})]}),t.jsx(r.TextArea,{text:c,onTextChanged:function(e){console.log("handleContent"),i(e.text)}}),t.jsx("input",{type:"button",value:"Create",onClick:function(){var t;t={title:o,content:c,author:e.user},a.create.promise({type:"customrecord_blog_post"}).then((e=>{e.setValue("name",t.title),e.setValue("custrecord_blog_content",t.content),e.save.promise().then((e=>{console.log("Successfully created blog post",e),l({data:{...t,id:e}})})).catch((e=>{alert(e)}))}))}})]})}function S(e){const o=s.useContext(p);return t.jsxs("div",{children:[t.jsx(x,{text:"React Hooks Blog"}),t.jsx(m,{theme:o,setTheme:e.setTheme}),t.jsx("br",{}),t.jsx(T,{user:e.user,dispatch:e.userBarDispatch}),t.jsx("br",{}),e.user&&t.jsx(f,{user:e.user,posts:e.posts,dispatch:e.postDispatch})]})}function C(e){const{secondaryColor:o}=s.useContext(p);let n=e.content;e.short&&e.content.length>30&&(n=e.content.substring(0,30)+"...");let c=null;return e.short&&(c=t.jsxs("div",{children:[t.jsx("br",{}),t.jsx(r.Link,{route:{route:"/view/:id",parameters:{id:e.id}},children:"View full post"})]})),t.jsxs("div",{children:[t.jsx("h3",{style:{color:o},children:e.title}),t.jsx("div",{children:n}),c,t.jsx("br",{}),t.jsxs("i",{children:["Written by ",t.jsx("b",{children:e.author})]})]})}function b(e={posts:[]}){const o=[];for(const n of e.posts)o.push(t.jsxs(s.VDom.Fragment,{children:[t.jsx(C,{...n,short:!0}),t.jsx("hr",{})]}));return t.jsx("div",{children:o})}function E(e){return s.useEffect((()=>{c.runSuiteQL.promise({query:"SELECT id, name AS title, custrecord_blog_content AS content, BUILTIN.DF(owner) AS author FROM customrecord_blog_post"}).then((t=>{const s=t.asMappedResults();e.dispatch({type:"FETCH_POSTS",posts:s})}))}),[]),s.useEffect((()=>{e.posts&&e.dispatch({type:"FETCH_POSTS",posts:e.posts.reverse()})}),[e.posts]),t.jsxs("div",{children:[e.error&&t.jsx("b",{children:e.error}),t.jsx(b,{posts:e.posts})]})}const R="/",v="/view/:id";function _(e){const[o,n]=s.useState(null);return s.useEffect((()=>{var t;t=e.id,c.runSuiteQL.promise({query:`SELECT id, name AS title, custrecord_blog_content AS content, BUILTIN.DF(owner) AS author FROM customrecord_blog_post WHERE id = ${t}`}).then((e=>{const t=e.asMappedResults();t.length>0&&n({id:t[0].id,data:{title:t[0].title,content:t[0].content,author:t[0].author}})}))}),[e.id]),t.jsxs("div",{children:[t.jsx(r.Link,{route:{route:"/"},children:"Go back"}),o&&o.data?t.jsx(C,{...o.data}):"Loading...",t.jsx("hr",{})]})}function w(){o.debug("App",`Initializing at ${new Date}`);const[e,n]=s.useState({primaryColor:"deepskyblue",secondaryColor:"coral"}),[r,c]=s.useReducer(d,{user:"",posts:[],error:""}),{user:a,posts:i,error:u}=r;s.useEffect((()=>{document.title=a?`${a} - React Hooks Blog`:"React Hooks Blog"}),[a]);const l={[p]:e};return t.jsx(s.Router.Hash,{children:t.jsx(s.VDom.Context,{value:l,children:t.jsxs("div",{style:{padding:8},children:[t.jsx(S,{user:a,posts:i,postDispatch:c,setTheme:n,userBarDispatch:c}),t.jsx("hr",{}),t.jsxs(s.Router.Routes,{children:[t.jsx(s.Router.Route,{path:R,exact:!0,children:t.jsx(E,{posts:i,dispatch:c,error:u})}),t.jsx(s.Router.Route,{path:v,exact:!0,children:t.jsx(_,{id:0})})]})]})})})}e.run=function(e){console.log("SpaClient version 241213a - run",e),e.setLayout("application"),e.setContent(t.jsx(w,{}))}}));
