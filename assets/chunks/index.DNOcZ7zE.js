import d from"./index.Bqu_uprM.js";import{_ as k,D as p,o as l,c as g,j as u,b as c,e as h,I as y,w,n as f,P as b,r as C}from"./framework.CTHohdEj.js";const T={name:"Keypress",props:{disable:{type:Boolean,default:!1}},mounted(){const t={esc:["Esc","Escape"],tab:"Tab",enter:"Enter",space:[" ","Spacebar"],up:["Up","ArrowUp"],left:["Left","ArrowLeft"],right:["Right","ArrowRight"],down:["Down","ArrowDown"],delete:["Backspace","Delete","Del"]},i=n=>{if(this.disable)return;const r=Object.keys(t).find(e=>{const s=n.key,o=t[e];return o===s||Array.isArray(o)&&o.includes(s)});r&&setTimeout(()=>{this.$emit(r,{})},0)};document.addEventListener("keyup",i)},render:()=>{}},x={name:"uniPopup",components:{RlTransition:d,keypress:T},emits:["change","maskClick"],props:{animation:{type:Boolean,default:!0},type:{type:String,default:"center"},isMaskClick:{type:Boolean,default:null},maskClick:{type:Boolean,default:null},backgroundColor:{type:String,default:"none"},safeArea:{type:Boolean,default:!0},maskBackgroundColor:{type:String,default:"rgba(0, 0, 0, 0.4)"}},watch:{type:{handler:function(t){this.config[t]&&this[this.config[t]](!0)},immediate:!0},isDesktop:{handler:function(t){this.config[t]&&this[this.config[this.type]](!0)},immediate:!0},maskClick:{handler:function(t){this.mkclick=t},immediate:!0},isMaskClick:{handler:function(t){this.mkclick=t},immediate:!0},showPopup(t){document.getElementsByTagName("body")[0].style.overflow=t?"hidden":"visible"}},data(){return{duration:300,ani:[],showPopup:!1,showTrans:!1,popupWidth:0,popupHeight:0,config:{top:"top",bottom:"bottom",center:"center",left:"left",right:"right",message:"top",dialog:"center",share:"bottom"},maskClass:{position:"fixed",bottom:0,top:0,left:0,right:0,backgroundColor:"rgba(0, 0, 0, 0.4)"},transClass:{position:"fixed",left:0,right:0},maskShow:!0,mkclick:!0,popupstyle:"top"}},computed:{isDesktop(){return this.popupWidth>=500&&this.popupHeight>=500},bg(){return this.backgroundColor===""||this.backgroundColor==="none"?"transparent":this.backgroundColor}},mounted(){(()=>{const{windowWidth:i,windowHeight:n,windowTop:r,safeArea:e,screenHeight:s,safeAreaInsets:o}=uni.getSystemInfoSync();this.popupWidth=i,this.popupHeight=n+(r||0),e&&this.safeArea?(this.safeAreaInsets=s-e.bottom,this.safeAreaInsets=o.bottom):this.safeAreaInsets=0})()},destroyed(){this.setH5Visible()},unmounted(){this.setH5Visible()},created(){this.isMaskClick===null&&this.maskClick===null?this.mkclick=!0:this.mkclick=this.isMaskClick!==null?this.isMaskClick:this.maskClick,this.animation?this.duration=300:this.duration=0,this.messageChild=null,this.clearPropagation=!1,this.maskClass.backgroundColor=this.maskBackgroundColor},methods:{setH5Visible(){document.getElementsByTagName("body")[0].style.overflow="visible"},closeMask(){this.maskShow=!1},disableMask(){this.mkclick=!1},clear(t){t.stopPropagation(),this.clearPropagation=!0},open(t){if(this.showPopup)return;if(t&&["top","center","bottom","left","right","message","dialog","share"].indexOf(t)!==-1||(t=this.type),!this.config[t]){console.error("缺少类型：",t);return}this[this.config[t]](),this.$emit("change",{show:!0,type:t})},close(t){this.showTrans=!1,this.$emit("change",{show:!1,type:this.type}),clearTimeout(this.timer),this.timer=setTimeout(()=>{this.showPopup=!1},300)},touchstart(){this.clearPropagation=!1},onTap(){if(this.clearPropagation){this.clearPropagation=!1;return}this.$emit("maskClick"),this.mkclick&&this.close()},top(t){this.popupstyle=this.isDesktop?"fixforpc-top":"top",this.ani=["slide-top"],this.transClass={position:"fixed",left:0,right:0,backgroundColor:this.bg},!t&&(this.showPopup=!0,this.showTrans=!0,this.$nextTick(()=>{this.messageChild&&this.type==="message"&&this.messageChild.timerClose()}))},bottom(t){this.popupstyle="bottom",this.ani=["slide-bottom"],this.transClass={position:"fixed",left:0,right:0,bottom:0,paddingBottom:this.safeAreaInsets+"px",backgroundColor:this.bg},!t&&(this.showPopup=!0,this.showTrans=!0)},center(t){this.popupstyle="center",this.ani=["zoom-out","fade"],this.transClass={position:"fixed",display:"flex",flexDirection:"column",bottom:0,left:0,right:0,top:0,justifyContent:"center",alignItems:"center"},!t&&(this.showPopup=!0,this.showTrans=!0)},left(t){this.popupstyle="left",this.ani=["slide-left"],this.transClass={position:"fixed",left:0,bottom:0,top:0,backgroundColor:this.bg,display:"flex",flexDirection:"column"},!t&&(this.showPopup=!0,this.showTrans=!0)},right(t){this.popupstyle="right",this.ani=["slide-right"],this.transClass={position:"fixed",bottom:0,right:0,top:0,backgroundColor:this.bg,display:"flex",flexDirection:"column"},!t&&(this.showPopup=!0,this.showTrans=!0)}}};function P(t,i,n,r,e,s){const o=p("RlTransition"),m=p("keypress");return e.showPopup?(l(),g("view",{key:0,class:f(["uni-popup",[e.popupstyle,s.isDesktop?"fixforpc-z-index":""]])},[u("view",{onTouchstart:i[1]||(i[1]=(...a)=>s.touchstart&&s.touchstart(...a))},[e.maskShow?(l(),c(o,{key:"1",name:"mask","mode-class":"fade",styles:e.maskClass,duration:e.duration,show:e.showTrans,onClick:s.onTap},null,8,["styles","duration","show","onClick"])):h("",!0),y(o,{key:"2","mode-class":e.ani,name:"content",styles:e.transClass,duration:e.duration,show:e.showTrans,onClick:s.onTap},{default:w(()=>[u("view",{class:f(["uni-popup__wrapper",[e.popupstyle]]),style:b({backgroundColor:s.bg}),onClick:i[0]||(i[0]=(...a)=>s.clear&&s.clear(...a))},[C(t.$slots,"default")],6)]),_:3},8,["mode-class","styles","duration","show","onClick"])],32),e.maskShow?(l(),c(m,{key:0,onEsc:s.onTap},null,8,["onEsc"])):h("",!0)],2)):h("",!0)}const S=k(x,[["render",P]]);export{S as default};
