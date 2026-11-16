(function(){
'use strict';
const $=(s,root=document)=>root.querySelector(s);
const $$=(s,root=document)=>Array.from(root.querySelectorAll(s));
const reduced=window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// Synchronize the original, fully operational site menu with accessible controls.
const nav=$('#mainNav') || $('.nav');
const menu=$('#menuToggle');
if(nav && menu){
  menu.setAttribute('aria-controls','mainNav');
  menu.setAttribute('aria-expanded',String(nav.classList.contains('nav-open')));
  menu.addEventListener('click',()=>{
    menu.setAttribute('aria-expanded',String(nav.classList.contains('nav-open')));
    menu.setAttribute('aria-label',nav.classList.contains('nav-open')?'Zamknij menu':'Otwórz menu');
  });
  const closeNav=()=>{nav.classList.remove('nav-open');menu.setAttribute('aria-expanded','false');menu.setAttribute('aria-label','Otwórz menu')};
  nav.addEventListener('click',e=>{if(e.target.closest('a'))closeNav()});
  document.addEventListener('keydown',e=>{if(e.key==='Escape')closeNav()});
}

// Discreet question icon, preserving the original email-ready form and its values.
const quick=$('#quick'), quickToggle=$('#quickToggle');
if(quick && quickToggle){
  const sync=()=>{
    const opened=!quick.classList.contains('collapsed');
    quickToggle.setAttribute('aria-expanded',String(opened));
    quickToggle.setAttribute('aria-label',opened?'Zamknij szybkie zapytanie':'Otwórz szybkie zapytanie');
    quickToggle.setAttribute('title',opened?'Zamknij szybkie zapytanie':'Otwórz szybkie zapytanie');
  };
  quickToggle.addEventListener('click',sync);
  document.addEventListener('keydown',e=>{if(e.key==='Escape' && !quick.classList.contains('collapsed')){quick.classList.add('collapsed');sync()}});
  sync();
}

// A thin scroll indicator and visible, one-time entrance effects for major sections.
const track=document.createElement('div');track.id='phu-scroll-track';track.setAttribute('aria-hidden','true');document.body.appendChild(track);
let raf=false;
function updateScroll(){raf=false;const max=Math.max(1,document.documentElement.scrollHeight-innerHeight);track.style.transform=`scaleX(${Math.max(0,Math.min(1,scrollY/max))})`}
addEventListener('scroll',()=>{if(!raf){raf=true;requestAnimationFrame(updateScroll)}},{passive:true});
addEventListener('resize',updateScroll,{passive:true});updateScroll();
if(!reduced && 'IntersectionObserver' in window){
  const selectors=['.cards .category','.zm-editorial .zm-headline','.zm-editorial .zm-flyer-stage > *','.zm-timber .zm-split > *','.zm-logistics .zm-transport-grid > *','.branding .brand-copy','.branding .brand-media','.section-title','.product','.zm-photo-intro','.zm-photo-card','.zm-shop .zm-headline','.zm-product','.zm-orders .zm-order-grid > *','.zm-contact .zm-contact-layout > *','.zm-credits-wrap'];
  const targets=$$(selectors.join(','));
  const observer=new IntersectionObserver(entries=>{entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('phu-revealed');observer.unobserve(entry.target)}})},{threshold:.06,rootMargin:'0px 0px 55px 0px'});
  targets.forEach((node,i)=>{
    const box=node.getBoundingClientRect();
    if(box.top<innerHeight*.78 || box.bottom<0)return;
    node.classList.add('phu-reveal');node.style.setProperty('--phu-delay',((i%4)*55)+'ms');observer.observe(node)
  });
}

// Preserve the advanced single shared cart, only animate the original header badge.
const badge=$('#cartCount');
if(badge && 'MutationObserver' in window){
 let last=badge.textContent;new MutationObserver(()=>{
   const current=badge.textContent;
   if(last===current)return;last=current;
   badge.classList.remove('phu-cart-pulse');void badge.offsetWidth;badge.classList.add('phu-cart-pulse')
 }).observe(badge,{childList:true,subtree:true,characterData:true});
}

// Photos are additional presentation, not a second shopping/cart system.
const galleryCards=$$('.zm-photo-card');
if(galleryCards.length && typeof HTMLDialogElement!=='undefined'){
 const dlg=document.createElement('dialog');dlg.className='phu-gallery';dlg.setAttribute('aria-label','Galeria kategorii materiałów');
 dlg.innerHTML='<div class="phu-gallery-top"><img class="phu-gallery-image" alt=""><button type="button" class="phu-gallery-close" aria-label="Zamknij galerię">×</button></div><div class="phu-gallery-bottom"><div class="phu-gallery-info"><h3></h3><p></p></div><span class="phu-gallery-count" aria-live="polite"></span><div class="phu-gallery-controls"><button data-gallery-prev type="button" aria-label="Poprzednie zdjęcie">‹</button><button data-gallery-next type="button" aria-label="Następne zdjęcie">›</button></div><a class="phu-gallery-action" href="#sklep">Przejdź do katalogu</a></div>';
 document.body.appendChild(dlg);
 let current=0;
 const paint=()=>{
  const card=galleryCards[current];const img=$('img',card), out=$('.phu-gallery-image',dlg);
  out.src=img.currentSrc || img.src;out.alt=img.alt;
  $('.phu-gallery-info h3',dlg).textContent=$('h3',card)?.textContent || 'Kategoria';
  $('.phu-gallery-info p',dlg).textContent=$('p',card)?.textContent || '';
  $('.phu-gallery-count',dlg).textContent=`${current+1} / ${galleryCards.length}`;
 };
 const rotate=by=>{current=(current+by+galleryCards.length)%galleryCards.length;paint()};
 galleryCards.forEach((card,i)=>{
  card.tabIndex=0;card.setAttribute('role','button');card.setAttribute('aria-label','Powiększ zdjęcie: '+($('h3',card)?.textContent||'kategoria'));
  const open=()=>{current=i;paint();dlg.showModal()};
  card.addEventListener('click',open);
  card.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();open()}});
 });
 $('[data-gallery-prev]',dlg).addEventListener('click',()=>rotate(-1));
 $('[data-gallery-next]',dlg).addEventListener('click',()=>rotate(1));
 $('.phu-gallery-close',dlg).addEventListener('click',()=>dlg.close());
 $('.phu-gallery-action',dlg).addEventListener('click',()=>dlg.close());
 dlg.addEventListener('click',e=>{if(e.target===dlg)dlg.close()});
 document.addEventListener('keydown',e=>{if(!dlg.open)return;if(e.key==='ArrowRight')rotate(1);if(e.key==='ArrowLeft')rotate(-1)});
}
})();