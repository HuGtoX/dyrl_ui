import{d,o,c as t,n as a,r,e as n,j as l}from"./framework.CTHohdEj.js";const i={options:{styleIsolation:"apply-shared",virtualHost:!0,multipleSlots:!0}},u=d({...i,__name:"index",props:{mode:{default:"card"},style:{}},setup(c){const e="list";return(s,p)=>(o(),t("div",{class:a([e,`${e}-${s.mode}`])},[s.$slots.header?(o(),t("div",{key:0,class:a(`${e}-header`)},[r(s.$slots,"header")],2)):n("",!0),l("div",{class:a(`${e}-body`)},[l("div",{class:a(`${e}-body-inner`)},[r(s.$slots,"default")],2)],2)],2))}});export{u as _};
