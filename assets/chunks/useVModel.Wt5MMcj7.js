import{h as V,a5 as m}from"./framework.CTHohdEj.js";const x=n=>typeof n<"u";function b(n,e,a,c={}){var r,u,s;const{eventName:d,defaultValue:f}=c,t=m(),l=a||(t==null?void 0:t.emit)||((r=t==null?void 0:t.$emit)==null?void 0:r.bind(t))||((s=(u=t==null?void 0:t.proxy)==null?void 0:u.$emit)==null?void 0:s.bind(t==null?void 0:t.proxy));let o=d;e||(e="modelValue"),o=o||`update:${e.toString()}`;const g=()=>x(n[e])?n[e]:f,p=i=>{l(o,i)};return V({get(){return g()},set(i){p(i)}})}export{b as u};
