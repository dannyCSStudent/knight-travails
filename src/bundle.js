(()=>{"use strict";(()=>{const t=document.querySelector(".chessboard");for(let e=0;e<8;e++)for(let s=0;s<8;s++){const c=document.createElement("div"),d=`${s}-${Math.abs(e-7)}`;c.classList.add("content"),c.setAttribute("id",d),c.classList.add((s+e)%2==0?"white":"black"),t.appendChild(c)}})()})();