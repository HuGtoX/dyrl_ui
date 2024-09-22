import{_ as m,a9 as f,aa as c,o as u,c as d,r as y,n as p,P as g}from"./framework.CTHohdEj.js";class l{constructor(i,e){this.options=i,this.animation=uni.createAnimation({...i}),this.currentStepAnimates={},this.next=0,this.$=e}_nvuePushAnimates(i,e){let a=this.currentStepAnimates[this.next],s={};if(a?s=a:s={styles:{},config:{}},h.includes(i)){s.styles.transform||(s.styles.transform="");let n="";i==="rotate"&&(n="deg"),s.styles.transform+=`${i}(${e+n}) `}else s.styles[i]=`${e}`;this.currentStepAnimates[this.next]=s}_animateRun(i={},e={}){let a=this.$.$refs.ani.ref;if(a)return new Promise((s,n)=>{nvueAnimation.transition(a,{styles:i,...e},r=>{s()})})}_nvueNextAnimate(i,e=0,a){let s=i[e];if(s){let{styles:n,config:r}=s;this._animateRun(n,r).then(()=>{e+=1,this._nvueNextAnimate(i,e,a)})}else this.currentStepAnimates={},typeof a=="function"&&a(),this.isEnd=!0}step(i={}){return this.animation.step(i),this}run(i){this.$.animationData=this.animation.export(),this.$.timer=setTimeout(()=>{typeof i=="function"&&i()},this.$.durationTime)}}const h=["matrix","matrix3d","rotate","rotate3d","rotateX","rotateY","rotateZ","scale","scale3d","scaleX","scaleY","scaleZ","skew","skewX","skewY","translate","translate3d","translateX","translateY","translateZ"],$=["opacity","backgroundColor"],w=["width","height","left","right","top","bottom"];h.concat($,w).forEach(t=>{l.prototype[t]=function(...i){return this.animation[t](...i),this}});function o(t,i){if(i)return clearTimeout(i.timer),new l(t,i)}const S={name:"rlTransition",emits:["click","change"],props:{show:{type:Boolean,default:!1},modeClass:{type:[Array,String],default(){return"fade"}},duration:{type:Number,default:300},styles:{type:Object,default(){return{}}},customClass:{type:String,default:""},onceRender:{type:Boolean,default:!1}},data(){return{isShow:!1,transform:"",opacity:1,animationData:{},durationTime:300,config:{}}},watch:{show:{handler(t){t?this.open():this.isShow&&this.close()},immediate:!0}},computed:{stylesObject(){let t={...this.styles,"transition-duration":this.duration/1e3+"s"},i="";for(let e in t){let a=this.toLine(e);i+=a+":"+t[e]+";"}return i},transformStyles(){return"transform:"+this.transform+";opacity:"+this.opacity+";"+this.stylesObject}},created(){this.config={duration:this.duration,timingFunction:"ease",transformOrigin:"50% 50%",delay:0},this.durationTime=this.duration},methods:{init(t={}){t.duration&&(this.durationTime=t.duration),this.animation=o(Object.assign(this.config,t),this)},onClick(){this.$emit("click",{detail:this.isShow})},step(t,i={}){if(this.animation){for(let e in t)try{typeof t[e]=="object"?this.animation[e](...t[e]):this.animation[e](t[e])}catch{console.error(`方法 ${e} 不存在`)}return this.animation.step(i),this}},run(t){this.animation&&this.animation.run(t)},open(){clearTimeout(this.timer),this.transform="",this.isShow=!0;let{opacity:t,transform:i}=this.styleInit(!1);typeof t<"u"&&(this.opacity=t),this.transform=i,this.$nextTick(()=>{this.timer=setTimeout(()=>{this.animation=o(this.config,this),this.tranfromInit(!1).step(),this.animation.run(),this.$emit("change",{detail:this.isShow})},20)})},close(t){this.animation&&this.tranfromInit(!0).step().run(()=>{this.isShow=!1,this.animationData=null,this.animation=null;let{opacity:i,transform:e}=this.styleInit(!1);this.opacity=i||1,this.transform=e,this.$emit("change",{detail:this.isShow})})},styleInit(t){let i={transform:""},e=(a,s)=>{s==="fade"?i.opacity=this.animationType(a)[s]:i.transform+=this.animationType(a)[s]+" "};return typeof this.modeClass=="string"?e(t,this.modeClass):this.modeClass.forEach(a=>{e(t,a)}),i},tranfromInit(t){let i=(e,a)=>{let s=null;a==="fade"?s=e?0:1:(s=e?"-100%":"0",a==="zoom-in"&&(s=e?.8:1),a==="zoom-out"&&(s=e?1.2:1),a==="slide-right"&&(s=e?"100%":"0"),a==="slide-bottom"&&(s=e?"100%":"0")),this.animation[this.animationMode()[a]](s)};return typeof this.modeClass=="string"?i(t,this.modeClass):this.modeClass.forEach(e=>{i(t,e)}),this.animation},animationType(t){return{fade:t?1:0,"slide-top":`translateY(${t?"0":"-100%"})`,"slide-right":`translateX(${t?"0":"100%"})`,"slide-bottom":`translateY(${t?"0":"100%"})`,"slide-left":`translateX(${t?"0":"-100%"})`,"zoom-in":`scaleX(${t?1:.8}) scaleY(${t?1:.8})`,"zoom-out":`scaleX(${t?1:1.2}) scaleY(${t?1:1.2})`}},animationMode(){return{fade:"opacity","slide-top":"translateY","slide-right":"translateX","slide-bottom":"translateY","slide-left":"translateX","zoom-in":"scale","zoom-out":"scale"}},toLine(t){return t.replace(/([A-Z])/g,"-$1").toLowerCase()}}},T=["animation"];function C(t,i,e,a,s,n){return f((u(),d("view",{ref:"ani",animation:s.animationData,class:p(e.customClass),style:g(n.transformStyles),onClick:i[0]||(i[0]=(...r)=>n.onClick&&n.onClick(...r))},[y(t.$slots,"default")],14,T)),[[c,s.isShow]])}const A=m(S,[["render",C]]);export{A as default};
