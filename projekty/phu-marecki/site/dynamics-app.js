(() => {
'use strict';
const main=document.getElementById('appMain');
if(!main || window.matchMedia('(prefers-reduced-motion: reduce)').matches)return;
let scheduled=false;
const observer=new MutationObserver(()=>{
 if(scheduled)return;scheduled=true;
 requestAnimationFrame(()=>{scheduled=false; main.classList.remove('phu-app-enter'); void main.offsetWidth; main.classList.add('phu-app-enter');});
});
observer.observe(main,{childList:true});
main.classList.add('phu-app-enter');
})();
