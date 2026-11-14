'use strict';

const $ = (selector, context = document) => context.querySelector(selector);
const $$ = (selector, context = document) => Array.from(context.querySelectorAll(selector));

const menuButton = $('.menu-toggle');
const mobileNav = $('#mobile-nav');
function setMenu(open) {
  menuButton.setAttribute('aria-expanded', String(open));
  menuButton.setAttribute('aria-label', open ? 'Zamknij menu' : 'Otwórz menu');
  $('use', menuButton).setAttribute('href', open ? '#i-x' : '#i-menu');
  mobileNav.hidden = !open;
}
menuButton.addEventListener('click', () => setMenu(menuButton.getAttribute('aria-expanded') !== 'true'));
$$('.mobile-nav a').forEach(link => link.addEventListener('click', () => setMenu(false)));
window.addEventListener('keydown', event => { if (event.key === 'Escape') setMenu(false); });
window.addEventListener('resize', () => { if (window.innerWidth > 1020) setMenu(false); });

const sections = $$('.desktop-nav a[href^="#"]').map(link => ({ link, section: $(link.getAttribute('href')) })).filter(x => x.section);
if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver(entries => {
    entries.filter(entry => entry.isIntersecting).forEach(entry => {
      sections.forEach(({link, section}) => link.classList.toggle('is-current', section === entry.target));
    });
  }, { rootMargin: '-28% 0px -60% 0px', threshold: 0 });
  sections.forEach(({section}) => observer.observe(section));
}
const backTop = $('.back-top');
window.addEventListener('scroll', () => backTop.classList.toggle('visible', window.scrollY > 850), {passive:true});
backTop.addEventListener('click', () => window.scrollTo({top:0, behavior: 'smooth'}));
$('#current-year').textContent = String(new Date().getFullYear());

const services = {
  budowa: { title: 'Budowa domów', select: 'Budowa domu', description: 'W przykładowej ofercie pokazujemy kompleksową realizację domu, od przygotowania działki po ostatnie prace wykończeniowe.', points: ['Przygotowanie i organizacja placu budowy', 'Roboty ziemne, fundamenty i konstrukcja', 'Dach, stolarka i prace zewnętrzne', 'Prace instalacyjne i wykończeniowe'] },
  wykonczenia: { title: 'Wykończenia wnętrz', select: 'Wykończenie wnętrz', description: 'Przykładowa usługa dla osób, które chcą wprowadzić się do gotowego, estetycznie urządzonego wnętrza.', points: ['Ściany, sufity i podłogi', 'Zabudowy gipsowo-kartonowe', 'Montaż drzwi i wyposażenia', 'Łazienki, kuchnie i detale wykończenia'] },
  remont: { title: 'Remonty', select: 'Remont', description: 'Od niewielkiego odświeżenia po pełną zmianę układu i standardu mieszkania lub lokalu.', points: ['Ustalenie zakresu i kolejności prac', 'Demontaże i przygotowanie podłoża', 'Zmiany instalacji i przebudowy', 'Malowanie i wykończenie pomieszczeń'] },
  elewacje: { title: 'Elewacje', select: 'Elewacje', description: 'Propozycja realizacji i modernizacji elewacji z naciskiem na funkcję ochronną i wygląd budynku.', points: ['Ocena stanu podłoża', 'Dobór systemu i materiałów', 'Ocieplenie oraz warstwy wykończeniowe', 'Obróbki i elementy dekoracyjne'] },
  instalacje: { title: 'Instalacje', select: 'Instalacje', description: 'Pokazowy zakres instalacyjny dla nowych budynków i modernizowanych wnętrz.', points: ['Instalacje wodno-kanalizacyjne', 'Instalacje elektryczne i oświetlenie', 'Ogrzewanie i wentylacja', 'Koordynacja instalacji z wykończeniem'] },
  zarzadzanie: { title: 'Zarządzanie projektem', select: 'Zarządzanie projektem', description: 'Dla inwestorów, którzy chcą uporządkować harmonogram, budżet i współpracę wielu ekip.', points: ['Plan i harmonogram robót', 'Koordynacja wykonawców', 'Przeglądy postępów i odbiory etapów', 'Raportowanie ustaleń i zakresów'] },
  aranzacja: { title: 'Aranżacja wnętrz', select: 'Aranżacja wnętrz', description: 'Przykładowa usługa łącząca estetykę, ergonomię i dobór praktycznych rozwiązań.', points: ['Analiza potrzeb i stylu życia', 'Układ funkcjonalny pomieszczeń', 'Propozycje kolorów i materiałów', 'Koordynacja wdrożenia aranżacji'] }
};
const serviceDialog = $('#service-dialog');
let selectedService = null;
function closeDialog(dialog) { if (dialog.open) dialog.close(); }
$$('.service-more').forEach(button => button.addEventListener('click', () => {
  const key = button.dataset.service, item = services[key];
  if (!item) return;
  selectedService = item;
  $('#service-modal-title').textContent = item.title;
  $('#service-modal-description').textContent = item.description;
  const list = $('#service-modal-list'); list.replaceChildren();
  item.points.forEach(point => {
    const li = document.createElement('li');
    li.innerHTML = '<svg class="icon" aria-hidden="true"><use href="#i-check"></use></svg>';
    li.append(document.createTextNode(point));
    list.append(li);
  });
  serviceDialog.showModal();
}));
$('.dialog-inquiry').addEventListener('click', () => {
  if (selectedService) $('#service-select').value = selectedService.select;
  closeDialog(serviceDialog);
  $('#kontakt').scrollIntoView({behavior:'smooth'});
  setTimeout(() => $('#service-select').focus({preventScroll:true}), 550);
});

