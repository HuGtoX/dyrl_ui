import{j as e}from"./Uint8Array.s5ylH1oV.js";import{d as s,e as f}from"./format.B9x3PRfW.js";var a=/\s/;function o(r){for(var t=r.length;t--&&a.test(r.charAt(t)););return t}var c=/^\s+/;function m(r){return r&&r.slice(0,o(r)+1).replace(c,"")}var n=NaN,p=/^[-+]0x[0-9a-f]+$/i,b=/^0b[01]+$/i,I=/^0o[0-7]+$/i,d=parseInt;function O(r){if(typeof r=="number")return r;if(s(r))return n;if(e(r)){var t=typeof r.valueOf=="function"?r.valueOf():r;r=e(t)?t+"":t}if(typeof r!="string")return r===0?r:+r;r=m(r);var i=b.test(r);return i||I.test(r)?d(r.slice(2),i?2:8):p.test(r)?n:+r}function B(r,t){return f(r,t)}export{B as i,O as t};
