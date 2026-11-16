/* NEXIO ELEKTRO: żywa nawigacja, filtrowanie, galeria i reakcje interfejsu */
(function () {
  'use strict';
  if (window.__nexioDynamicsV2) return;
  window.__nexioDynamicsV2 = true;
  const doc = document;
  const $ = (s, root=doc) => root.querySelector(s);
  const $$ = (s, root=doc) => Array.from(root.querySelectorAll(s));
  const reduce = !!(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  const touchOnly = !window.matchMedia || !window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  const cards = $$('.catcard');
  const photoCards = $$('.zm-photo-card');
  const allSections = $$('main section[id]');
  const navLinks = $$('.navigation a[href^="#"]');
  const photoItems = photoCards.map((card, i)=>({
    type:'gallery',index:i,title:$('.zm-photo-copy h3',card)?.textContent?.trim()||'Zdjęcie poglądowe',
    info:$('.zm-photo-copy p',card)?.textContent?.trim()||'',src:$('.zm-photo-frame img',card)?.src||'',alt:$('.zm-photo-frame img',card)?.alt||'Zdjęcie produktów'
  }));
  const categoryItems = cards.map((card,i)=>({
    type:'category',index:i,title:$('h3',card).textContent.trim(),
    info:$('p',card).textContent.trim(),src:$('.catthumb',card).getAttribute('src'),
    img:$('.catthumb',card),alt:$('.catthumb',card).alt,
    card,button:$('.addcat',card)
  }));
  const toast=doc.createElement('div');toast.id='nx-toast';toast.className='nx-toast';toast.setAttribute('role','status');toast.setAttribute('aria-live','polite');doc.body.append(toast);
  let toastTimer;
  function notify(text){toast.textContent=text;toast.classList.add('nx-show');clearTimeout(toastTimer);toastTimer=setTimeout(()=>toast.classList.remove('nx-show'),2600)}
  function attachReveals(){
    const targets=$$('.sectionhead,.sectionsmall,.zm-photo-intro,.zm-photo-card,.b2bcopy,.b2bfeature,.feature,.statementinner>div:first-child,.step,.formcopy,.formbox,.zm-credits');
    if(reduce||!('IntersectionObserver' in window))return;
    const observer=new IntersectionObserver(entries=>entries.forEach(ent=>{
      if(ent.isIntersecting){ent.target.classList.add('nx-visible');observer.unobserve(ent.target)}
    }),{threshold:.08,rootMargin:'0px 0px 50px 0px'});
    targets.forEach((el,i)=>{el.dataset.nexioReveal='';el.style.setProperty('--nx-reveal-delay',((i%4)*65)+'ms')});
    doc.documentElement.classList.add('nexio-ready');targets.forEach(el=>observer.observe(el));
  }
  const progress=doc.createElement('div');progress.id='nexio-progress';progress.setAttribute('aria-hidden','true');doc.body.append(progress);
  const heroImg=$('.hero-photo');
  let scrollRaf=0;
  function onScroll(){if(scrollRaf)return;scrollRaf=requestAnimationFrame(()=>{
    scrollRaf=0;
    const html=doc.documentElement,max=Math.max(1,html.scrollHeight-html.clientHeight);
    progress.style.width=Math.min(100,Math.max(0,window.scrollY/max*100))+'%';
    if(!reduce&&!touchOnly&&heroImg){heroImg.style.setProperty('--nx-parallax',Math.min(90,window.scrollY*.11)+'px')}
  })}
  window.addEventListener('scroll',onScroll,{passive:true});window.addEventListener('resize',onScroll,{passive:true});onScroll();
  if('IntersectionObserver' in window){
    const active=new IntersectionObserver(entries=>{
      entries.filter(e=>e.isIntersecting).forEach(e=>{
        const id=e.target.id;
        navLinks.forEach(a=>{
          const on=a.getAttribute('href')==='#'+id;
          a.classList.toggle('nx-active',on);
          if(on)a.setAttribute('aria-current','location');else a.removeAttribute('aria-current');
        });
      });
    },{rootMargin:'-15% 0px -60% 0px',threshold:0});
    allSections.forEach(sec=>active.observe(sec));
  }
  if(!reduce&&!touchOnly){
    [...cards,...photoCards,...$$('.feature')].forEach(el=>{
      el.classList.add('nx-motion-card');
      const spot=doc.createElement('span');spot.className='nx-lightspot';spot.setAttribute('aria-hidden','true');el.append(spot);
      let raf=0,point=null;
      el.addEventListener('pointerenter',()=>el.classList.add('nx-hovered'));
      el.addEventListener('pointermove',e=>{
        point={x:e.clientX,y:e.clientY};if(raf)return;
        raf=requestAnimationFrame(()=>{
          raf=0;if(!point)return;
          const b=el.getBoundingClientRect();const px=Math.max(0,Math.min(1,(point.x-b.left)/Math.max(1,b.width))),py=Math.max(0,Math.min(1,(point.y-b.top)/Math.max(1,b.height)));
          el.style.setProperty('--nx-mx',(px*100).toFixed(1)+'%');el.style.setProperty('--nx-my',(py*100).toFixed(1)+'%');
          el.style.setProperty('--nx-rx',((.5-py)*3.7).toFixed(2)+'deg');el.style.setProperty('--nx-ry',((px-.5)*4.2).toFixed(2)+'deg');
        });
      },{passive:true});
      el.addEventListener('pointerleave',()=>{
        point=null;el.classList.remove('nx-hovered');
        el.style.setProperty('--nx-rx','0deg');el.style.setProperty('--nx-ry','0deg');
      });
    });
  }
  if(!reduce){
    doc.addEventListener('click',event=>{
      const target=event.target.closest('.btn,.nx-chip,.nx-modal-add,.nx-preview,.nx-photo-view');
      if(!target||!target.isConnected)return;
      target.classList.add('nx-ripple-target');
      const span=doc.createElement('span');span.className='nx-ripple';span.setAttribute('aria-hidden','true');
      const r=target.getBoundingClientRect();span.style.left=(event.clientX-r.left)+'px';span.style.top=(event.clientY-r.top)+'px';
      target.append(span);setTimeout(()=>span.remove(),570);
    });
  }
  // Szybkie filtry uzupełniają działającą wyszukiwarkę.
  const search=$('#search'),searchBox=$('.searcharea'),grid=$('#catcards');
  let filters=[],filterState=null;
  if(search&&searchBox&&grid&&categoryItems.length){
    const wrap=doc.createElement('div');wrap.className='nx-filterbar';
    const list=doc.createElement('div');list.className='nx-chips';list.setAttribute('role','group');list.setAttribute('aria-label','Filtry kategorii');
    filterState=doc.createElement('div');filterState.className='nx-search-state';filterState.setAttribute('role','status');filterState.setAttribute('aria-live','polite');
    wrap.append(list,filterState);searchBox.after(wrap);
    const names=[['Wszystkie',''],...categoryItems.map(x=>[x.title,x.title])];
    names.forEach(([label,value],i)=>{
      const btn=doc.createElement('button');btn.type='button';btn.className='nx-chip';btn.textContent=label;btn.dataset.filter=value;
      btn.setAttribute('aria-pressed',i===0?'true':'false');btn.addEventListener('click',()=>{
        search.value=(search.value.trim().toLocaleLowerCase('pl')===value.toLocaleLowerCase('pl'))?'':value;
        search.dispatchEvent(new Event('input',{bubbles:true}));
        if(!search.value)search.focus({preventScroll:true});
      });list.append(btn);filters.push(btn);
    });
    const originalTitles=new Map(categoryItems.map(x=>[x.card,$('h3',x.card).textContent]));
    function update(){
      const visible=cards.filter(c=>!c.classList.contains('hidden')).length;
      filterState.textContent='Widoczne: '+visible+' z '+cards.length+' działów';
      const query=search.value.trim().toLocaleLowerCase('pl');
      filters.forEach(btn=>btn.setAttribute('aria-pressed',String(btn.dataset.filter.toLocaleLowerCase('pl')===query)));
      const q=query;
      categoryItems.forEach(x=>{
        const heading=$('h3',x.card);const origin=originalTitles.get(x.card);
        heading.textContent=origin;
        if(!q)return;
        const idx=origin.toLocaleLowerCase('pl').indexOf(q);
        if(idx<0)return;
        heading.textContent='';heading.append(doc.createTextNode(origin.slice(0,idx)));
        const mark=doc.createElement('mark');mark.className='nx-match';mark.textContent=origin.slice(idx,idx+q.length);
        heading.append(mark,doc.createTextNode(origin.slice(idx+q.length)));
      });
    }
    search.addEventListener('input',()=>requestAnimationFrame(update));
    $('#clearSearch')?.addEventListener('click',()=>requestAnimationFrame(update));
    update();
  }
  // Galeria działa na kliknięcia, klawiaturę i urządzenia dotykowe.
  const modal=doc.createElement('div');modal.className='nx-modal';modal.id='nx-gallery';modal.setAttribute('aria-hidden','true');
  modal.innerHTML=`<div class="nx-modal-dialog" role="dialog" aria-modal="true" aria-labelledby="nx-modal-title"><button type="button" class="nx-modal-close" aria-label="Zamknij podgląd">×</button><div class="nx-modal-media"><img alt="" src=""/><button type="button" class="nx-modal-step nx-modal-prev" aria-label="Poprzednie zdjęcie">‹</button><button type="button" class="nx-modal-step nx-modal-next" aria-label="Następne zdjęcie">›</button></div><div class="nx-modal-info"><span class="nx-modal-eyebrow"></span><h2 id="nx-modal-title"></h2><p></p><div class="nx-modal-foot"><button type="button" class="nx-modal-add">Dodaj do zapytania +</button><span class="nx-modal-counter"></span></div></div></div>`;
  doc.body.append(modal);
  const mImg=$('.nx-modal-media img',modal),mTitle=$('#nx-modal-title',modal),mInfo=$('.nx-modal-info p',modal),mEyebrow=$('.nx-modal-eyebrow',modal),mCounter=$('.nx-modal-counter',modal),mAdd=$('.nx-modal-add',modal);
  let activeType='category',activeIndex=0,opener=null,bodyOverflow='';
  const collection=()=>activeType==='gallery'?photoItems:categoryItems;
  function updateModal(){
    const list=collection(),item=list[activeIndex];if(!item)return;
    mImg.classList.add('nx-changing');
    const src=item.type==='category'?(item.img.currentSrc||item.img.src):item.src;
    mImg.src=src;mImg.alt=item.alt||item.title;
    mTitle.textContent=item.title;mInfo.textContent=item.info;
    mEyebrow.textContent=item.type==='category'?'Katalog poglądowy • Dział '+String(activeIndex+1).padStart(2,'0'):'Galeria zdjęć • Wizualizacja';
    mCounter.textContent=(activeIndex+1)+' / '+list.length;
    mAdd.hidden=item.type==='gallery';
    if(item.type==='category')mAdd.textContent=item.button?.getAttribute('aria-pressed')==='true'?'Usuń z zapytania ✓':'Dodaj do zapytania +';
    requestAnimationFrame(()=>mImg.classList.remove('nx-changing'));
  }
  function openModal(type,index,target){activeType=type;activeIndex=index;opener=target;bodyOverflow=doc.body.style.overflow;
    updateModal();modal.classList.add('nx-open');modal.setAttribute('aria-hidden','false');doc.body.style.overflow='hidden';$('.nx-modal-close',modal).focus({preventScroll:true});}
  function closeModal(){if(!modal.classList.contains('nx-open'))return;modal.classList.remove('nx-open');modal.setAttribute('aria-hidden','true');doc.body.style.overflow=bodyOverflow;if(opener&&opener.isConnected)opener.focus({preventScroll:true})}
  function stepModal(delta){const list=collection();activeIndex=(activeIndex+delta+list.length)%list.length;updateModal()}
  $('.nx-modal-close',modal).addEventListener('click',closeModal);$('.nx-modal-prev',modal).addEventListener('click',()=>stepModal(-1));$('.nx-modal-next',modal).addEventListener('click',()=>stepModal(1));
  mAdd.addEventListener('click',()=>{const item=collection()[activeIndex];if(item&&item.button){item.button.click();updateModal()}});
  modal.addEventListener('click',event=>{if(event.target===modal)closeModal()});
  doc.addEventListener('keydown',e=>{
    if(!modal.classList.contains('nx-open'))return;
    if(e.key==='Escape'){e.preventDefault();closeModal()}
    if(e.key==='ArrowRight'){e.preventDefault();stepModal(1)}
    if(e.key==='ArrowLeft'){e.preventDefault();stepModal(-1)}
    if(e.key==='Tab'){
      const tabbable=$$('button:not([hidden])',modal).filter(b=>b.offsetParent!==null);
      if(!tabbable.length)return;
      const first=tabbable[0],last=tabbable[tabbable.length-1];
      if(e.shiftKey&&doc.activeElement===first){e.preventDefault();last.focus()}
      else if(!e.shiftKey&&doc.activeElement===last){e.preventDefault();first.focus()}
    }
  });
  categoryItems.forEach((item,i)=>{
    const img=item.img;const holder=doc.createElement('div');holder.className='nx-thumbwrap';img.parentNode.insertBefore(holder,img);holder.append(img);
    const open=doc.createElement('button');open.type='button';open.className='nx-preview';open.textContent='↗ Zobacz dział';open.setAttribute('aria-label','Obejrzyj zdjęcie i opis: '+item.title);
    holder.append(open);open.addEventListener('click',()=>openModal('category',i,open));
  });
  photoCards.forEach((card,i)=>{
    const frame=$('.zm-photo-frame',card);if(!frame)return;
    const button=doc.createElement('button');button.type='button';button.className='nx-photo-view';button.textContent='⤢ Powiększ';button.setAttribute('aria-label','Powiększ: '+photoItems[i].title);
    frame.append(button);button.addEventListener('click',()=>openModal('gallery',i,button));
  });
  // Wybrane materiały otrzymują informację zwrotną, przy zachowaniu głównej logiki katalogu.
  const count=$('#quoteCount');
  doc.addEventListener('click',e=>{
    const add=e.target.closest('.addcat,.prepick,.tagpick');
    if(!add)return;
    requestAnimationFrame(()=>{
      const pressed=add.classList.contains('tagpick')?false:add.getAttribute('aria-pressed')==='true';
      if(add.classList.contains('tagpick'))notify('Usunięto kategorię z zapytania');
      else notify(pressed?'Dodano do zapytania':'Usunięto z zapytania');
      if(count){count.classList.remove('nx-bump');void count.offsetWidth;count.classList.add('nx-bump')}
      if(add.classList.contains('addcat')){const card=add.closest('.catcard');card?.classList.remove('nx-burst');if(card){void card.offsetWidth;card.classList.add('nx-burst')}}
      updateBrief();
    });
  });
  // Kafle B2B wyjaśniają, do czego służą poszczególne kroki zapytania.
  const b2bs=$$('.b2bfeature'),b2bParent=$('.b2bpanel');
  if(b2bs.length&&b2bParent){
    const note=doc.createElement('div');note.className='nx-b2b-note';note.setAttribute('role','status');note.setAttribute('aria-live','polite');b2bParent.after(note);
    const hints=[
      'Lista materiałowa: dodaj kategorie powyżej, a ich nazwy pojawią się w formularzu.',
      'Zapytanie hurtowe: kilka grup produktów możesz połączyć w jednej wiadomości.',
      'Projekty i inwestycje: w opisie zapotrzebowania dopisz miejsce, termin i parametry.',
      'Oferta na zapytanie: skopiuj przygotowany opis i prześlij go samodzielnie do wybranego dostawcy.'
    ];
    const choose=i=>{
      b2bs.forEach((el,j)=>el.setAttribute('aria-pressed',String(i===j)));
      note.replaceChildren();const b=doc.createElement('b');b.textContent=String(i+1).padStart(2,'0')+' / 04';note.append(b,doc.createTextNode(hints[i]));
    };
    b2bs.forEach((el,i)=>{
      el.setAttribute('role','button');el.setAttribute('tabindex','0');el.setAttribute('aria-label','Wybierz: '+$('strong',el)?.textContent);
      el.addEventListener('click',()=>choose(i));el.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();choose(i)}});
    });choose(0);
  }
  // Etap pracy można wybrać dotykiem lub klawiaturą.
  const steps=$$('.step');const stepList=$('.step-list');
  if(steps.length&&stepList){
    stepList.setAttribute('role','tablist');stepList.setAttribute('aria-label','Etapy przygotowania zapytania');
    const panel=doc.createElement('div');panel.className='nx-step-detail';panel.id='nx-step-detail';panel.setAttribute('role','tabpanel');panel.setAttribute('aria-live','polite');stepList.append(panel);
    const examples=[
      'Przejrzyj sześć działów asortymentu i użyj przycisku „Dodaj do zapytania”. Wybrane pozycje zobaczysz na dole strony.',
      'W polu „Czego potrzebujesz?” możesz wpisać liczbę sztuk, wymagane parametry lub termin. Dane pozostają w Twojej przeglądarce.',
      'Wybierz „Pokaż treść zapytania” lub „Kopiuj treść”. W tej demonstracji wiadomości nie są wysyłane automatycznie.'
    ];
    function setStep(i){steps.forEach((el,j)=>{el.setAttribute('aria-selected',String(i===j));el.setAttribute('tabindex',String(i===j?0:-1));});
      panel.replaceChildren();const b=doc.createElement('b');b.textContent='KROK '+String(i+1).padStart(2,'0');const p=doc.createElement('p');p.textContent=examples[i];panel.append(b,p)}
    steps.forEach((el,i)=>{el.id='nx-step-'+i;el.setAttribute('role','tab');el.setAttribute('aria-controls',panel.id);el.addEventListener('click',()=>setStep(i));el.addEventListener('keydown',e=>{
      if(e.key==='Enter'||e.key===' '){e.preventDefault();setStep(i)}
      if(e.key==='ArrowDown'||e.key==='ArrowUp'){e.preventDefault();const next=(i+(e.key==='ArrowDown'?1:-1)+steps.length)%steps.length;setStep(next);steps[next].focus()}
    })});setStep(0);
  }
  // Pasek postępu pokazuje elementy opisu zapytania, bez sugerowania wysłania formularza.
  const form=$('#quoteForm'),chosen=$('#chosen');let briefFill=null,briefLabel=null,briefItems=[];
  if(form&&chosen){
    const box=doc.createElement('div');box.className='nx-brief';box.innerHTML='<div class="nx-brief-head"><span>Elementy opisu zapytania</span><strong class="nx-brief-label">0 / 3</strong></div><div class="nx-brief-track"><div class="nx-brief-fill"></div></div><div class="nx-brief-items"><span>Kategorie</span><span>Specyfikacja</span><span>Dane kontaktowe</span></div>';
    $('.form-action',form)?.before(box);
    briefFill=$('.nx-brief-fill',box);briefLabel=$('.nx-brief-label',box);briefItems=$$('.nx-brief-items span',box);
    ['person','reply','details'].forEach(id=>$('#'+id)?.addEventListener('input',updateBrief));
    new MutationObserver(updateBrief).observe(chosen,{childList:true,subtree:true});
  }
  function updateBrief(){if(!briefFill)return;
    const checks=[chosen?.querySelectorAll('.tagpick').length>0,!!$('#details')?.value.trim(),!!$('#person')?.value.trim()&&!!$('#reply')?.value.trim()];
    let n=checks.filter(Boolean).length;briefFill.style.width=(n/3*100)+'%';briefLabel.textContent=n+' / 3';
    checks.forEach((yes,i)=>briefItems[i]?.classList.toggle('nx-ok',yes));
  }updateBrief();
  $('#copyQuote')?.addEventListener('click',()=>notify('Sprawdź treść zapytania i schowek'));
  attachReveals();
})();
