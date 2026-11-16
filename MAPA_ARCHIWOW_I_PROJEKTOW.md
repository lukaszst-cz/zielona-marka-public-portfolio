# Zielona Marka | mapa plików i status archiwizacji

Stan kontrolny: 16 listopada 2026. Katalog przedstawia **realizacje demonstracyjne**, nie ukończone witryny klientów. Materiały marketingowe, ceny i rezerwacje mogą być przykładowe.

## Zasada archiwizacji

- **Główna kopia projektu** musi zawierać pliki strony w normalnym katalogu, bez obowiązku rozpakowywania ZIP.
- Starsze ZIP-y i katalogi historyczne pozostają do odtworzenia wcześniejszych wersji, nie są bieżącym punktem startowym.
- Osobne warianty jednego projektu, np. MATERIVO Eko/Pro i NEXIO, liczymy jako **jedną realizację**.
- Weryfikacja sum plików względem Vercel potwierdza wierny zapis statycznych materiałów. Nie zastępuje testów wszystkich interakcji ani nie tworzy backendu.

## Strony i lokalizacja plików

| Projekt | Bieżąca kopia plików | Stan |
| --- | --- | --- |
| MATERIVO, Eko + Pro | [demos/materivo](demos/materivo) | Jeden projekt z przełącznikiem, skopiowane wszystkie pliki z dwóch wdrożeń |
| BEATA BEAUTY ATELIER | [projekty/beata-beauty-atelier/site/dist](projekty/beata-beauty-atelier/site/dist) | Pełny pakiet publikacyjny z obrazami i filmami |
| SOLIDOM | [projekty/solidom/site](projekty/solidom/site) | Komplet plików statycznych |
| NAVORO HURT | [projekty/navoro-hurt](projekty/navoro-hurt) | HTML, assets, PDF i konfiguracja |
| BUDRIVO | [projekty/budrivo/site](projekty/budrivo/site) | Zweryfikowane 31 z 31 plików Vercel |
| PHU MARECKI | [projekty/phu-marecki/site](projekty/phu-marecki/site) | Zweryfikowane 63 z 63 plików; historyczne podglądy obok |
| NEXIO ELEKTRO | [demos/nexio-elektro/site](demos/nexio-elektro/site) | Zweryfikowane 57 z 57 plików; starsze wersje w variants/ |
| AUREA SMILE | [demos/aurea-smile/site](demos/aurea-smile/site) | Zweryfikowany HTML z Vercel |
| KORDON BARBER STUDIO | [demos/kordon-barber-studio/site](demos/kordon-barber-studio/site) | Zweryfikowany HTML; oryginalny katalog assets/ w katalogu demos/kordon-barber-studio |
| KORVIO ELEKTRO | [demos/korvio-elektro](demos/korvio-elektro) | Wcześniej zarchiwizowana pełna struktura |
| ELTRAVIA PRO | [demos/eltravia-pro](demos/eltravia-pro) | Wcześniej zarchiwizowana pełna struktura |
| BLACK HARBOR | [projekty/black-harbor](projekty/black-harbor) | Samodzielny HTML v7, zdjęcia osadzone wewnątrz pliku |
| SOLIDENT | [projekty/solident/zaakceptowana-2026-11-13/site](projekty/solident/zaakceptowana-2026-11-13/site) | Źródło HTML/robots Vercel; część fotografii ładowana z obcych serwerów |
| Portfolio v9.1 | [projekty/portfolio-v9-1](projekty/portfolio-v9-1) | Samodzielny HTML v9.1, odrębna wersja podglądowa Vercel zachowana w variants/ |

## Warianty NEXIO

W [demos/nexio-elektro/variants](demos/nexio-elektro/variants) są trzy odmienne historyczne wdrożenia:
- archiwum (21 plików technicznych, **oryginalny README niedostępny przez publiczne URL**; zapisano własny opis),
- nexio2 (2 pliki źródłowe, w tym testowy HTML, nie samodzielny pełny katalog),
- koncepcja (3 pliki, w tym konfiguracja).

Nie mylić ich z głównym, aktualnym NEXIO ELEKTRO.

## Co nadal trzeba sprawdzić

1. Lokalną dostępność zewnętrznych fotografii, szczególnie w SOLIDENT; plik HTML może działać, ale niektóre obrazy wymagają internetu.
2. Zachowanie formularzy, wyszukiwarki, filtrowania, katalogów i PWA w odtworzonych kopiach na telefonie i komputerze. Status READY z Vercel nie zastępuje takiego testu.
3. Niezależne repozytoria aplikacji AKTYWNIK PLUS, AKTYWNIK PLUS PLUS oraz COTERAZ, aby porównać ich najnowsze źródła z Vercel.
4. Trzy pozostałe projekty techniczne tymczasowe na Vercel (temporary-*), przed ich ewentualnym usunięciem.
5. Odrębne, wykluczone przez właściciela demonstracje nie są przedmiotem tej archiwizacji i nie powinny być dodawane do portfolio.

## Dowody

- [Rejestr 11 dodatkowych wdrożeń, suma kontrolna źródeł](tools/portfolio-source-manifest-2026-11-16.json)
- [Raport weryfikacji zapisów](tools/portfolio-source-verification-2026-11-16.json)
- [Historia zmian GitHub](https://github.com/lukaszst-cz/zielona-marka-public-portfolio/commits/main)

**Uwaga:** projektami WWW w portfolio Zielonej Marki są też demka osadzone bezpośrednio w głównej witrynie (np. Natura Studio, Bistro Forma, Dom Dobry) oraz makiety STYK, GLINA, TROP. Nie wszystkie są osobnymi wdrożeniami Vercel. W Notion oprócz stron są również projekty graficzne, katalogi, aplikacje i arkusze.
