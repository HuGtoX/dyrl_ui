import{c as d}from"./create.BCteNkO5.js";import{g}from"./format.B9x3PRfW.js";import{d as u,h as f,o as i,c as n,j as r,n as s,k as e,P as _,t as y,e as S,r as v,_ as h}from"./framework.CTHohdEj.js";import"./Uint8Array.s5ylH1oV.js";const z=["src"],k={name:"rl-empty",options:{virtualHost:!0}},w=u({...k,props:{imageSize:{},imageStyle:{},description:{},image:{default:"data"}},setup(m){const[c,t]=d("empty"),o=m,p="https://school-resource.dyjy2828.com.cn/mini-app/images",l=f(()=>["data","message","404","page"].includes(o.image)?p+`/icons/none/no${o.image}.svg`:o.image);return(a,B)=>(i(),n("div",{class:s(e(c))},[r("div",{class:s(e(t)("image__wrapper")),style:_([e(g)(a.imageSize),a.imageStyle])},[r("image",{class:s(e(t)("image__wrapper-image")),src:l.value,mode:"widthFix"},null,10,z)],6),a.description?(i(),n("span",{key:0,class:s(e(t)("description"))},y(a.description),3)):S("",!0),r("div",{class:s(e(t)("wrapper"))},[v(a.$slots,"default",{},void 0,!0)],2)],2))}}),V=h(w,[["__scopeId","data-v-cfe3a3ff"]]);export{V as default};
