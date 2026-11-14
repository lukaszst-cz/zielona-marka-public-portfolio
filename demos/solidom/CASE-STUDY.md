# SOLIDOM. Studium projektu strony firmy budowlanej

**Wersja finalna zaakceptowana:** 14 listopada 2026 r.  
**Działająca wersja:** https://solidom.vercel.app/  
**Portfolio:** https://zielona-marka.pl/portfolio/solidom

## Założenie i cel

Stworzenie kompletnego przykładu nowoczesnej witryny firmy z branży budowlanej, który można pokazać potencjalnemu klientowi. Strona ma prowadzić od obejrzenia usług do kontaktu i wyceny, bez konieczności przechodzenia przez wiele podstron.

## Koncepcja wizualna

- Granatowa paleta buduje spójny, techniczny charakter firmy; pomarańczowy akcent podkreśla najważniejsze interakcje.
- Typografia Manrope i duży nagłówek zapewniają mocną hierarchię.
- Główne zdjęcie domu łączy wizerunek firmy z realnymi tematami oferty; jego delikatny ruch podczas przewijania wzmacnia głębię bez odrywania uwagi od treści.
- Osobne zdjęcia usług i etapów współpracy, karty realizacji, uporządkowane FAQ i stopka zapewniają czytelne prowadzenie przez stronę.
- Na mniejszych ekranach siatki przechodzą do układu pionowego, a fotografia i kontrolki dostosowują proporcje.

## Projekt ścieżki użytkownika

1. **Górna część**: czytelny zakres działalności i przyciski do wyceny oraz realizacji.
2. **Karty usług**: szybki przegląd i dodatkowe informacje w dialogach.
3. **Galeria**: filtrowanie kategorii oraz możliwość powiększenia zdjęć.
4. **Atuty i etapy współpracy**: pięć wartości liczbowych animowanych od zera i cztery etapy ze zdjęciami.
5. **Opinie i FAQ**: automatyczna karuzela z ręcznym sterowaniem, a także rozwijane odpowiedzi.
6. **Kontakt**: walidowany formularz testowy i kontakt do autora demonstracji.

## Interakcje i animacje

- Nagłówek, opis i przyciski pojawiają się kolejno po załadowaniu.
- Zdjęcie hero reaguje subtelnym przesunięciem na przewijanie.
- Cienka linia u góry ekranu pokazuje postęp przewijania.
- Sekcje, karty usług i realizacje płynnie wchodzą w pole widzenia.
- W filtrach galerii zmiana widocznych kart jest animowana.
- Karty etapów współpracy podświetlają się w zależności od pozycji na ekranie i interakcji wskaźnikiem.
- Pięć liczników powiększa wartości od zera, z możliwością ponownego odtworzenia po powrocie do sekcji.
- Ruch jest ograniczany przy ustawieniu systemowym `prefers-reduced-motion`.

## Architektura techniczna

- HTML5 z semantycznymi sekcjami, etykietami i elementami dostępności.
- CSS z siatkami, flexboxem, media queries, transformacjami i transitions.
- Czysty JavaScript obsługujący filtry, `<dialog>`, karuzelę opinii, liczniki, obserwację sekcji przez `IntersectionObserver` oraz animacje `requestAnimationFrame`.
- PWA: `manifest.webmanifest`, ikony 192 i 512 px, `service-worker.js` i podstawowy cache offline.
- Publikacja na Vercel pod adresem HTTPS; pliki statyczne i zasoby zdjęciowe są osobnymi elementami.
- Formularz działa w trybie testowym: waliduje pola i pokazuje komunikat, lecz nie wysyła ani nie zapisuje danych.
- Panel Zielonej Marki wykorzystuje odizolowane style, linki kontaktowe i opcję przygotowania wiadomości e-mail.

## Testy i ograniczenia

Wersja została zweryfikowana po publikacji: odpowiedź HTTP 200 dla HTML, CSS, JavaScript oraz wybranych zdjęć; poprawna obecność czterech etapów, skryptu dynamiki, formularza i stopki. Nie jest to dowód kompleksowego testu na każdej przeglądarce czy urządzeniu.

Witryna pokazuje fikcyjną markę budowlaną. Zdjęcia, opinie i liczby są materiałem poglądowym, a przedstawione interakcje nie oznaczają rzeczywistego połączenia z płatnościami, magazynem lub systemem rezerwacji. Służą demonstracji projektu i jego funkcji.

## Materiały

- Kod i historia: https://github.com/lukaszst-cz/zielona-marka-public-portfolio/tree/main/demos/solidom
- Pełne archiwum z obrazami: https://drive.google.com/drive/folders/1dgsa9MAx-I0d5mk6-1rtQ-u153QvVkDT
- Karta portfolio: https://zielona-marka.pl/portfolio/solidom
