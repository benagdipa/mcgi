import{j as t}from"./app-DcU-pHgi.js";const m=({children:x,color:e="primary",variant:s="solid",size:a="md",rounded:b="full",className:n="",dot:l=!1,icon:d=null,...i})=>{var o,g;const r={primary:{solid:"bg-primary-500 text-white",outline:"bg-transparent text-primary-500 border border-primary-500",soft:"bg-primary-100 text-primary-800 dark:bg-primary-800/30 dark:text-primary-200"},secondary:{solid:"bg-secondary-500 text-white",outline:"bg-transparent text-secondary-500 border border-secondary-500",soft:"bg-secondary-100 text-secondary-800 dark:bg-secondary-800/30 dark:text-secondary-200"},success:{solid:"bg-success-500 text-white",outline:"bg-transparent text-success-500 border border-success-500",soft:"bg-success-100 text-success-800 dark:bg-success-800/30 dark:text-success-200"},danger:{solid:"bg-danger-500 text-white",outline:"bg-transparent text-danger-500 border border-danger-500",soft:"bg-danger-100 text-danger-800 dark:bg-danger-800/30 dark:text-danger-200"},warning:{solid:"bg-warning-500 text-white",outline:"bg-transparent text-warning-500 border border-warning-500",soft:"bg-warning-100 text-warning-800 dark:bg-warning-800/30 dark:text-warning-200"},info:{solid:"bg-info-500 text-white",outline:"bg-transparent text-info-500 border border-info-500",soft:"bg-info-100 text-info-800 dark:bg-info-800/30 dark:text-info-200"},gray:{solid:"bg-gray-500 text-white",outline:"bg-transparent text-gray-500 border border-gray-500",soft:"bg-gray-100 text-gray-800 dark:bg-gray-800/30 dark:text-gray-200"}},c={xs:"text-xs px-1.5 py-0.5",sm:"text-xs px-2 py-0.5",md:"text-sm px-2.5 py-0.5",lg:"text-sm px-3 py-1",xl:"text-base px-3.5 py-1.5"},y={xs:"w-1.5 h-1.5",sm:"w-2 h-2",md:"w-2.5 h-2.5",lg:"w-3 h-3",xl:"w-3.5 h-3.5"};return l?t.jsx("span",{className:`
                    inline-block ${y[a]} rounded-full
                    ${((o=r[e])==null?void 0:o.solid)||r.primary.solid}
                    ${n}
                `,...i}):t.jsxs("span",{className:`
                inline-flex items-center justify-center
                ${c[a]}
                ${((g=r[e])==null?void 0:g[s])||r.primary[s]}
                rounded-${b}
                font-medium
                ${n}
            `,...i,children:[d&&t.jsx("span",{className:"mr-1",children:d}),x]})};export{m as B};
