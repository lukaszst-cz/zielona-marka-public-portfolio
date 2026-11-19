export const STORAGE_KEY = 'black-harbor-360-demo-v1';
export const STATUS = ['Nowy', 'Kontakt', 'Wycena', 'Wygrany', 'Utracony'];
export const SOURCES = ['Google', 'Instagram', 'Facebook', 'Polecenie', 'Telefon', 'Strona WWW', 'Inne'];
export const SERVICES = ['Mycie detailingowe', 'Detailing wnętrza', 'Korekta lakieru', 'Powłoka ceramiczna', 'Pakiet indywidualny'];
export function blankStore(){return {version:1,leads:[],clients:[],vehicles:[],activities:[]};}
export function normalize(v){return String(v ?? '').trim().toLocaleLowerCase('pl-PL');}
export function validateLead(input){
 const v={name:String(input.name??'').trim(),phone:String(input.phone??'').trim(),email:String(input.email??'').trim().toLowerCase(),service:String(input.service??'').trim(),source:String(input.source??'Inne'),vehicle:String(input.vehicle??'').trim(),nextContact:String(input.nextContact??'').trim(),notes:String(input.notes??'').trim()};
 if(v.name.length<2 || v.name.length>120)throw new Error('Podaj nazwę klienta (2–120 znaków).');
 if(!v.phone && !v.email)throw new Error('Podaj telefon lub e-mail.');
 if(v.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.email))throw new Error('Nieprawidłowy adres e-mail.');
 if(v.phone && !/^[+\d\s().-]{6,24}$/.test(v.phone))throw new Error('Nieprawidłowy numer telefonu.');
 if(v.notes.length>3000)throw new Error('Notatka może mieć maksymalnie 3000 znaków.');
 if(!SERVICES.includes(v.service))throw new Error('Wybierz usługę z listy.');
 if(!SOURCES.includes(v.source))throw new Error('Wybierz źródło kontaktu.');
 if(v.nextContact && !/^\d{4}-\d{2}-\d{2}$/.test(v.nextContact))throw new Error('Nieprawidłowa data kontaktu.');
 return v;
}
export function validateClient(input){
 const v={name:String(input.name??'').trim(),phone:String(input.phone??'').trim(),email:String(input.email??'').trim().toLowerCase(),notes:String(input.notes??'').trim()};
 if(v.name.length<2 || v.name.length>120)throw new Error('Podaj nazwę klienta (2–120 znaków).');
 if(!v.phone && !v.email)throw new Error('Wpisz telefon lub e-mail.');
 if(v.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.email))throw new Error('Nieprawidłowy adres e-mail.');
 if(v.phone && !/^[+\d\s().-]{6,24}$/.test(v.phone))throw new Error('Nieprawidłowy numer telefonu.');
 if(v.notes.length>3000)throw new Error('Notatka może mieć maksymalnie 3000 znaków.');
 return v;
}
export function validateVehicle(input, clients){
 const v={clientId:String(input.clientId??''),makeModel:String(input.makeModel??'').trim(),year:String(input.year??'').trim(),registration:String(input.registration??'').trim().toUpperCase(),notes:String(input.notes??'').trim()};
 if(!clients.some(c=>c.id===v.clientId))throw new Error('Wybierz klienta z listy.');
 if(v.makeModel.length<2 || v.makeModel.length>120)throw new Error('Podaj markę i model pojazdu.');
 if(v.year && (!/^\d{4}$/.test(v.year) || Number(v.year)<1950 || Number(v.year)>new Date().getFullYear()+1))throw new Error('Nieprawidłowy rok pojazdu.');
 if(v.registration.length>20 || v.notes.length>2000)throw new Error('Zbyt długi opis pojazdu.');
 return v;
}
export function totals(data, day=new Date().toISOString().slice(0,10)){
 const active=data.leads.filter(l=>!['Wygrany','Utracony'].includes(l.status));
 return {active:active.length, newLeads:data.leads.filter(l=>l.status==='Nowy').length, won:data.leads.filter(l=>l.status==='Wygrany').length, clients:data.clients.length, vehicles:data.vehicles.length, due:active.filter(l=>l.nextContact && l.nextContact<=day).length, conversion:data.leads.length?Math.round(100*data.leads.filter(l=>l.status==='Wygrany').length/data.leads.length):0};
}
export function duplicateLead(data,v){return data.leads.find(l=>(v.email && l.email && normalize(l.email)===normalize(v.email)) || (v.phone && l.phone && l.phone.replace(/\D/g,'')===v.phone.replace(/\D/g,'')));}
export function convertLead(data,leadId,newId,now){
 const lead=data.leads.find(l=>l.id===leadId);if(!lead)throw new Error('Nie odnaleziono zapytania.');
 if(lead.clientId)return {clientId:lead.clientId,created:false};
 const client=data.clients.find(c=>(lead.email && c.email && normalize(c.email)===normalize(lead.email))||(lead.phone && c.phone && c.phone.replace(/\D/g,'')===lead.phone.replace(/\D/g,'')));
 const id=client?.id||newId;
 if(!client)data.clients.unshift({id,name:lead.name,phone:lead.phone,email:lead.email,notes:lead.notes||'',createdAt:now});
 lead.status='Wygrany';lead.clientId=id;lead.updatedAt=now;
 return {clientId:id,created:!client};
}
export function csvCell(s){let v=String(s??'');if(/^[\s]*[=+\-@]/.test(v))v="'"+v;return '"'+v.replaceAll('"','""')+'"';}
export function exportLeadsCSV(leads){const headers=['ID','Nazwa','Telefon','E-mail','Usługa','Pojazd','Źródło','Status','Następny kontakt','Notatka','Utworzono'];const rows=leads.map(l=>[l.id,l.name,l.phone,l.email,l.service,l.vehicle,l.source,l.status,l.nextContact,l.notes,l.createdAt]);return '\uFEFF'+[headers,...rows].map(r=>r.map(csvCell).join(';')).join('\r\n');}
export function assertStore(o){
 if(!o||o.version!==1||!['leads','clients','vehicles','activities'].every(k=>Array.isArray(o[k])))throw new Error('Nieprawidłowy format kopii danych.');
 if([o.leads,o.clients,o.vehicles,o.activities].some(a=>a.length>5000))throw new Error('Plik przekracza limit 5000 wpisów w jednej kategorii.');
 const validId=x=>typeof x==='string'&&x.length>0&&x.length<=100;
 const validString=x=>typeof x==='string'&&x.length<=3000;
 const uniqueIds=a=>new Set(a.map(x=>x.id)).size===a.length;
 if(![o.leads,o.clients,o.vehicles,o.activities].every(uniqueIds))throw new Error('Kopia zawiera powtarzające się identyfikatory.');
 if(o.clients.some(c=>!c||!validId(c.id)||!validString(c.name)||c.name.length<2||!validString(c.createdAt)))throw new Error('Nieprawidłowa karta klienta.');
 const cIds=new Set(o.clients.map(c=>c.id));
 if(o.vehicles.some(v=>!v||!validId(v.id)||!cIds.has(v.clientId)||!validString(v.makeModel)||!v.makeModel||!validString(v.createdAt)))throw new Error('Nieprawidłowa karta pojazdu.');
 if(o.leads.some(l=>!l||!validId(l.id)||!validString(l.name)||!l.name||!STATUS.includes(l.status)||!validString(l.service)||!validString(l.source)||!validString(l.createdAt)||!validString(l.updatedAt)||l.clientId&&!cIds.has(l.clientId)))throw new Error('Nieprawidłowy rekord zapytania.');
 if(o.activities.some(a=>!a||!validId(a.id)||!validString(a.action)||!validString(a.detail)||!validString(a.createdAt)))throw new Error('Nieprawidłowy dziennik zdarzeń.');
 return o;
}
export function demoData(){
 const d=blankStore();const t=new Date().toISOString();const clients=[['C-001','Klient testowy 001','Audi A6'],['C-002','Klient testowy 002','BMW Seria 3']];
 for(const [id,name,model] of clients){d.clients.push({id,name,phone:'',email:`${id.toLowerCase()}@example.invalid`,notes:'Rekord testowy, nie jest rzeczywistym klientem.',createdAt:t});d.vehicles.push({id:id.replace('C','V'),clientId:id,makeModel:model,year:'2020',registration:'',notes:'Pojazd testowy',createdAt:t});}
 const entries=[['L-001','Kontakt testowy 001','Nowy','Powłoka ceramiczna','Google',0],['L-002','Kontakt testowy 002','Kontakt','Detailing wnętrza','Polecenie',1],['L-003','Kontakt testowy 003','Wycena','Korekta lakieru','Instagram',2],['L-004','Kontakt testowy 004','Wygrany','Mycie detailingowe','Telefon',-1],['L-005','Kontakt testowy 005','Utracony','Pakiet indywidualny','Strona WWW',-1]];
 for(const [id,name,status,service,source,offset] of entries){let date='';if(offset>=0){const x=new Date();x.setDate(x.getDate()+offset);date=x.toISOString().slice(0,10)}d.leads.push({id,name,status,service,source,vehicle:'',phone:'',email:id.toLowerCase()+'@example.invalid',nextContact:date,notes:'Przykładowe zgłoszenie do testowania workflow.',createdAt:t,updatedAt:t,clientId:status==='Wygrany'?'C-001':null});}
 d.activities=[{id:'A-001',entity:'system',entityId:'',action:'Dane testowe',detail:'Wczytano fikcyjne rekordy demonstracyjne.',createdAt:t}];return d;
}