# SOLIDOM | demonstracja strony budowlanej

Wersja opublikowana **14 listopada 2026 r.**, zakwalifikowana do portfolio **Zielonej Marki**.

- [Działająca strona SOLIDOM](https://solidom.vercel.app/)
- [Karta w portfolio Zielonej Marki](https://zielona-marka.pl/portfolio/solidom)
- [Dokumentacja i kompletne archiwum projektu na Dysku Google](https://drive.google.com/drive/folders/1dgsa9MAx-I0d5mk6-1rtQ-u153QvVkDT)

## Zakres

Responsywna witryna HTML/CSS/JS z ofertą usług budowlanych, galerią przykładowych prac, czterema etapami współpracy ze zdjęciami, animowanymi licznikami od zera, karuzelą przykładowych opinii, FAQ i interaktywnymi formularzami. Dodano podstawowe PWA (manifest i service worker).

**Status:** autorski projekt pokazowy. SOLIDOM jest fikcyjną marką. Liczba inwestycji, opinie, zdjęcia oraz realizacje mają charakter poglądowy i nie potwierdzają działalności realnej firmy. Formularz wyceny nie wysyła danych na serwer, a panel Zielonej Marki przygotowuje e-mail do samodzielnego wysłania. Brak backendu zamówień.

## Pliki i uruchomienie lokalne

Pliki kodu HTML/CSS/JS oraz PWA zostały skopiowane z aktywnej publikacji z 14.11.2026. Dla mniejszej objętości repozytorium obrazy zapisano w pełnej paczce na Dysku Google. Można je również odtworzyć ze strony demonstracyjnej:

```bash
cd demos/solidom
node download-assets.mjs
python3 -m http.server 8000
```

Po pobraniu obrazów otwórz `http://localhost:8000`. Skrypt pobiera zasoby z opublikowanej demonstracji. Gdy źródłowy adres przestanie działać, użyj pełnego archiwum ZIP z Dysku Google.

Autor: **Zielona Marka**. Portfolio i dokumentacja dotyczą demonstracji, nie realizacji wykonanej dla zewnętrznego klienta.
