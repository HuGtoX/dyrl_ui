import{c as v}from"./create.BCteNkO5.js";import{u as g}from"./useChildren.WzgsDbGx.js";import"./subscribeFocus.BcBnV_Yo.js";import{C as x}from"./index.B74d_eQ5.js";import{d as V,v as B,o as E,c as y,r as z,n as G,k as H,_ as K}from"./framework.CTHohdEj.js";const N={name:"rl-checkbox-group",options:{virtualHost:!0}},O=V({...N,props:{max:{},shape:{default:"square"},disabled:{type:Boolean},iconSize:{default:18},direction:{default:"vertical"},modelValue:{},checkedColor:{default:"#1989fa"}},emits:["update:modelValue","change"],setup(d,{expose:u,emit:i}){const[S,p]=v("checkbox-group"),t=d,c=i,{linkChildren:m,children:r}=g(x),l=e=>c("update:modelValue",e),f=(e={})=>{let o=t.modelValue||[];typeof e=="boolean"&&(e={checked:e});const{checked:h,skipDisabled:k}=e,_=r.map(a=>a.name);o=o.filter(a=>!_.includes(a));const C=r.filter(a=>{var s,n;return(s=a.props)!=null&&s.bindGroup?(n=a.props)!=null&&n.disabled&&k?a.checked.value:h??!a.checked.value:!1}),b=o.concat(C.map(a=>a.name));l(b)};return B(()=>t.modelValue,e=>c("change",e)),m({props:t,updateValue:l}),u({toggleAll:f}),(e,o)=>(E(),y("div",{class:G(H(p)([e.direction]))},[z(e.$slots,"default",{},void 0,!0)],2))}}),P=K(O,[["__scopeId","data-v-8e50e861"]]);export{P as default};
