(function(){'use strict';
const $=(s,r=document)=>r.querySelector(s), $$=(s,r=document)=>[...r.querySelectorAll(s)];
let current=1, mobile=window.matchMedia('(max-width:780px)'), total=16, currentTouchX=null, lastDirection='next';
const titles=['Okładka', 'Spis działów', 'Przewody / 1', 'Przewody / 2', 'Aparatura / 1', 'Aparatura / 2', 'Rozdzielnice / 1', 'Rozdzielnice / 2', 'Osprzęt / 1', 'Osprzęt / 2', 'Teletechnika / 1', 'Teletechnika / 2', 'Narzędzia / 1', 'Narzędzia / 2', 'W praktyce', 'Moja lista'];
function visible(){return mobile.matches?[current]:[current,Math.min(current+1,total)]}
function go(n,saveURL=true){let v=Math.max(1,Math.min(total,Number(n)||1));if(!mobile.matches)v=v%2? v:v-1;lastDirection=v<current?'prev':'next';current=v;render();if(saveURL&&mobile.matches){const book=$('#mag-book');if(book)book.scrollIntoView({behavior:window.matchMedia('(prefers-reduced-motion:reduce)').matches?'instant':'smooth',block:'start'});}if(saveURL){let url=new URL(location.href);url.searchParams.set('strona',String(current));try{history.replaceState(null,'',url)}catch(e){}}}
function move(dir){go(current+(mobile.matches?1:2)*dir)}
function render(){const show=visible();$$('.m-page').forEach((p,i)=>{let should=show.includes(i+1);p.dataset.visible=String(should);p.dataset.side=(i+1===current)?'left':'right';p.classList.toggle('turn-prev',lastDirection==='prev');p.setAttribute('aria-hidden',should?'false':'true');$$('a,button,input,select',p).forEach(b=>{if(should)b.removeAttribute('tabindex');else b.tabIndex=-1})});
 for(let id of ['mag-prev','mag-prev-side']){let b=$('#'+id);if(b)b.disabled=current<=1}
 for(let id of ['mag-next','mag-next-side']){let b=$('#'+id);if(b)b.disabled=current+(mobile.matches?0:1)>=total}
 $('#mag-counter').textContent=mobile.matches?String(current).padStart(2,'0')+' / '+total:String(current).padStart(2,'0')+'-'+String(Math.min(total,current+1)).padStart(2,'0')+' / '+total;
 $('#mag-current-label').textContent=mobile.matches?titles[current-1]:titles[current-1]+' / '+titles[Math.min(total-1,current)];$('#mag-select').value=String(current);
 $$('#mag-tabs [data-go]').forEach(b=>b.classList.toggle('active',current===Number(b.dataset.go)||(!mobile.matches&&current===Number(b.dataset.go)-1)));
 renderSummary();
}
function renderSummary(){const el=$('#m-summary-list');if(!el||!window.Nexio)return;const nx=window.Nexio,items=nx.read(),byId=Object.fromEntries(nx.P.map(p=>[p.id,p]));if(!items.length){el.innerHTML='<p>Twoja lista jest pusta. Przejdź do działów i dodaj materiały ze zdjęć.</p>';return}el.innerHTML=items.map(i=>{const p=byId[i.id];return `<div class="m-summary-item"><img src="${p.image}" alt=""><div><b>${p.name}</b><small>${p.unit} | ${p.id.toUpperCase()}</small></div><button type="button" data-change="-1" data-id="${p.id}" aria-label="Odejmij ilość">−</button><strong>${i.qty}</strong><button type="button" data-change="1" data-id="${p.id}" aria-label="Dodaj ilość">+</button></div>`}).join('')}
function init(){if(!$('#mag-book'))return;
 ['mag-prev','mag-prev-side'].forEach(id=>$('#'+id)?.addEventListener('click',()=>move(-1)));
 ['mag-next','mag-next-side'].forEach(id=>$('#'+id)?.addEventListener('click',()=>move(1)));
 $('#mag-select')?.addEventListener('change',e=>go(e.target.value));
 document.addEventListener('click',e=>{const jump=e.target.closest('[data-go]');if(jump)go(jump.dataset.go)});
 document.addEventListener('keydown',e=>{if(document.activeElement?.closest('.cart-drawer,.image-lightbox,.search-dialog'))return;if(e.target.matches('input,textarea,select'))return;if(e.key==='ArrowRight'){e.preventDefault();move(1)}if(e.key==='ArrowLeft'){e.preventDefault();move(-1)}});
 const book=$('#mag-book');book.addEventListener('touchstart',e=>currentTouchX=e.touches[0]?.clientX??null,{passive:true});book.addEventListener('touchend',e=>{if(currentTouchX===null)return;let delta=e.changedTouches[0]?.clientX-currentTouchX;currentTouchX=null;if(Math.abs(delta)>70)move(delta<0?1:-1)},{passive:true});
 $('#m-copy-list')?.addEventListener('click',()=>window.Nexio.copyList());$('#m-mail-list')?.addEventListener('click',()=>window.Nexio.email());window.addEventListener('nexio:updated',renderSummary);
 mobile.addEventListener('change',()=>go(current,false));let q=new URLSearchParams(location.search).get('strona');go(q||1,false);
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
})();