const projectDialog = $('#project-dialog');
$$('.project-card').forEach(card => card.addEventListener('click', () => {
  $('#project-modal-image').src = card.dataset.image;
  $('#project-modal-image').alt = $('img',card).alt;
  $('#project-modal-title').textContent = card.dataset.title;
  $('#project-modal-description').textContent = card.dataset.subtitle;
  projectDialog.showModal();
}));
$$('.dialog-close').forEach(button => button.addEventListener('click', () => closeDialog(button.closest('dialog'))));
[serviceDialog, projectDialog].forEach(dialog => dialog.addEventListener('click', event => {
  if (event.target === dialog) dialog.close();
}));

$$('.filter-btn').forEach(button => button.addEventListener('click', () => {
  $$('.filter-btn').forEach(item => {item.classList.toggle('active', item === button);item.setAttribute('aria-pressed', String(item === button));});
  const filter = button.dataset.filter;
  $$('.project-card').forEach(card => { card.hidden = filter !== 'all' && card.dataset.category !== filter; });
  $('.gallery-empty').hidden = !!$$('.project-card:not([hidden])').length;
}));

const quoteForm = $('#quote-form');
quoteForm.addEventListener('submit', event => {
  const isLocal = location.protocol === 'file:' || ['localhost', '127.0.0.1'].includes(location.hostname);
  const demoMode = quoteForm.dataset.demo === 'true';
  if (!isLocal && !demoMode) return; // Prawdziwa wysyłka dopiero po wyłączeniu trybu DEMO.
  event.preventDefault();
  const status = $('.form-message');
  status.hidden = false;
  status.textContent = 'Formularz działa: przeszła walidacja pól i potwierdzenie testowe. Dane nie zostały nigdzie wysłane ani zapisane. To demonstracja fikcyjnej firmy.';
  status.scrollIntoView({behavior:'smooth',block:'nearest'});
});


// Wszystkie liczniki zaczynają od zera w tej samej chwili.
// Wartości w HTML pozostają końcowe, aby były czytelne bez JavaScript.
// Uruchomienie następuje dopiero gdy cały pasek statystyk jest widoczny.
const statsPanel = $('#liczniki');
const animatedCounters = statsPanel ? $$('.counter-number[data-count]', statsPanel) : [];
const countFormatter = value => String(Math.floor(value)).replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
const prefersLessMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
const counterText = (value, element) => countFormatter(value) + (element.dataset.suffix || '');
const easeOut = value => 1 - Math.pow(1 - value, 3);
let statFrames = null;
let statsLastStarted = 0;
let statsCenteredBefore = false;

