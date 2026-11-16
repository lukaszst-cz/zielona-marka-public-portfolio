
(()=>{'use strict';
const d=document;
const isMag=d.body.classList.contains('magazine-page');
const arrow='<span aria-hidden="true">↗</span>';
if(!isMag){
 const oldHero=d.querySelector('.hero-layout');
 if(oldHero){
  const root=d.createElement('div');
  root.innerHTML='<section class="elx-hero" aria-label="ELTRAVIA ELEKTRO, nowa energia dla profesjonalistów"><div class="elx-hero__inner"><div class="elx-hero__copy"><span class="elx-eyebrow"><i class="elx-spark" aria-hidden="true"></i> ELEKTROTECHNIKA / NOWA PERSPEKTYWA</span><h1>Nowa<br>energia dla<br><em>Twoich idei.</em></h1><p class="elx-hero__lead">Od pierwszego połączenia po gotowy projekt. Poznaj materiały, które pomagają budować instalacje z precyzją.</p><div class="elx-hero__actions"><a class="elx-btn elx-btn--lime" href="#produkty">Eksploruj katalog '+arrow+'</a><a class="elx-btn elx-btn--line" href="gazetka.html">Otwórz gazetkę '+arrow+'</a></div><div class="elx-hero__meta"><div class="elx-stat"><strong>06</strong><span>działów<br>asortymentu</span></div><div class="elx-stat"><strong>24</strong><span>produkty<br>poglądowe</span></div><div class="elx-stat"><strong>16</strong><span>stron<br>gazetki</span></div></div></div><div class="elx-hero__visual"><div class="elx-hero__ring"></div><span class="elx-hero__side-label">ELTRAVIA / PRO EDITION / 2026</span><div class="elx-floating"><img src="assets/gazetka/p2-05.webp" alt="Aparatura modułowa" loading="lazy"><span><small>W CENTRUM UWAGI</small><strong>Precyzja w każdym detalu<br>Inspiracje dla instalatorów</strong></span></div></div></div></section><div class="elx-ticker" aria-hidden="true"><div class="elx-ticker__track"><span>TECHNOLOGIA</span><span>PRECYZJA</span><span>PROJEKT</span><span>ENERGIA</span><span>INSTALACJE</span><span>TECHNOLOGIA</span><span>PRECYZJA</span><span>PROJEKT</span><span>ENERGIA</span><span>INSTALACJE</span></div></div>';
  oldHero.before(...root.childNodes);
 }
 const cats=d.querySelector('#kategorie');
 if(cats){
 const el=d.createElement('section');
 el.className='elx-editorial';
 el.setAttribute('aria-labelledby','elx-editorial-title');
 el.innerHTML='<div class="elx-section-head elx-reveal"><div><span class="elx-label">WYBRANE ŚWIATY ELEKTROTECHNIKI</span><h2 id="elx-editorial-title">Technologia<br><em>nabiera formy.</em></h2></div><p>Najważniejsze kategorie pokazane z bliska. Przeglądaj asortyment intuicyjnie, od obrazu do konkretnego produktu.</p></div><div class="elx-grid"><a class="elx-tile elx-tile--one elx-reveal" href="#produkty"><span class="elx-tile__num">01 / 03</span><span class="elx-tile__arrow">↗</span><span class="elx-tile__copy"><small>APARATURA &amp; ROZDZIELNICE</small><strong>Wszystko zaczyna się<br>od dobrego układu.</strong></span></a><a class="elx-tile elx-tile--two elx-reveal" href="#produkty"><span class="elx-tile__num">02 / 03</span><span class="elx-tile__arrow">↗</span><span class="elx-tile__copy"><small>TELETECHNIKA &amp; SIECI</small><strong>Łączymy<br>możliwości.</strong></span></a><a class="elx-tile elx-tile--three elx-reveal" href="#produkty"><span class="elx-tile__num">03 / 03</span><span class="elx-tile__arrow">↗</span><span class="elx-tile__copy"><small>OŚWIETLENIE &amp; OSPRZĘT</small><strong>Światło, które<br>zmienia przestrzeń.</strong></span></a></div>';
 cats.before(el);
 }
 const banner=d.querySelector('.wide-banner');
 if(banner){
 const el=d.createElement('aside');el.className='elx-quote elx-reveal';
 el.innerHTML='<span class="elx-quote__mark" aria-hidden="true">E/</span><p>Dobry wybór to więcej niż produkt. To prosta droga od inspiracji do gotowej listy materiałów.</p><a href="#narzedzia">Poznaj narzędzia B2B '+arrow+'</a>';
 banner.after(el);
 }
 const hero=d.querySelector('.elx-hero');
 if(hero&&matchMedia('(hover:hover) and (prefers-reduced-motion:no-preference)').matches){
 hero.addEventListener('pointermove',e=>{const r=hero.getBoundingClientRect();const x=(e.clientX-r.left)/r.width-.5;const y=(e.clientY-r.top)/r.height-.5;hero.style.setProperty('--el-photo-x',(x*11)+'px');hero.style.setProperty('--el-photo-y',(y*8)+'px')},{passive:true});
 hero.addEventListener('pointerleave',()=>{hero.style.setProperty('--el-photo-x','0px');hero.style.setProperty('--el-photo-y','0px')});
 }
}else{
 const intro=d.querySelector('.magazine-intro');
 if(intro){const x=d.createElement('div');x.className='elx-mag-issue';x.innerHTML='<span>ELTRAVIA ELEKTRO / INTERAKTYWNA EDYCJA PRO</span><b>WYBIERAJ • ZAPISUJ • KOMPLETUJ</b>';intro.after(x)}
}
const bar=d.createElement('div');bar.className='elx-progress';bar.setAttribute('aria-hidden','true');d.body.append(bar);
let scheduled=false;const progress=()=>{scheduled=false;const max=d.documentElement.scrollHeight-innerHeight;d.documentElement.style.setProperty('--el-progress',(max>0?(scrollY/max*100):0)+'%')};
addEventListener('scroll',()=>{if(!scheduled){scheduled=true;requestAnimationFrame(progress)}},{passive:true});progress();
const targets=[...d.querySelectorAll('.elx-reveal')];
if('IntersectionObserver'in window && !matchMedia('(prefers-reduced-motion: reduce)').matches){
 const io=new IntersectionObserver(entries=>entries.forEach(en=>{if(en.isIntersecting){en.target.classList.add('elx-show');io.unobserve(en.target)}}),{threshold:.08,rootMargin:'0px 0px -30px 0px'});
 targets.forEach(x=>io.observe(x));d.body.classList.add('elx-js');
}else targets.forEach(x=>x.classList.add('elx-show'));
})();
