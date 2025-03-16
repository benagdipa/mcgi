import{r as t,j as l}from"./app-DcU-pHgi.js";const x=t.forwardRef(function({type:d="text",className:c="",isFocused:o=!1,hasError:a=!1,...n},r){const s=t.useRef(null),[f,u]=t.useState(!1);t.useEffect(()=>{var e,i;o&&s.current.focus(),u(((i=(e=s.current)==null?void 0:e.value)==null?void 0:i.length)>0)},[o]);const g=e=>{u(e.target.value.length>0),n.onInput&&n.onInput(e)};return l.jsx("div",{className:"relative",children:l.jsx("input",{...n,type:d,className:`
                    w-full rounded-md border px-4 py-3 text-base shadow-sm transition-colors duration-200
                    ${a?"border-red-500 focus:border-red-500 focus:ring focus:ring-red-200":"border-gray-300 focus:border-primary focus:ring focus:ring-primary/20"}
                    ${f?"bg-white":"bg-gray-50 hover:bg-gray-100"}
                    disabled:bg-gray-100 disabled:cursor-not-allowed
                    ${c}
                `,ref:e=>{r&&(typeof r=="function"?r(e):r.current=e),s.current=e},"aria-invalid":a,onInput:g})})});export{x as T};
