const i=(e,t,s)=>new Promise(r=>{uni.createSelectorQuery().in(t).select(e).boundingClientRect(n=>{n&&r(n)}).exec()}),o=(e=30)=>new Promise(t=>{setTimeout(()=>{t(!0)},e)});export{i as g,o as s};
