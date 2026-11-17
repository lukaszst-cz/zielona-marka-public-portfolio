# Zielona Marka: publiczne portfolio i archiwum demonstracji

To **publiczny zbiór projektów i kopii prezentacyjnych marki Zielona Marka**, a nie pełne zaplecze produkcyjnej strony. Obejmuje strony usługowe, koncepcje modernizacji, interaktywne gazetki, katalogi i demonstracje ścieżek zapytania.

**Aktualna strona i katalog projektów:** [zielona-marka.pl/portfolio](https://zielona-marka.pl/portfolio)  
**Główne repozytorium strony:** [zielona-marka-pl](https://github.com/lukaszst-cz/zielona-marka-pl)

## Co znajduje się w repozytorium

- **Kopia publicznej części strony** z podstronami branżowymi i interfejsami demonstracyjnymi.
- **Archiwa projektów WWW** w katalogach `demos/` i `projekty/`, między innymi MATERIVO, PHU MARECKI, BUDRIVO, NEXIO ELEKTRO, NAVORO HURT, SOLIDOM, SOLIDENT, AUREA SMILE i KORDON BARBER STUDIO.
- **Warianty historyczne**, zapisane osobno w celu zachowania wcześniejszych wersji.
- **Raporty archiwizacji i weryfikacji plików** z 16 listopada 2026.

[Katalog lokalizacji plików i statusów archiwizacji](MAPA_ARCHIWOW_I_PROJEKTOW.md)

## Podglądy wybranych koncepcji

Główny katalog jest na [zielona-marka.pl/portfolio](https://zielona-marka.pl/portfolio). Poniższe adresy prowadzą bezpośrednio do stron demonstracyjnych i nie stanowią potwierdzenia wdrożeń dla klientów.

| Projekt | Podgląd |
| --- | --- |
| PHU MARECKI | [Strona hurtowni](https://phu-marecki.vercel.app) · [Aplikacja PWA](https://phu-marecki.vercel.app/app.html) |
| BUDRIVO | [Katalog i kalkulator materiałów](https://budrivo.vercel.app) |
| MATERIVO | [Wariant premium](https://materivo-pro.vercel.app) · [Wariant ekonomiczny](https://materivo-eko.vercel.app) |
| NAVORO HURT | [Katalog i gazetka](https://navoro-hurt-koncepcja.vercel.app) |
| NEXIO ELEKTRO | [Strona](https://nexio-elektro.vercel.app) · [Gazetka](https://nexio-elektro.vercel.app/gazetka.html) |
| SOLIDOM | [Koncepcja strony usług budowlanych](https://solidom.vercel.app) |
| AUREA SMILE | [Koncepcja strony stomatologicznej](https://aurea-smile.vercel.app) |
| SOLIDENT | [Koncepcja gabinetu stomatologicznego](https://solident-mu.vercel.app) |
| BLACK HARBOR | [Koncepcja studia detailingu](https://blackharbor.vercel.app) |
| BEATA Beauty Atelier | [Koncepcja atelier beauty](https://beata-beauty-atelier.vercel.app/) |
| KORDON Barber Studio | [Koncepcja salonu barberskiego](https://kordon-barber-studio-zielona-marka.vercel.app/) |
| Centrum Budowlane PWA | [Interaktywna demonstracja systemu](https://centrum-budowlane-pwa.vercel.app/app/) |


## Status projektów

Wskazane strony i nazwy projektów są **koncepcjami, demonstracjami lub archiwalnymi kopiami projektowymi**. Nie należy ich traktować jako wykazu opublikowanych witryn klientów marki Zielona Marka. Akceptacja wariantu przez autora projektu ani poprawny status wdrożenia na Vercel nie potwierdzają akceptacji przez klienta.

Nie każda kopia zawiera działający backend. Formularz, rezerwacja, filtrowanie, koszyk zapytań lub moduł PWA mogą mieć zakres demonstracyjny. Zakres sprawdzaj w README konkretnego projektu i na aktualnej stronie.

## Struktura i przydatne pliki

| Ścieżka | Zawartość |
| --- | --- |
| `app/` | Publiczne strony i komponenty wersji portfolio |
| `demos/` | Kopie demonstracji oraz ich lokalne zasoby |
| `projekty/` | Projekty stron, warianty i odrębne pakiety archiwalne |
| `MAPA_ARCHIWOW_I_PROJEKTOW.md` | Rejestr lokalizacji, statusów i ograniczeń archiwizacji |
| `tools/portfolio-source-verification-2026-11-16.json` | Wyniki kontroli kompletności wybranych kopii |

## Uruchomienie kopii strony

Wymagany jest Node.js 22.13 lub nowszy:

```bash
npm install
npm run dev
```

Kontrola:

```bash
npm run build
npm test
```

Poszczególne strony statyczne można oglądać według instrukcji w ich podkatalogach. Obecność plików nie dowodzi działania wszystkich formularzy i integracji po odtworzeniu archiwum.

## Prywatność i prawa do materiałów

Repozytorium nie jest miejscem na umowy, dane klientów, hasła, klucze API ani konfigurację produkcyjną. Kod jest publicznie dostępny do zapoznania się z portfolio. Wykorzystanie nazw, materiałów graficznych, tekstów i rozwiązań projektowych wymaga uwzględnienia obowiązujących praw i licencji.
