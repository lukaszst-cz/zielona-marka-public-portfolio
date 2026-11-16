(()=>{const b=document.getElementById('pro-menu-toggle'),n=document.getElementById('pro-nav');b&&b.addEventListener('click',()=>{const state=!n.classList.contains('open');n.classList.toggle('open',state);b.setAttribute('aria-expanded',String(state))});n&&n.addEventListener('click',e=>{if(e.target.closest('a')){n.classList.remove('open');b.setAttribute('aria-expanded','false')}});if(window.matchMedia('(prefers-reduced-motion: reduce)').matches||!('IntersectionObserver'in window))return;const targets=[...document.querySelectorAll('.pro-reveal')];const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('pro-visible');io.unobserve(e.target)}}),{rootMargin:'0px 0px -25px 0px',threshold:.05});document.body.classList.add('pro-activated');targets.forEach(x=>io.observe(x));})();

(()=>{'use strict';
const model={salon:{light:true,heat:true,brightness:76,temp:21.5},sypialnia:{light:false,heat:true,brightness:34,temp:20.5}};
let room='salon';const $=(s)=>document.querySelector(s);
const announce=(message)=>{const el=$('#sm-announcement');if(el)el.textContent=message};
const app=(r)=>{const state=model[r];if(!state)return;room=r;for(const btn of document.querySelectorAll('[data-sm-room]')){const a=btn.dataset.smRoom===room;btn.classList.toggle('active',a);btn.setAttribute('aria-pressed',String(a));}
for(const btn of document.querySelectorAll('[data-sm-toggle]')){const on=!!state[btn.dataset.smToggle];btn.classList.toggle('is-on',on);btn.setAttribute('aria-pressed',String(on));}
$('#sm-light-status').textContent=state.light?'Włączone':'Wyłączone';$('#sm-heat-status').textContent=state.heat?'Aktywne':'Wyłączone';
$('#sm-temperature').innerHTML=String(state.temp).replace('.',',')+'<sup>°C</sup>';
$('#sm-slider').value=state.brightness;$('#sm-brightness-value').textContent=state.brightness+'%';$('#sm-slider').style.background='linear-gradient(90deg,#d7fc79 '+state.brightness+'%,#274761 '+state.brightness+'%)';
$('#sm-devices-count').textContent=(Number(state.light)+Number(state.heat))+' aktywne';
};
document.querySelectorAll('[data-sm-room]').forEach(b=>b.addEventListener('click',()=>{app(b.dataset.smRoom);announce('Pomieszczenie: '+b.textContent)}));
document.querySelectorAll('[data-sm-toggle]').forEach(b=>b.addEventListener('click',()=>{const type=b.dataset.smToggle;model[room][type]=!model[room][type];app(room);announce((type==='light'?'Światło':'Ogrzewanie')+(model[room][type]?' włączone':' wyłączone'))}));
$('#sm-slider')?.addEventListener('input',e=>{const n=Number(e.target.value);model[room].brightness=n;model[room].light=n>0;app(room);document.querySelectorAll('[data-sm-scene]').forEach(b=>{b.classList.remove('active');b.setAttribute('aria-pressed','false')});announce('Jasność światła: '+n+' procent')});
const scenes={wieczor:{brightness:76,light:true,heat:true},relaks:{brightness:35,light:true,heat:true},noc:{brightness:4,light:false,heat:true}};
document.querySelectorAll('[data-sm-scene]').forEach(b=>b.addEventListener('click',()=>{const key=b.dataset.smScene;Object.assign(model[room],scenes[key]);document.querySelectorAll('[data-sm-scene]').forEach(x=>{const a=x===b;x.classList.toggle('active',a);x.setAttribute('aria-pressed',String(a))});app(room);announce('Aktywna scena: '+b.textContent)}));
app(room);
const calm=matchMedia('(prefers-reduced-motion: reduce)').matches;
let scheduled=false;const onScroll=()=>{if(scheduled)return;scheduled=true;requestAnimationFrame(()=>{scheduled=false;const max=Math.max(1,document.documentElement.scrollHeight-innerHeight);document.documentElement.style.setProperty('--pro-scroll',Math.min(100,scrollY/max*100).toFixed(2)+'%');if(!calm)document.documentElement.style.setProperty('--pro-hero-y',Math.min(35,scrollY*.065)+'px')})};
addEventListener('scroll',onScroll,{passive:true});onScroll();
})();