function playStats() {
  if (!statsPanel || prefersLessMotion.matches) return;
  if (Date.now() - statsLastStarted < 3500) return;
  statsLastStarted = Date.now();
  if (statFrames !== null) window.cancelAnimationFrame(statFrames);
  const items = animatedCounters.map(element => ({
    element, target: Number(element.dataset.count) || 0,
    duration: Math.max(600, Number(element.dataset.duration) || 2400),
    featured: element.dataset.featured === 'true',
    stat: element.closest('.stat')
  }));
  items.forEach(item => {
    item.element.textContent = counterText(0,item.element);
    item.element.classList.remove('counter-done');
    item.stat?.classList.remove('stat-done');
    if(item.featured){ item.stat?.classList.add('stat-counting'); item.stat?.style.setProperty('--counter-fraction','0'); }
  });
  const begins = performance.now() + 180;
  const render = now => {
    let finished = true;
    for(const item of items){
      const progress = Math.min(1, Math.max(0, (now - begins) / item.duration));
      const value = progress === 1 ? item.target : Math.floor(item.target * easeOut(progress));
      item.element.textContent = counterText(value,item.element);
      if(item.featured) item.stat?.style.setProperty('--counter-fraction',progress.toFixed(3));
      if(progress < 1){ finished = false; } else if(!item.element.classList.contains('counter-done')){
        item.element.classList.add('counter-done');
        item.stat?.classList.remove('stat-counting');
        item.stat?.classList.add('stat-done');
      }
    }
    if(!finished) statFrames=window.requestAnimationFrame(render);
    else statFrames=null;
  };
  statFrames=window.requestAnimationFrame(render);
}

function checkStatsVisibility(){
  if(!statsPanel || prefersLessMotion.matches) return;
  const rect=statsPanel.getBoundingClientRect();
  const centered=rect.top < window.innerHeight * .77 && rect.bottom > window.innerHeight * .12;
  if(centered && !statsCenteredBefore)playStats();
  statsCenteredBefore=centered;
}

if(statsPanel){
  if(!prefersLessMotion.matches){
    animatedCounters.forEach(element=>{element.textContent=counterText(0,element);});
    window.addEventListener('scroll',checkStatsVisibility,{passive:true});
    window.addEventListener('resize',checkStatsVisibility);
    window.setTimeout(checkStatsVisibility,900);
  }
}

