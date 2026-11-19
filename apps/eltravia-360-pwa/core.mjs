export const VERSION = 1;
export const KEY = 'eltravia-360-pwa-v1';
export const CATEGORIES = ['Kable i przewody','Aparatura instalacyjna','Oświetlenie LED','Osprzęt','Automatyka i Smart Home','Rozdzielnice'];
export const SOURCES = ['Strona WWW','Telefon','Polecenie','Google','Handlowiec','Gazetka','Inne'];
export const LEAD_STATUSES = ['Nowe','Kwalifikacja','Do wyceny','Oferta wysłana','Wygrane','Utracone'];
export const ROLES = {
 owner:{label:'Właściciel',permissions:['crm','quotes','orders','warehouse','finance','partners','manage']},
 manager:{label:'Kierownik',permissions:['crm','quotes','orders','warehouse','finance','partners']},
 sales:{label:'Handlowiec',permissions:['crm','quotes','orders','partners']},
 warehouse:{label:'Magazynier',permissions:['orders','warehouse']},
 viewer:{label:'Podgląd',permissions:[]}
};
export const fmt = n => Number(n || 0).toLocaleString('pl-PL',{minimumFractionDigits:0,maximumFractionDigits:2});
export const net = n => Number(Number(n || 0).toFixed(2));
export const norm = s => String(s ?? '').trim().toLocaleLowerCase('pl-PL');
const product = (sku,name,category,unit,cost,price,stock,minStock,ean,spec) => ({sku,name,category,unit,cost,price,stock,minStock,ean,spec,reserved:0});
export const CATALOG = [
 product('EL-KAB-101','Przewód YDYp 3×2,5 mm²','Kable i przewody','m',3.14,4.46,720,240,'5900000000101','450/750 V · biały · odcinki na metry'),
 product('EL-KAB-102','Przewód YDYp 3×1,5 mm²','Kable i przewody','m',2.06,3.01,430,200,'5900000000102','450/750 V · biały · odcinki na metry'),
 product('EL-KAB-103','Przewód ziemny YKY 5×6 mm²','Kable i przewody','m',17.2,24.9,65,120,'5900000000103','0,6/1 kV · czarny · kabel ziemny'),
 product('EL-APA-201','Wyłącznik nadprądowy B16 1P','Aparatura instalacyjna','szt.',14.2,20.8,46,24,'5900000000201','1P · charakterystyka B · 16 A'),
 product('EL-APA-202','Wyłącznik różnicowoprądowy 40 A 30 mA','Aparatura instalacyjna','szt.',69.5,103,9,8,'5900000000202','2P · 40 A · 30 mA · typ AC (model testowy)'),
 product('EL-APA-203','Ogranicznik przepięć typ 2','Aparatura instalacyjna','szt.',122,175,6,8,'5900000000203','3+1 · typ 2 · modułowy'),
 product('EL-LED-301','Panel LED 40 W 60×60','Oświetlenie LED','szt.',82,122,25,16,'5900000000301','4000 K · 40 W · oprawa panelowa'),
 product('EL-LED-302','Oprawa hermetyczna LED 36 W','Oświetlenie LED','szt.',77,116,12,12,'5900000000302','IP65 · 4000 K · 120 cm'),
 product('EL-OSP-401','Gniazdo podtynkowe 2P+Z białe','Osprzęt','szt.',10.9,16.2,150,60,'5900000000401','16 A · montaż podtynkowy'),
 product('EL-OSP-402','Łącznik jednobiegunowy biały','Osprzęt','szt.',8.6,13.4,72,45,'5900000000402','10 AX · podtynkowy'),
 product('EL-SMH-501','Przekaźnik inteligentny Wi-Fi','Automatyka i Smart Home','szt.',57,89,14,12,'5900000000501','230 V · Wi-Fi · kompatybilność do sprawdzenia'),
 product('EL-SMH-502','Czujnik ruchu PIR','Automatyka i Smart Home','szt.',41,66,11,10,'5900000000502','wewnętrzny · 230 V · PIR'),
 product('EL-ROZ-601','Rozdzielnica natynkowa 24M','Rozdzielnice','szt.',91,142,8,8,'5900000000601','IP40 · 2×12 modułów · natynkowa'),
 product('EL-ROZ-602','Obudowa modułowa IP65 12M','Rozdzielnice','szt.',119,179,4,6,'5900000000602','IP65 · 12 modułów · natynkowa')
];
const ID=prefix => `${prefix}-${globalThis.crypto?.randomUUID?.() ?? Math.random().toString(36).slice(2,12)}`;
const time=()=>new Date().toISOString();
const event=(s,detail)=>s.activities.unshift({id:ID('a'),detail,createdAt:time()});
export function emptyStore(){return {version:VERSION,products:CATALOG.map(x=>({...x})),clients:[],leads:[],quotes:[],orders:[],movements:[],activities:[]};}
export function demoStore(){
 const s=emptyStore();
 s.clients=[
 {id:'cl-test-01',name:'Kontrahent testowy 01',contact:'test01@example.invalid',phone:'000 000 001',nip:'',segment:'Instalator',overdue:false,createdAt:'2026-11-13T11:00:00.000Z'},
 {id:'cl-test-02',name:'Kontrahent testowy 02',contact:'test02@example.invalid',phone:'000 000 002',nip:'',segment:'Firma wykonawcza',overdue:false,createdAt:'2026-11-15T11:00:00.000Z'},
 {id:'cl-test-03',name:'Kontrahent testowy 03',contact:'test03@example.invalid',phone:'000 000 003',nip:'',segment:'Integrator Smart Home',overdue:true,createdAt:'2026-11-17T11:00:00.000Z'}
 ];
 s.leads=[
 {id:'lead-test-01',name:'Zapytanie testowe A',contact:'000 000 010',source:'Telefon',interest:'Rozdzielnice',status:'Do wyceny',nextContact:'2026-11-20',notes:'Potrzebna lista materiałowa.',createdAt:'2026-11-18T11:00:00.000Z'},
 {id:'lead-test-02',name:'Zapytanie testowe B',contact:'testowe@example.invalid',source:'Strona WWW',interest:'Oświetlenie LED',status:'Nowe',nextContact:'2026-11-22',notes:'Przykładowa inwestycja.',createdAt:'2026-11-19T07:00:00.000Z'}
 ];
 s.quotes=[{id:'of-test-01',clientId:'cl-test-01',items:[{sku:'EL-KAB-101',qty:100,unitPrice:4.46,unitCost:3.14,unit:'m'},{sku:'EL-APA-201',qty:8,unitPrice:20.8,unitCost:14.2,unit:'szt.'}],discount:0,status:'Wysłana',createdAt:'2026-11-17T11:00:00.000Z',validUntil:'2026-11-26',note:'Oferta demonstracyjna, bez wysyłki.'}];
 s.activities=[{id:'a-test-01',detail:'Wczytano demonstracyjne rekordy ELTRAVIA 360.',createdAt:'2026-11-19T08:00:00.000Z'}];
 return s;
}
export function hasPermission(role,permission){return (ROLES[role]?.permissions??[]).includes(permission);}
export function requireRole(role,permission){if(!hasPermission(role,permission))throw new Error('Brak uprawnień w wybranej roli demonstracyjnej.');}
function str(s,max,label,required=true){let v=String(s??'').trim();if((required&&!v)||v.length>max)throw new Error(`Pole „${label}” musi zawierać 1–${max} znaków.`);return v;}
function qty(n,label){const v=Number(n);if(!Number.isFinite(v)||v<=0||v>1_000_000)throw new Error(`Nieprawidłowa ilość: ${label}.`);return Math.round(v*100)/100;}
function number(n,min,max,label){const v=Number(n);if(!Number.isFinite(v)||v<min||v>max)throw new Error(`Nieprawidłowa wartość: ${label}.`);return v;}
export function addLead(s,data){
 const name=str(data.name,120,'Nazwa'); const contact=str(data.contact,120,'Kontakt');
 const row={id:ID('lead'),name,contact,source:SOURCES.includes(data.source)?data.source:'Inne',interest:str(data.interest,150,'Przedmiot',false),status:'Nowe',nextContact:str(data.nextContact,10,'Data',false),notes:str(data.notes,1500,'Notatki',false),createdAt:time()};
 s.leads.unshift(row);event(s,`Nowy lead: ${row.name}`);return row;
}
export function setLeadStatus(s,id,status){const lead=s.leads.find(x=>x.id===id);if(!lead)throw Error('Nie znaleziono leada.');if(!LEAD_STATUSES.includes(status))throw Error('Nieprawidłowy status.');lead.status=status;event(s,`Lead ${lead.name}: ${status}`);return lead;}
export function addClient(s,data){
 const name=str(data.name,120,'Nazwa kontrahenta');const contact=str(data.contact,120,'Kontakt',false);
 if(s.clients.some(x=>norm(x.name)===norm(name)))throw Error('Kontrahent o tej nazwie już istnieje.');
 const row={id:ID('cl'),name,contact,phone:str(data.phone,32,'Telefon',false),nip:str(data.nip,15,'NIP',false),segment:str(data.segment,90,'Segment',false)||'Instalator',overdue:false,createdAt:time()};
 s.clients.unshift(row);event(s,`Dodano klienta: ${name}`);return row;
}
export function convertLead(s,id){const lead=s.leads.find(x=>x.id===id);if(!lead)throw Error('Nie znaleziono leada.');const client=addClient(s,{name:lead.name,contact:lead.contact,segment:'Instalator'});lead.status='Wygrane';event(s,`Pozyskano klienta: ${lead.name}`);return client;}
export function quoteTotals(quote){const before=quote.items.reduce((a,l)=>a+net(l.qty*l.unitPrice),0);const cost=quote.items.reduce((a,l)=>a+net(l.qty*l.unitCost),0);const value=net(before*(1-quote.discount/100));const margin=net(value-cost);return {value,cost,margin,marginPct:value>0?margin/value:0};}
export function createQuote(s,{clientId,items,discount=0,note='',validUntil=''}){
 if(!s.clients.some(x=>x.id===clientId))throw Error('Wybierz kontrahenta.');
 if(!Array.isArray(items)||!items.length||items.length>100)throw Error('Oferta wymaga 1–100 pozycji.');
 const lines=items.map(l=>{
  const p=s.products.find(x=>x.sku===l.sku);if(!p)throw Error(`Brak SKU ${l.sku}`);
  return {sku:p.sku,qty:qty(l.qty,p.sku),unitPrice:p.price,unitCost:p.cost,unit:p.unit};
 });
 const d=number(discount,0,50,'Rabat');
 const q={id:ID('of'),clientId,items:lines,discount:d,status:'Szkic',createdAt:time(),validUntil:String(validUntil||'').slice(0,10),note:str(note,1500,'Uwagi',false)};
 const t=quoteTotals(q);if(t.marginPct<0.17)throw Error('Oferta poniżej minimalnej marży 17%. Skoryguj rabat.');
 s.quotes.unshift(q);event(s,`Utworzono ofertę ${q.id.slice(-8)}: ${fmt(t.value)} zł netto`);return q;
}
export function setQuoteStatus(s,id,status){const q=s.quotes.find(x=>x.id===id);if(!q)throw Error('Nie znaleziono oferty.');if(!['Szkic','Wysłana','Zaakceptowana','Odrzucona'].includes(status))throw Error('Nieprawidłowy status oferty.');if(s.orders.some(x=>x.quoteId===id))throw Error('Oferta jest powiązana z zamówieniem.');q.status=status;event(s,`Oferta ${id.slice(-8)}: ${status}`);return q;}
export function allocateStock(s,sku){
 const p=s.products.find(x=>x.sku===sku);if(!p)return;let available=net(p.stock-p.reserved);
 for(const o of s.orders.filter(x=>x.status==='W realizacji').sort((a,b)=>a.createdAt.localeCompare(b.createdAt))){
  for(const l of o.items.filter(x=>x.sku===sku)){
   const need=net(l.qty-l.reservedQty);const n=net(Math.min(available,need));if(n>0){l.reservedQty=net(l.reservedQty+n);p.reserved=net(p.reserved+n);available=net(available-n);}
  }
 }
}
export function createOrder(s,quoteId){const q=s.quotes.find(x=>x.id===quoteId);if(!q||q.status!=='Zaakceptowana')throw Error('Zamówienie wymaga zaakceptowanej oferty.');if(s.orders.some(x=>x.quoteId===quoteId))throw Error('Z tej oferty utworzono już zamówienie.');
 const o={id:ID('zam'),clientId:q.clientId,quoteId:q.id,items:q.items.map(l=>({...l,reservedQty:0})),discount:q.discount,status:'W realizacji',paid:false,createdAt:time(),issuedAt:null,paidAt:null};s.orders.unshift(o);
 for(const l of o.items)allocateStock(s,l.sku);event(s,`Zamówienie ${o.id.slice(-8)} utworzone z oferty`);return o;
}
export function orderMissing(o){return o.items.filter(l=>net(l.qty-l.reservedQty)>0).map(l=>({sku:l.sku,qty:net(l.qty-l.reservedQty)}));}
export function receiveGoods(s,sku,amount,note=''){const p=s.products.find(x=>x.sku===sku);if(!p)throw Error('Nieznany indeks SKU.');const n=qty(amount,sku);p.stock=net(p.stock+n);s.movements.unshift({id:ID('pz'),type:'PZ',sku,qty:n,note:str(note,200,'Dokument',false),createdAt:time()});allocateStock(s,sku);event(s,`Przyjęcie PZ: ${sku}, ${fmt(n)} ${p.unit}`);return p;}
export function issueOrder(s,id){const o=s.orders.find(x=>x.id===id);if(!o||o.status!=='W realizacji')throw Error('Nie znaleziono otwartego zamówienia.');if(orderMissing(o).length)throw Error('Nie można wydać zamówienia z brakującym towarem.');
 for(const l of o.items){const p=s.products.find(x=>x.sku===l.sku);if(!p||p.stock<l.qty||p.reserved<l.qty)throw Error(`Niespójny stan magazynu: ${l.sku}`);}
 for(const l of o.items){const p=s.products.find(x=>x.sku===l.sku);p.stock=net(p.stock-l.qty);p.reserved=net(p.reserved-l.qty);s.movements.unshift({id:ID('wz'),type:'WZ',sku:l.sku,qty:-l.qty,orderId:o.id,createdAt:time()});}
 o.status='Wydane';o.issuedAt=time();event(s,`Wydanie WZ zamówienia ${o.id.slice(-8)}`);return o;
}
export function cancelOrder(s,id){const o=s.orders.find(x=>x.id===id);if(!o||o.status!=='W realizacji')throw Error('Tylko otwarte zamówienie można anulować.');for(const l of o.items){const p=s.products.find(x=>x.sku===l.sku);p.reserved=net(p.reserved-l.reservedQty);l.reservedQty=0;}o.status='Anulowane';event(s,`Anulowanie zamówienia ${o.id.slice(-8)}`);return o;}
export function markPaid(s,id){const o=s.orders.find(x=>x.id===id);if(!o||o.status!=='Wydane')throw Error('Najpierw wydaj zamówienie.');if(o.paid)throw Error('Już oznaczono jako opłacone.');o.paid=true;o.paidAt=time();event(s,`Ręczne potwierdzenie wpłaty (testowe): ${o.id.slice(-8)}`);return o;}
export function partnerTier(s,clientId){const c=s.clients.find(x=>x.id===clientId);if(!c)return null;
 const cutoff=Date.now()-90*86400000;
 const turnover=net(s.orders.filter(o=>o.clientId===clientId&&o.paid&&o.paidAt&&new Date(o.paidAt).getTime()>=cutoff).reduce((a,o)=>a+quoteTotals(o).value,0));
 const level=turnover>=180000?'ELITE':turnover>=65000?'PRO':turnover>=20000?'PARTNER':'START';
 return {level,turnover,rebate:c.overdue?0:{START:0,PARTNER:2,PRO:3.5,ELITE:5}[level],suspended:!!c.overdue};
}
export function dashboard(s){const offers=s.quotes.map(quoteTotals);const orders=s.orders.filter(o=>o.status==='Wydane');return {
 newLeads:s.leads.filter(l=>!['Wygrane','Utracone'].includes(l.status)).length,
 quotes:s.quotes.filter(q=>!['Odrzucona','Zaakceptowana'].includes(q.status)).length,
 pipeline:net(s.quotes.filter(q=>q.status!=='Odrzucona').reduce((a,q)=>a+quoteTotals(q).value,0)),
 issued:net(orders.reduce((a,o)=>a+quoteTotals(o).value,0)),paid:net(orders.filter(o=>o.paid).reduce((a,o)=>a+quoteTotals(o).value,0)),
 stockValue:net(s.products.reduce((a,p)=>a+p.stock*p.cost,0)),
 shortage:s.products.filter(p=>p.stock-p.reserved<p.minStock).length,
 ordersOpen:s.orders.filter(o=>o.status==='W realizacji').length,
 averageMargin:offers.length?offers.reduce((a,t)=>a+t.marginPct,0)/offers.length:0
};}
const safeCell=v=>{let s=String(v??'');if(/^[=+\-@\t\r]/.test(s))s="'"+s;return `"${s.replaceAll('"','""')}"`;};
export function exportClientsCsv(s){return ['Nazwa;Kontakt;Telefon;NIP;Segment;Poziom partnera',...s.clients.map(c=>[c.name,c.contact,c.phone,c.nip,c.segment,partnerTier(s,c.id)?.level].map(safeCell).join(';'))].join('\r\n');}
export function validateBackup(v){if(!v||v.version!==VERSION||!Array.isArray(v.products)||!Array.isArray(v.clients)||!Array.isArray(v.leads)||!Array.isArray(v.quotes)||!Array.isArray(v.orders)||!Array.isArray(v.movements)||!Array.isArray(v.activities))throw Error('Nieprawidłowy format pliku.');if(v.products.length>10000||v.clients.length>10000||v.leads.length>10000||v.quotes.length>10000||v.orders.length>10000)throw Error('Plik zawiera zbyt wiele rekordów.');for(const p of v.products){if(!p.sku||!Number.isFinite(p.stock)||!Number.isFinite(p.reserved)||p.stock<0||p.reserved<0||p.reserved>p.stock||!Number.isFinite(p.cost)||!Number.isFinite(p.price))throw Error('Nieprawidłowe dane magazynowe.');}return true;}