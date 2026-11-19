# ELTRAVIA 360 | PWA operacyjne B2B

Autorska, demonstracyjna aplikacja Zielonej Marki dla koncepcji hurtowni elektrotechnicznej ELTRAVIA | Wersja rozbudowana. Bez współpracy lub autoryzacji zewnętrznej firmy, bez rzeczywistego systemu ERP.

## Funkcje działające lokalnie

- Instalowalna PWA z manifestem, ikonami PNG, Service Workerem i fallbackiem offline po pierwszym pobraniu.
- Responsywny interfejs w kolorystyce ELTRAVIA: ciemny granat, błękit techniczny, akcent limonkowy. Mobilny pasek nawigacji, układ bez poziomego przewijania, pola dotykowe.
- Katalog techniczny SKU: sześć kategorii, szybkie wyszukiwanie nazw/SKU/EAN, ceny netto i zapas dostępny po rezerwacjach.
- Wklejanie wielopozycyjnej listy SKU w formacie `SKU;ilość`; opcjonalny skaner kamery korzystający z BarcodeDetector, o ile przeglądarka obsługuje ten interfejs.
- CRM: nowe zapytania, terminy, źródła, statusy, karta kontrahenta, pozyskanie klienta z leada.
- Tworzenie wycen z wersją ceny zakupu i ceny sprzedaży, rabatem i kontrolą minimalnej marży.
- Zamówienia z zaakceptowanej oferty, częściowa rezerwacja zapasu, brakujący asortyment, przyjęcie PZ z uzupełnieniem rezerwacji, wydanie WZ, anulowanie.
- Ręczne testowe oznaczenie wpłaty, automatyczny poziom programu ELTRAVIA PARTNER według opłaconego obrotu z ostatnich 90 dni, zawieszenie korzyści przy zaległościach.
- Podgląd roli i macierz dostępu, KPI i 12-etapowy workflow, eksport CSV/JSON i import kopii JSON.
- Dane przykładowe i testowe, bez nazw prawdziwych klientów ani faktur.

## Ważne ograniczenia

- Brak uwierzytelniania i backendu. Wszystkie rekordy i wybór roli są zapisywane w pamięci `localStorage` danej przeglądarki. Przełącznik roli jest prezentacją uprawnień, nie zabezpieczeniem.
- Brak synchronizacji danych między urządzeniami. Po usunięciu danych przeglądarki rekordy znikną bez wcześniejszego eksportu.
- Bez realnych połączeń z ERP, WMS, bankiem, kurierem, e-mail/SMS, dostawcami, KSeF i systemem księgowym.
- Nie wprowadzać prawdziwych danych osobowych, finansowych ani firmowych. Wszystkie ceny i stany katalogu to liczby demonstracyjne.
- `BarcodeDetector` nie jest dostępny w każdej przeglądarce; zawsze jest wejście ręczne. Uprawnienie aparatu jest wymagane.
- Offline działa po pierwszym pobraniu zasobów aplikacji; zewnętrzny font może użyć lokalnego zamiennika.

## Testowanie

```bash
node --check app.js
node --check core.mjs
node --test tests/*.test.mjs
python3 -m http.server 8080
```

PWA wymaga bezpiecznego kontekstu HTTPS lub localhost dla Service Workera i kamery. Wdrożenie Vercel powinno mieć Root Directory: `apps/eltravia-360-pwa`.

## Docelowy etap produkcyjny

Osobny projekt Supabase PostgreSQL/Auth z RLS i identyfikacją organizacji; kontrola stanów i rezerwacji w transakcjach bazodanowych; audyt zdarzeń i migracje; integracja ERP/WMS i KSeF za serwerem, synchronizacja offline z obsługą konfliktów, uprawnienia nadane po uwierzytelnieniu, logika kredytu kupieckiego, dokumenty PZ/WZ, ceny dostawców, parowanie faktur i przelewów, monitorowanie błędów i backupy serwerowe.

## Źródła wzorców branżowych

- TIM mobile: https://www.tim.pl/aplikacja-mobilna-tim
- Onninen mobile: https://play.google.com/store/apps/details?id=pl.looksoft.onninen
- MDN PWA: https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps/Guides/Making_PWAs_installable
- MDN cache offline: https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps/Guides/Caching

## Powiązanie z PHU Marecki

Przejmuje wzorzec katalogu, ofert, materiałów i zapytań, ale rozbudowuje warstwę B2B z rezerwacjami, magazynem, marżą, zamówieniami i programem partnerskim. PHU Marecki jest demonstracją sklepu/katalogu z możliwością przygotowania zapytania, a nie kompletnym produkcyjnym ERP.