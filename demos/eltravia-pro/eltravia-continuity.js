(()=>{'use strict';if(matchMedia('(prefers-reduced-motion: reduce)').matches||!matchMedia('(hover:hover)').matches)return;
const selectors='.pro-offer-card,.pro-benefit,.pro-why__grid article,.pro-catalog .category-card,.pro-catalog .service-tile';
document.addEventListener('pointermove',e=>{const c=e.target.closest(selectors);if(!c)return;const r=c.getBoundingClientRect();c.style.setProperty('--pro-x',(100*(e.clientX-r.left)/Math.max(1,r.width)).toFixed(1)+'%');c.style.setProperty('--pro-y',(100*(e.clientY-r.top)/Math.max(1,r.height)).toFixed(1)+'%')},{passive:true});
})();