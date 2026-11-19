# ELTRAVIA 360 PWA

Oddzielna, instalowalna aplikacja demonstracyjna Zielonej Marki. Nie modyfikuje strony ELTRAVIA | Wersja rozbudowana ani projektu PHU Marecki.

## Zakres działający

- CRM: leady, źródła, etapy, follow-upy; kontrahenci B2B i kartoteka.
- Katalog SKU i wyszukiwanie, 6 kategorii, EAN, jednostki metry/sztuki, koszt, cena, stan minimalny.
- Wyceny wielopozycyjne, VAT 23% jako założenie modelu, rabaty, koszt i marża.
- Konwersja oferty na zamówienie, atomowa rezerwacja stanów w lokalnej kopii danych; brak podwójnej rezerwacji.
- Magazyn: PZ, aktualizacja średniego kosztu, częściowe WZ, zwalnianie rezerwacji i brak ujemnych stanów.
- Oznaczenie pełnego zamówienia jako opłacone, jednokrotne naliczanie punktów programu ELTRAVIA Partner, wymiana punktów na voucher demonstracyjny.
- Portal instalatora B2B do budowy list materiałowych i zapisania jej jako zapytania.
- Przełączanie widoku ról, eksport CSV, kopia JSON, import z walidacją, zestaw fikcyjnych danych testowych.
- Manifest PWA, ikony, service worker z cache powłoki aplikacji i działaniem bez internetu po pierwszym otwarciu.
- Katalog skanowany przy pomocy BarcodeDetector, jeśli obsługuje go przeglądarka i użytkownik zezwoli na kamerę.

## Ograniczenia

To wersja działająca **lokalnie w konkretnej przeglądarce**. `localStorage` nie jest bezpiecznym serwerem ani wielostanowiskową bazą danych. Role w nagłówku są **symulacją**, nie uwierzytelnianiem ani kontrolą dostępu. Nie wpisuj danych prawdziwych klientów. Import JSON jest przeznaczony do własnych danych testowych.

Brak integracji KSeF, wystawiania faktur, rzeczywistych płatności, powiadomień, banku, zakupu u dostawcy oraz synchronizacji. Status opłacony ustawia się ręcznie. Program partnerów i ceny są propozycją testową, nie wiążącą ofertą handlową. Samo złożenie listy przez portal nie wysyła wiadomości do firmy.

## Uruchomienie

```bash
python3 -m http.server 8080
# Otwórz http://localhost:8080/
node --test tests/*.test.mjs
```

## Wdrożenie produkcyjne

Wymaga wydzielonej bazy, uwierzytelniania, serwerowych uprawnień, transakcyjnego zarządzania rezerwacjami magazynowymi, audytu, kontroli numeracji dokumentów, zgodności podatkowej i integracji finansowych.