// Przykładowa karuzela recenzji. To nie są prawdziwe opinie ani wpisy Google.
const demoReviews = [
  {stars:5, quote:'Dobry kontakt, czytelny kosztorys i sprawna organizacja prac od początku do końca.', title:'Opinia 01', type:'Budowa domu'},
  {stars:5, quote:'Zespół zadbał o każdy detal wykończenia. Wiedzieliśmy, co dzieje się na budowie.', title:'Opinia 02', type:'Wykończenie wnętrz'},
  {stars:4, quote:'Rzeczowa komunikacja i rozwiązania, które sprawdziły się w praktyce.', title:'Opinia 03', type:'Remont mieszkania'},
  {stars:5, quote:'Wszystkie etapy były dobrze wyjaśnione, a projekt przedstawiono w czytelny sposób.', title:'Opinia 04', type:'Modernizacja domu'},
  {stars:4, quote:'Dobra jakość pracy i pomoc przy doborze materiałów. Przydałaby się częstsza aktualizacja terminów.', title:'Opinia 05', type:'Elewacja budynku'},
  {stars:5, quote:'Od pierwszej rozmowy do ostatnich detali mieliśmy jasny plan działania.', title:'Opinia 06', type:'Remont domu'},
  {stars:5, quote:'Bardzo wygodne rozwiązanie dla osób, które chcą powierzyć kilka etapów jednej ekipie.', title:'Opinia 07', type:'Budowa pod klucz'},
  {stars:5, quote:'Pomoc w organizacji prac oszczędziła sporo niepotrzebnych ustaleń z wykonawcami.', title:'Opinia 08', type:'Zarządzanie projektem'},
  {stars:5, quote:'Dbałość o szczegóły oraz konkretne odpowiedzi na pytania inwestora.', title:'Opinia 09', type:'Wykończenie mieszkania'}
];
let reviewsPage = 0;
let reviewsTimer = null;
let reviewsVisible = false;
const reviewsList = $('.review-rotator');
const reviewCards = $$('.review-card', reviewsList);
const reviewsSection = $('#opinie');
const reviewsDots = $$('.review-dot');
const reviewMotion = !prefersLessMotion.matches;
function paintReviews(page) {
  reviewsPage = (page + 3) % 3;
  reviewCards.forEach((card, index) => {
    const item = demoReviews[reviewsPage * 3 + index];
    const stars = $('.stars',card);
    stars.textContent = '★'.repeat(item.stars) + '☆'.repeat(5 - item.stars);
    stars.setAttribute('aria-label', `Przykładowa ocena: ${item.stars} na 5 gwiazdek`);
    $('p',card).textContent = `„${item.quote}”`;
    $('footer strong',card).textContent = item.title;
    $('footer small',card).textContent = item.type;
    $('.avatar',card).textContent = item.title.slice(-1);
  });
  reviewsDots.forEach((dot,index) => {
    dot.classList.toggle('is-active',index === reviewsPage);
    if(index === reviewsPage) dot.setAttribute('aria-current','true');
    else dot.removeAttribute('aria-current');
  });
}
let reviewTransitioning = false;
function changeReviews(page) {
  if (reviewTransitioning) return;
  if (!reviewMotion) { paintReviews(page); return; }
  reviewTransitioning = true;
  reviewsList.classList.add('is-switching');
  window.setTimeout(() => {
    paintReviews(page);
    reviewsList.classList.remove('is-switching');
    reviewTransitioning = false;
  },240);
}
function pauseReviewTimer() { if(reviewsTimer !== null) {clearInterval(reviewsTimer);reviewsTimer = null;} }
function mayRotate() { return reviewsVisible && reviewMotion && !document.hidden && !reviewsSection.matches(':hover') && !reviewsSection.contains(document.activeElement); }
function updateReviewTimer(){
  pauseReviewTimer();
  if (mayRotate()) reviewsTimer = window.setInterval(() => changeReviews(reviewsPage+1),5000);
}
$('.review-prev').addEventListener('click',()=>{changeReviews(reviewsPage-1);updateReviewTimer();});
$('.review-next').addEventListener('click',()=>{changeReviews(reviewsPage+1);updateReviewTimer();});
reviewsDots.forEach(dot=>dot.addEventListener('click',()=>{changeReviews(Number(dot.dataset.reviewPage));updateReviewTimer();}));
reviewsSection.addEventListener('mouseenter',updateReviewTimer);
reviewsSection.addEventListener('mouseleave',updateReviewTimer);
reviewsSection.addEventListener('focusin',updateReviewTimer);
reviewsSection.addEventListener('focusout',()=>window.setTimeout(updateReviewTimer,0));
document.addEventListener('visibilitychange',updateReviewTimer);
paintReviews(0);
if ('IntersectionObserver' in window) {
 const reviewsObserver = new IntersectionObserver(entries=>{reviewsVisible = entries.some(e=>e.isIntersecting); updateReviewTimer();},{threshold:.2});
 reviewsObserver.observe(reviewsSection);
} else { reviewsVisible = true;updateReviewTimer(); }

// Delikatne wejście kart, aktywne tylko przy normalnych ustawieniach ruchu.
if ('IntersectionObserver' in window && !prefersLessMotion.matches) {
  const revealItems = $$('.benefit, .step');
  const revealObserver = new IntersectionObserver(entries=>{
    entries.forEach(entry=>{
      if(!entry.isIntersecting) return;
      entry.target.classList.add('is-revealed');
      revealObserver.unobserve(entry.target);
    });
  },{threshold:.12,rootMargin:'0px 0px -22px 0px'});
  revealItems.forEach((item,index)=>{
    item.classList.add('reveal-ready');
    item.style.setProperty('--reveal-delay',`${(index%5)*65}ms`);
    revealObserver.observe(item);
  });
}
