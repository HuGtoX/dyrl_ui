import{_ as z}from"./index.vue_vue_type_style_index_0_lang.Dvt3Q--O.js";import{c as S}from"./create.BCteNkO5.js";import{a as m,g,o as k}from"./format.B9x3PRfW.js";import{d as v,h as d,o as l,c as i,r as y,n as c,k as a,P as f,e as h,b as B,F as C,E as _,j as $}from"./framework.CTHohdEj.js";function N(s){for(var p=-1,o=s==null?0:s.length,e=0,r=[];++p<o;){var n=s[p];n&&(r[e++]=n)}return r}const b={options:{virtualHost:!0,multipleSlots:!0,styleIsolation:"apply-shared"}},U=v({...b,__name:"index",props:{size:{},type:{default:"circular"},color:{},vertical:{type:Boolean},textSize:{},textColor:{}},setup(s){const[p,o]=S("loading"),e=s,r=d(()=>N([e.color&&{color:e.color},e.size&&g(e.size)])),n=d(()=>k({fontSize:m(e.textSize),color:e.textColor??e.color}));return(t,x)=>(l(),i("div",{class:c(a(o)([t.type,{vertical:t.vertical}]))},[y(t.$slots,"icon",{},()=>[t.type==="circular"?(l(),B(z,{key:0,spin:"",size:a(m)(t.size),color:t.color,type:"LoadingOutlined"},null,8,["size","color"])):(l(),i("span",{key:1,class:c(a(o)("spinner",t.type)),style:f(r.value)},[(l(),i(C,null,_(12,u=>$("i",{key:u,class:c(a(o)("line",String(u+1)))},null,2)),64))],6))]),t.$slots.default?(l(),i("span",{key:0,class:c(a(o)("text")),style:f(n.value)},[y(t.$slots,"default")],6)):h("",!0)],2))}});export{U as _};
