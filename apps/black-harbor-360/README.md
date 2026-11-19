# BLACK HARBOR 360 | CRM, wersja 0.1

Osobna aplikacja demonstracyjna Zielonej Marki. Nie jest związana z realną firmą ani wdrożeniem produkcyjnym. Publiczna koncepcja BLACK HARBOR v7 w folderze `projekty/black-harbor` pozostaje nienaruszona.

## Co działa

- CRM z nowymi zapytaniami, statusami, osobą do kontaktu i notatkami.
- Wyszukiwanie, filtrowanie, karty kontaktów, historia zmian.
- Konwersja leada na klienta z kontrolą duplikatów.
- Kartoteka klientów i przypisane pojazdy.
- Terminy follow-up i pulpit z licznikami.
- Eksport CSV zapytań, eksport i import kopii JSON z walidacją.
- Opcjonalny zestaw jawnie fikcyjnych danych testowych.
- Responsywny panel desktop/mobile, testy logiki.

## Ograniczenia i bezpieczeństwo

- **Dane zapisują się tylko w `localStorage` w tej przeglądarce. Nie ma synchronizacji między urządzeniami ani kont użytkowników.**
- **Nie wprowadzać rzeczywistych danych osobowych ani firmowych.** W tej fazie to demonstracja interakcji.
- Brak wysyłki e-mail/SMS, backendu, bazy, rezerwacji zasobów, magazynu i wystawiania faktur.
- Projekt jest domyślnie `noindex`, bez żadnych sekretów. Publiczny URL nadal może być otwarty przez osoby posiadające link.

## Uruchomienie

```bash
python3 -m http.server 8080
# http://localhost:8080
node --test tests/*.test.mjs
node --check app.js
```

## Następny etap: zabezpieczona baza

Utworzyć osobny projekt Supabase po potwierdzeniu właściwej organizacji i ewentualnych kosztów, a następnie zaimplementować logowanie, tenant, RLS, API, audyt zdarzeń i politykę retencji. Nie wykorzystywać produkcyjnej bazy aplikacji Aktywnik Plus. Dopiero wtedy dopuszczać rzeczywiste dane klientów.

## Konwencje

Kod bez niepotrzebnych danych osobowych, prezentacyjnych firm i sygnatur asystenta. Wszystkie formularze walidowane w kliencie. W przyszłej wersji konieczna także walidacja serwerowa.