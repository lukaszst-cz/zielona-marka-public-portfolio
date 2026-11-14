# SOLIDOM | finalna wersja dynamiczna

**Status:** wersja zaakceptowana 14 listopada 2026 r. i opublikowana pod adresem [solidom.vercel.app](https://solidom.vercel.app/).

- [Karta w portfolio Zielonej Marki](https://zielona-marka.pl/portfolio/solidom)
- [Pełne archiwum, wraz ze zdjęciami](https://drive.google.com/drive/folders/1dgsa9MAx-I0d5mk6-1rtQ-u153QvVkDT)
- [Szczegółowy opis wykonania](CASE-STUDY.md)

## Zawartość

Zapisano źródła HTML, CSS i JavaScript pobrane z działającego adresu oraz konfigurację PWA. Wersja obejmuje sześć głównych obszarów: wizualizację usług, galerię zdjęć, etapy współpracy, opinie, FAQ i kontakt. Wyróżnikiem jest zestaw animacji uruchamianych podczas przewijania oraz pięć liczników.

Zdjęcia i ikony znajdują się w ZIP na Dysku Google. Skrypt `download-assets.mjs` może pobrać je również z aktywnego serwisu. Aby uruchomić lokalnie: `node download-assets.mjs`, następnie `python3 -m http.server 8000`.

## Zakres techniczny

Statyczne HTML/CSS/JS, responsywne układy grid i flex, animacje CSS, requestAnimationFrame, IntersectionObserver, filtrowanie galerii, okna dialogowe oraz karuzela przykładowych wypowiedzi. Manifest i service worker umożliwiają podstawowe działanie PWA. Zgodnie z `prefers-reduced-motion` animacje są ograniczane u odbiorców, którzy tego potrzebują.

Formularz wyceny sprawdza walidację bez zapisu i bez wysyłki danych. Panel Zielonej Marki przygotowuje e-mail do samodzielnego wysłania.

Marka SOLIDOM jest fikcyjna, a statystyki, zdjęcia i wypowiedzi są poglądowe. Nie ma integracji z realną firmą budowlaną ani systemem zamówień.

## Ochrona historii

Ten katalog pokazuje ostatnią, zaakceptowaną wersję. Poprzednia pozostaje w historii commitów Git. Na Dysku Google starsze ZIP-y zostały pozostawione jako archiwum.
