import{r,j as e,R as k,d as u}from"./app-w5VNWpVF.js";import{q as y}from"./transition-DorhWL89.js";/**
 * @license @tabler/icons-react v3.1.0 - MIT
 *
 * This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory of this source tree.
 */var C={outline:{xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round"},filled:{xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"currentColor",stroke:"none"}};/**
 * @license @tabler/icons-react v3.1.0 - MIT
 *
 * This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory of this source tree.
 */const p=(t,o,n,s)=>{const a=r.forwardRef(({color:l="currentColor",size:i=24,stroke:c=2,className:m,children:d,...v},x)=>r.createElement("svg",{ref:x,...C[t],width:i,height:i,className:["tabler-icon",`tabler-icon-${o}`,m].join(" "),...t==="filled"?{fill:l}:{strokeWidth:c,stroke:l},...v},[...s.map(([w,f])=>r.createElement(w,f)),...Array.isArray(d)?d:[d]]));return a.displayName=`${n}`,a};/**
 * @license @tabler/icons-react v3.1.0 - MIT
 *
 * This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory of this source tree.
 */var I=p("outline","chevron-down","IconChevronDown",[["path",{d:"M6 9l6 6l6 -6",key:"svg-0"}]]);/**
 * @license @tabler/icons-react v3.1.0 - MIT
 *
 * This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory of this source tree.
 */var F=p("outline","menu-2","IconMenu2",[["path",{d:"M4 6l16 0",key:"svg-0"}],["path",{d:"M4 12l16 0",key:"svg-1"}],["path",{d:"M4 18l16 0",key:"svg-2"}]]);/**
 * @license @tabler/icons-react v3.1.0 - MIT
 *
 * This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory of this source tree.
 */var A=p("outline","user","IconUser",[["path",{d:"M8 7a4 4 0 1 0 8 0a4 4 0 0 0 -8 0",key:"svg-0"}],["path",{d:"M6 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2",key:"svg-1"}]]);function L(t){const{className:o}=t;return e.jsx(k.Fragment,{children:e.jsx(u,{href:"/",children:e.jsx("img",{src:"/images/logo.png",width:200,className:o})})})}const h=r.createContext(),g=({children:t})=>{const[o,n]=r.useState(!1),s=()=>{n(a=>!a)};return e.jsx(h.Provider,{value:{open:o,setOpen:n,toggleOpen:s},children:e.jsx("div",{className:"relative",children:t})})},j=({children:t})=>{const{open:o,setOpen:n,toggleOpen:s}=r.useContext(h);return e.jsxs(e.Fragment,{children:[e.jsx("div",{onClick:s,children:t}),o&&e.jsx("div",{className:"fixed inset-0 z-40",onClick:()=>n(!1)})]})},b=({align:t="right",width:o="48",contentClasses:n="py-1 bg-white dark:bg-gray-700",children:s})=>{const{open:a,setOpen:l}=r.useContext(h);let i="origin-top";t==="left"?i="ltr:origin-top-left rtl:origin-top-right start-0":t==="right"&&(i="ltr:origin-top-right rtl:origin-top-left end-0");let c="";return o==="48"&&(c="w-48"),e.jsx(e.Fragment,{children:e.jsx(y,{as:r.Fragment,show:a,enter:"transition ease-out duration-200",enterFrom:"opacity-0 scale-95",enterTo:"opacity-100 scale-100",leave:"transition ease-in duration-75",leaveFrom:"opacity-100 scale-100",leaveTo:"opacity-0 scale-95",children:e.jsx("div",{className:`absolute z-50 mt-2 rounded-md shadow-lg ${i} ${c}`,onClick:()=>l(!1),children:e.jsx("div",{className:"rounded-md ring-1 ring-black ring-opacity-5 "+n,children:s})})})})},D=({className:t="",children:o,...n})=>e.jsx(u,{...n,className:"block w-full px-4 py-2 text-start text-sm leading-5 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none focus:bg-gray-100 dark:focus:bg-gray-800 transition duration-150 ease-in-out "+t,children:o});g.Trigger=j;g.Content=b;g.Link=D;const O=g;export{L as A,O as D,A as I,I as a,F as b,p as c};
