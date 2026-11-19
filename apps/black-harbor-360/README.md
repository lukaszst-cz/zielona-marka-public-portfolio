# BLACK HARBOR 360 | CRM i program lojalnościowy, wersja 0.3

Oddzielny, testowy moduł koncepcji BLACK HARBOR, przygotowany w ramach Zielonej Marki. Nie jest to produkt zaakceptowany przez rzeczywiste studio ani działający system firmy. Publiczna strona BLACK HARBOR v7 pozostaje nienaruszona.

## Działające funkcje w przeglądarce

- Pulpit CRM, źródła i statusy zapytań, przypomnienia o kontakcie, historia działań.
- Klienci, pojazdy, konwersja zapytania w klienta, sprawdzanie podobnych kontaktów.
- BLACK HARBOR CLUB: ręczne rejestrowanie opłaconych usług, punkty, historia wizyt, saldo, poziomy członkostwa, rejestrowanie wykorzystanego rabatu z kontrolą dostępności punktów.
- Daty pielęgnacji po wizycie, przegląd powrotów i szacowana rezerwa na rabaty.
- Mapa wszystkich siedmiu etapów obsługi z oznaczeniem etapów działających i zaplanowanych.
- Interaktywna macierz docelowych ról. Nie jest to uwierzytelnianie ani autoryzacja.
- Eksport CSV zapytań, eksport i import kopii JSON wraz z punktami i historią klubu; migracja kopii wersji 1 do wersji 2.
- Przykładowe, jawnie fikcyjne dane testowe i responsywny interfejs.

## Zasady BLACK HARBOR CLUB, wariant testowy

1 punkt za każde pełne 20 zł netto opłaconej usługi. Za 100 punktów można zarejestrować ręcznie zastosowany rabat 40 zł netto. Poziomy wynikają z punktów zdobytych w całej historii: CLUB 0-99, SELECT 100-299, SIGNATURE co najmniej 300. Rezerwa szacunkowa to saldo punktów pomnożone przez 0,40 zł netto. Przy dokładnym naliczaniu bez dodatkowych akcji promocyjnych nominalny koszt punktów to maksymalnie około 2% przychodu netto kwalifikowanego do programu. Przed wdrożeniem trzeba zatwierdzić regulamin, limity, księgowanie rabatów i wpływ na marżę.

## Role i bezpieczeństwo

Przygotowany, **niewdrożony** schemat PostgreSQL zawiera cztery role `owner`, `manager`, `operator`, `read_only`, tabelę członkostwa i wstępne polityki RLS dla podstawowego CRM. Interfejs umożliwia jedynie podgląd planu dostępu. W prawdziwym systemie należy uruchomić uwierzytelnianie, rozbudować polityki po stronie serwera i rozdzielić rolę operatora na recepcję, detailera oraz księgowość.

**Wszystkie dane aplikacji są zapisywane wyłącznie w `localStorage` bieżącej przeglądarki.** Nie ma kont użytkowników, współdzielonej bazy ani synchronizacji. Nie należy wprowadzać rzeczywistych danych osobowych, pojazdów ani transakcji. Płatności, rabaty i wizyty są rejestrowane wyłącznie ręcznie. Nie ma automatycznej faktury, płatności, rezerwacji stanowisk, magazynu ani wysyłania wiadomości. `database/schema.sql` jest niewdrożonym szkicem podstawowego CRM i nie obejmuje jeszcze tabel programu lojalnościowego.

## Uruchomienie i kontrola

```bash
python3 -m http.server 8080
# http://localhost:8080
npm test
npm run check
```

Frontend nie wymaga zewnętrznych bibliotek. Przeglądarka musi obsługiwać moduły JavaScript.