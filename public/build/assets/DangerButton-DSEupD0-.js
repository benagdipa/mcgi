import{j as e}from"./app-DcU-pHgi.js";function l({className:a="",disabled:s,children:n,loading:t=!1,icon:r=null,type:i="button",...o}){return e.jsxs("button",{...o,type:i,className:`
                inline-flex items-center justify-center gap-2 px-4 py-2 
                bg-danger-600 border border-transparent 
                rounded-md font-medium text-sm text-white 
                tracking-wide shadow-sm 
                hover:bg-danger-500 active:bg-danger-700 
                focus:outline-none focus:ring-2 focus:ring-danger-500 focus:ring-offset-2 
                dark:focus:ring-offset-gray-800 
                disabled:opacity-60 disabled:cursor-not-allowed
                transition-all duration-200 ease-in-out
                ${t?"relative !text-transparent":""}
                ${s&&"opacity-60 cursor-not-allowed"} 
                ${a}
            `,disabled:s||t,"aria-disabled":s||t,"aria-busy":t,children:[t&&e.jsx("div",{className:"absolute inset-0 flex items-center justify-center",children:e.jsxs("svg",{className:"animate-spin h-5 w-5 text-white",xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",children:[e.jsx("circle",{className:"opacity-25",cx:"12",cy:"12",r:"10",stroke:"currentColor",strokeWidth:"4"}),e.jsx("path",{className:"opacity-75",fill:"currentColor",d:"M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"})]})}),r&&e.jsx("span",{className:"w-5 h-5",children:r}),n]})}export{l as D};
