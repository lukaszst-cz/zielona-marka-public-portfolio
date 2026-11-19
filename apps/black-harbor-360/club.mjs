// Model punktowy przykładowego programu BLACK HARBOR CLUB.
// Operacje są rejestrowane ręcznie, bez potwierdzenia przez system płatności.
export const CLUB = Object.freeze({plnNetPerPoint:20,rewardPoints:100,rewardNetPLN:40});

export function clubPoints(amountNet){
  const amount=Number(amountNet);
  if(!Number.isFinite(amount)||amount<20||amount>100000||Math.abs(Math.round(amount*100)-amount*100)>0.00001)
    throw new Error('Podaj opłaconą kwotę netto od 20 do 100 000 zł (maksymalnie dwa miejsca po przecinku).');
  return Math.floor(Math.round(amount*100)/(CLUB.plnNetPerPoint*100));
}
export function clubBalance(store,clientId){
  return (store.clubEvents||[]).filter(e=>e.clientId===clientId).reduce((sum,e)=>sum+e.points,0);
}
export function clubSummary(store,clientId){
  const entries=(store.clubEvents||[]).filter(e=>e.clientId===clientId);
  const balance=entries.reduce((sum,e)=>sum+e.points,0);
  const earned=entries.filter(e=>e.kind==='earn').reduce((sum,e)=>sum+e.points,0);
  const spent=entries.filter(e=>e.kind==='earn').reduce((sum,e)=>sum+e.amountNet,0);
  const visits=entries.filter(e=>e.kind==='earn').length;
  const tier=earned>=300?'SIGNATURE':earned>=100?'SELECT':'CLUB';
  const lastVisit=entries.filter(e=>e.kind==='earn').map(e=>e.createdAt).sort().at(-1)||'';
  const nextCare=entries.filter(e=>e.kind==='earn'&&e.nextCare).map(e=>e.nextCare).sort().at(-1)||'';
  return {balance,earned,spent,visits,tier,lastVisit,nextCare,liabilityNet:balance*CLUB.rewardNetPLN/CLUB.rewardPoints};
}
export function clubTotals(store){
  const summaries=(store.clients||[]).map(c=>clubSummary(store,c.id));
  return {members:summaries.filter(x=>x.visits>0).length,visits:summaries.reduce((a,v)=>a+v.visits,0),earned:summaries.reduce((a,v)=>a+v.earned,0),liabilityNet:summaries.reduce((a,v)=>a+v.liabilityNet,0),outstanding:summaries.reduce((a,v)=>a+v.balance,0)};
}
export function recordPaidService(store,{id,clientId,amountNet,service,createdAt,nextCare=''}){
  if(!store.clients.some(c=>c.id===clientId))throw new Error('Wybierz klienta.');
  if(typeof service!=='string'||service.trim().length<2||service.length>120)throw new Error('Podaj wykonaną usługę.');
  if(nextCare && (!/^\d{4}-\d{2}-\d{2}$/.test(nextCare)||Number.isNaN(Date.parse(nextCare))))throw new Error('Nieprawidłowy termin pielęgnacji.');
  if(!id||!createdAt||store.clubEvents.some(e=>e.id===id))throw new Error('Nieprawidłowy identyfikator operacji.');
  const amount=Math.round(Number(amountNet)*100)/100;
  const points=clubPoints(amount);
  const entry={id,clientId,kind:'earn',service:service.trim(),amountNet:amount,points,createdAt,nextCare};
  store.clubEvents.unshift(entry);
  return entry;
}
export function redeemReward(store,{id,clientId,createdAt}){
  if(!store.clients.some(c=>c.id===clientId))throw new Error('Nie znaleziono klienta.');
  if(!id||!createdAt||store.clubEvents.some(e=>e.id===id))throw new Error('Nieprawidłowy identyfikator operacji.');
  if(clubBalance(store,clientId)<CLUB.rewardPoints)throw new Error('Brak wystarczającej liczby punktów.');
  const entry={id,clientId,kind:'redeem',service:`Rabat ${CLUB.rewardNetPLN} zł netto zastosowany ręcznie`,amountNet:0,points:-CLUB.rewardPoints,createdAt,nextCare:''};
  store.clubEvents.unshift(entry);
  return entry;
}
export function validateClubEvents(store){
  if(!Array.isArray(store.clubEvents)||store.clubEvents.length>5000)throw new Error('Nieprawidłowy dziennik punktów.');
  const clientIds=new Set(store.clients.map(c=>c.id));
  const eventIds=new Set();
  const byClient=new Map();
  for(const e of [...store.clubEvents].sort((a,b)=>String(a?.createdAt||'').localeCompare(String(b?.createdAt||'')) || (a?.kind==='earn'?-1:1))){
    if(!e||typeof e.id!=='string'||!e.id||e.id.length>100||eventIds.has(e.id)||!clientIds.has(e.clientId)||!['earn','redeem'].includes(e.kind)||!Number.isInteger(e.points)||!Number.isFinite(e.amountNet)||typeof e.service!=='string'||e.service.length>120||typeof e.createdAt!=='string'||Number.isNaN(Date.parse(e.createdAt))||typeof e.nextCare!=='string'||(e.nextCare&&!/^\d{4}-\d{2}-\d{2}$/.test(e.nextCare)))throw new Error('Nieprawidłowa operacja punktowa.');
    if(e.kind==='earn' && (clubPoints(e.amountNet)!==e.points))throw new Error('Niezgodne punkty za usługę.');
    if(e.kind==='redeem' && (e.points!==-CLUB.rewardPoints||e.amountNet!==0))throw new Error('Nieprawidłowe wykorzystanie nagrody.');
    const balance=(byClient.get(e.clientId)||0)+e.points;
    if(balance<0)throw new Error('Kopia danych zawiera ujemne saldo punktów.');
    byClient.set(e.clientId,balance);
    eventIds.add(e.id);
  }
  return true;
}