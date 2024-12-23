import{r,j as e,R as y,x as m}from"./app-Dtf8gQQv.js";import{q as C}from"./transition-DVSbjTkX.js";/**
 * @license @tabler/icons-react v3.26.0 - MIT
 *
 * This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory of this source tree.
 */var j={outline:{xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round"},filled:{xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"currentColor",stroke:"none"}};/**
 * @license @tabler/icons-react v3.26.0 - MIT
 *
 * This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory of this source tree.
 */const d=(t,o,n,s)=>{const a=r.forwardRef(({color:c="currentColor",size:i=24,stroke:l=2,title:u,className:v,children:g,...x},w)=>r.createElement("svg",{ref:w,...j[t],width:i,height:i,className:["tabler-icon",`tabler-icon-${o}`,v].join(" "),strokeWidth:l,stroke:c,...x},[u&&r.createElement("title",{key:"svg-title"},u),...s.map(([k,f])=>r.createElement(k,f)),...Array.isArray(g)?g:[g]]));return a.displayName=`${n}`,a};/**
 * @license @tabler/icons-react v3.26.0 - MIT
 *
 * This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory of this source tree.
 */var F=d("outline","chevron-down","IconChevronDown",[["path",{d:"M6 9l6 6l6 -6",key:"svg-0"}]]);/**
 * @license @tabler/icons-react v3.26.0 - MIT
 *
 * This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory of this source tree.
 */var A=d("outline","menu-2","IconMenu2",[["path",{d:"M4 6l16 0",key:"svg-0"}],["path",{d:"M4 12l16 0",key:"svg-1"}],["path",{d:"M4 18l16 0",key:"svg-2"}]]);/**
 * @license @tabler/icons-react v3.26.0 - MIT
 *
 * This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory of this source tree.
 */var E=d("outline","user","IconUser",[["path",{d:"M8 7a4 4 0 1 0 8 0a4 4 0 0 0 -8 0",key:"svg-0"}],["path",{d:"M6 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2",key:"svg-1"}]]);function L(t){const{className:o}=t;return e.jsx(y.Fragment,{children:e.jsx(m,{href:"/",children:e.jsx("img",{src:"/images/logo.png",width:200,className:o})})})}const p=r.createContext(),h=({children:t})=>{const[o,n]=r.useState(!1),s=()=>{n(a=>!a)};return e.jsx(p.Provider,{value:{open:o,setOpen:n,toggleOpen:s},children:e.jsx("div",{className:"relative",children:t})})},b=({children:t})=>{const{open:o,setOpen:n,toggleOpen:s}=r.useContext(p);return e.jsxs(e.Fragment,{children:[e.jsx("div",{onClick:s,children:t}),o&&e.jsx("div",{className:"fixed inset-0 z-40",onClick:()=>n(!1)})]})},M=({align:t="right",width:o="48",contentClasses:n="py-1 bg-white dark:bg-gray-700",children:s})=>{const{open:a,setOpen:c}=r.useContext(p);let i="origin-top";t==="left"?i="ltr:origin-top-left rtl:origin-top-right start-0":t==="right"&&(i="ltr:origin-top-right rtl:origin-top-left end-0");let l="";return o==="48"&&(l="w-48"),e.jsx(e.Fragment,{children:e.jsx(C,{as:r.Fragment,show:a,enter:"transition ease-out duration-200",enterFrom:"opacity-0 scale-95",enterTo:"opacity-100 scale-100",leave:"transition ease-in duration-75",leaveFrom:"opacity-100 scale-100",leaveTo:"opacity-0 scale-95",children:e.jsx("div",{className:`absolute z-50 mt-2 rounded-md shadow-lg ${i} ${l}`,onClick:()=>c(!1),children:e.jsx("div",{className:"rounded-md ring-1 ring-black ring-opacity-5 "+n,children:s})})})})},N=({className:t="",children:o,...n})=>e.jsx(m,{...n,className:"block w-full px-4 py-2 text-start text-sm leading-5 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none focus:bg-gray-100 dark:focus:bg-gray-800 transition duration-150 ease-in-out "+t,children:o});h.Trigger=b;h.Content=M;h.Link=N;export{L as A,h as D,E as I,F as a,A as b,d as c};
