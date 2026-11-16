
(()=>{'use strict';const form=document.getElementById('pro-calc-form');if(!form)return;
const $=id=>document.getElementById(id);
const pl=new Intl.NumberFormat('pl-PL',{maximumFractionDigits:1});
const money=new Intl.NumberFormat('pl-PL',{style:'currency',currency:'PLN'});
let summary='';
const render=()=>{
const read=name=>Number(form.elements.namedItem(name).value);
const length=read('length'),runs=read('runs'),reserve=read('reserve'),roll=read('roll'),priceRaw=form.elements.namedItem('price').value.trim(),price=priceRaw===''?null:read('price');
const valid=Number.isFinite(length)&&length>0&&length<=100000&&Number.isInteger(runs)&&runs>=1&&runs<=10000&&Number.isFinite(reserve)&&reserve>=0&&reserve<=100&&Number.isFinite(roll)&&roll>=0&&roll<=200&&(!priceRaw||(Number.isFinite(price)&&price>=0&&price<=100000));
const msg=$('calc-message');
if(!valid){msg.textContent='Sprawdź wartości. Długość i liczba odcinków muszą być dodatnie.';summary='';return;}
const base=length*runs,needed=base*(1+reserve/100),total=Math.ceil(needed*10)/10;
const count=roll?Math.ceil(total/roll):null,purchased=roll?count*roll:total,extra=roll?Math.max(0,purchased-total):0;
const cost=price===null?null:purchased*price;
$('calc-base').textContent=pl.format(base)+' m';$('calc-total').textContent=pl.format(total)+' m';$('calc-rolls').textContent=roll?pl.format(count)+' szt.':'Zakup na metry';$('calc-cost').textContent=cost===null?'Podaj cenę':money.format(cost);
$('calc-comment').textContent=roll?'Przy pełnych krążkach kupisz '+pl.format(purchased)+' m. Nadwyżka względem zapotrzebowania: '+pl.format(extra)+' m.':'Wynik dotyczy zakupu na metry. Zaokrąglono do 0,1 m.';
summary='ELTRAVIA PRO, szacunkowe zestawienie przewodu\nOdcinek: '+pl.format(length)+' m\nLiczba odcinków: '+runs+'\nZapas: '+pl.format(reserve)+'%\nDługość bez zapasu: '+pl.format(base)+' m\nPotrzeba z zapasem: '+pl.format(total)+' m\nZakup: '+(roll?pl.format(count)+' krążków po '+roll+' m':'na metry')+'\nCałkowita ilość zakupu: '+pl.format(purchased)+' m\nKoszt orientacyjny: '+(cost===null?'brak ceny jednostkowej':money.format(cost))+'\nWynik orientacyjny, nie projekt instalacji.';
msg.textContent='';
};
form.addEventListener('input',render);form.addEventListener('change',render);
$('calc-copy').addEventListener('click',async()=>{if(!summary)return;try{if(navigator.clipboard&&navigator.clipboard.writeText){await navigator.clipboard.writeText(summary);}else{const ta=document.createElement('textarea');ta.value=summary;ta.style.position='fixed';ta.style.opacity='0';document.body.appendChild(ta);ta.select();if(!document.execCommand('copy'))throw Error('No clipboard');ta.remove();}$('calc-message').textContent='Zestawienie skopiowane.';}catch(_){$('calc-message').textContent='Nie udało się skopiować. Sprawdź ustawienia przeglądarki.';}});
render();
})();