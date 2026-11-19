// Docelowy model ról. Interfejs podglądu nie stanowi mechanizmu autoryzacji.
export const ROLE_CAPABILITIES = [
  {key:'leads',label:'Zapytania i kontakty'},
  {key:'clients',label:'Kartoteka klientów i pojazdów'},
  {key:'bookings',label:'Terminarz i stanowiska'},
  {key:'jobs',label:'Realizacja i kontrola jakości'},
  {key:'club',label:'Program lojalnościowy'},
  {key:'payments',label:'Płatności i rozliczenia'},
  {key:'reports',label:'Wynik finansowy i koszty'},
  {key:'settings',label:'Użytkownicy i ustawienia'}
];
export const ROLE_PLAN = [
  {id:'owner',name:'Właściciel',description:'Pełen wgląd w biznes i konfigurację.',grants:['leads','clients','bookings','jobs','club','payments','reports','settings']},
  {id:'manager',name:'Menedżer',description:'Koordynacja operacji, klientów i rozliczeń.',grants:['leads','clients','bookings','jobs','club','payments','reports']},
  {id:'operator',name:'Operator studia',description:'Recepcja i realizacja usług w jednej roli przejściowej.',grants:['leads','clients','bookings','jobs','club']},
  {id:'read_only',name:'Podgląd',description:'Odczyt operacji bez edycji, płatności i konfiguracji.',grants:['leads','clients','bookings','jobs','club']}
];
export function roleHasCapability(roleId,capability){return ROLE_PLAN.find(r=>r.id===roleId)?.grants.includes(capability)??false;}
export const WORKFLOW = [
 {index:'01',title:'Pozyskanie klienta',desc:'Źródło zapytania, kontakt, termin ponowienia',status:'active',module:'leads'},
 {index:'02',title:'Wycena i akceptacja',desc:'Pakiet, czas pracy, materiały i marża',status:'planned'},
 {index:'03',title:'Rezerwacja stanowiska',desc:'Grafik personelu, zaliczka i dostępność',status:'planned'},
 {index:'04',title:'Realizacja usługi',desc:'Karta pracy, zużycie chemii, zdjęcia i kontrola jakości',status:'planned'},
 {index:'05',title:'Płatność i faktura',desc:'Status rozliczenia i zewnętrzny system fakturowania',status:'planned'},
 {index:'06',title:'BLACK HARBOR CLUB',desc:'Punkty, powroty, wartość relacji i koszt benefitów',status:'local',module:'club'},
 {index:'07',title:'Raportowanie i rozwój',desc:'Rachunek kosztów, rentowność, źródła sprzedaży',status:'planned'}
];