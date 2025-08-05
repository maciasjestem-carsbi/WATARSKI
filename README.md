# Volkswagen Wątarski Włocławek - Strona Internetowa

Nowoczesna aplikacja Next.js dla autoryzowanego salonu Volkswagen Wątarski Włocławek z panelem administracyjnym dla pracowników do zarządzania stanem magazynowym.

## Funkcje

### Funkcje dla klientów
- **Strona główna**: Nowoczesna strona startowa prezentująca samochody osobowe i dostawcze
- **Przeglądarka samochodów**: Wyszukiwanie i filtrowanie samochodów według marki, ceny, rodzaju paliwa, skrzyni biegów i innych parametrów
- **Responsywny design**: Przyjazny dla urządzeń mobilnych interfejs z Tailwind CSS
- **Szczegóły samochodów**: Kompleksowe informacje o samochodach wraz ze specyfikacją i cenami

### Funkcje administracyjne (Panel Admin)
- **Zarządzanie samochodami**: Dodawanie, edycja i usuwanie samochodów ze stanu magazynowego
- **Śledzenie statusu**: Oznaczanie samochodów jako dostępne, sprzedane lub zarezerwowane
- **Dashboard**: Przegląd statystyk stanu magazynowego
- **Walidacja formularzy**: Kompleksowy formularz do dodawania szczegółów samochodów
- **Upload zdjęć**: Dodawanie zdjęć samochodów bezpośrednio z panelu administracyjnego

## Stack technologiczny

- **Frontend**: Next.js 14 z TypeScript
- **Styling**: Tailwind CSS z komponentami shadcn/ui
- **Ikony**: Lucide React
- **Zarządzanie stanem**: React hooks (useState)
- **Routing**: Next.js App Router

## Rozpoczęcie pracy

### Wymagania wstępne

Upewnij się, że masz zainstalowany Node.js na swoim systemie. Możesz go pobrać ze strony [nodejs.org](https://nodejs.org/).

### Instalacja

1. **Zainstaluj zależności**
   ```bash
   npm install
   ```

2. **Uruchom serwer deweloperski**
   ```bash
   npm run dev
   ```

3. **Otwórz aplikację**
   Przejdź do [http://localhost:3000](http://localhost:3000) w przeglądarce.

## Struktura projektu

```
src/
├── app/
│   ├── admin/          # Panel administracyjny dla pracowników
│   ├── inventory/      # Przeglądanie samochodów przez klientów
│   ├── globals.css     # Style globalne
│   ├── layout.tsx      # Główny layout
│   └── page.tsx        # Strona główna
├── components/
│   └── ui/             # Komponenty shadcn/ui
└── lib/
    ├── utils.ts        # Funkcje pomocnicze
    └── car-brands.ts   # Baza marek samochodów
```

## Strony

### Strona główna (`/`)
- Sekcja hero z wezwaniem do działania
- Prezentacja usług (samochody osobowe, dostawcze, serwis)
- Informacje kontaktowe i godziny otwarcia
- Dane kontaktowe zespołu

### Stan magazynowy (`/inventory`)
- Funkcjonalność wyszukiwania
- Zaawansowane opcje filtrowania
- Siatka samochodów ze szczegółowymi kartami
- Wyświetlanie cen i specyfikacji

### Panel Admin (`/admin`)
- **Dostęp tylko dla pracowników**
- Dodawanie nowych samochodów do stanu magazynowego
- Edycja szczegółów istniejących samochodów
- Usuwanie samochodów
- Przegląd statystyk stanu magazynowego
- Zarządzanie statusem (dostępne/sprzedane/zarezerwowane)

## Dostęp do panelu administracyjnego

Panel administracyjny jest dostępny pod adresem `/admin` i zapewnia pracownikom:

- **Formularz dodawania samochodów**: Kompletny formularz do dodawania nowych pojazdów
- **Funkcjonalność edycji**: Modyfikowanie szczegółów istniejących samochodów
- **Opcja usuwania**: Usuwanie samochodów ze stanu magazynowego
- **Zarządzanie statusem**: Śledzenie dostępności samochodów
- **Dashboard statystyk**: Przegląd metryk stanu magazynowego
- **Upload zdjęć**: Dodawanie zdjęć samochodów bezpośrednio z panelu administracyjnego
- **Wybór nowe vs używane**: Wybór między nowymi samochodami (tylko Volkswagen) a używanymi (wszystkie marki)

## Dostosowywanie

### Dodawanie nowych marek samochodów
Aplikacja zawiera kompleksową listę marek samochodów w `src/lib/car-brands.ts`. Aby dodać nowe marki:

1. Dodaj markę do tablicy `carBrands` w `src/lib/car-brands.ts`
2. Panel administracyjny automatycznie uwzględni ją w rozwijanej liście
3. Samochody używane mogą mieć dowolną markę, podczas gdy nowe są ograniczone do Volkswagena

### Obsługa zdjęć
Aplikacja obsługuje upload zdjęć do listowania samochodów:

1. **Panel Admin**: Użyj komponentu upload zdjęć, aby dodać zdjęcia samochodów
2. **Lokalne przechowywanie**: Zdjęcia są przechowywane jako base64 data URLs (do celów demo)
3. **Produkcja**: Dla produkcji zintegruj z chmurą (AWS S3, Cloudinary, itp.)
4. **Formaty**: Obsługuje formaty JPG, PNG i WebP
5. **Limit rozmiaru**: Maksymalnie 5MB na zdjęcie

### Styling
Aplikacja używa Tailwind CSS z niestandardowym schematem kolorów. Aby zmodyfikować:

1. Edytuj `tailwind.config.js` dla zmian motywu
2. Zaktualizuj `src/app/globals.css` dla niestandardowych zmiennych CSS
3. Zmodyfikuj klasy komponentów dla zmian układu

## Wdrażanie

### Vercel (Zalecane)
1. Wypchnij kod do GitHub
2. Połącz repozytorium z Vercel
3. Automatyczne wdrażanie przy push

### Inne platformy
Aplikacja może być wdrażana na dowolnej platformie obsługującej Next.js:
- Netlify
- Railway
- DigitalOcean App Platform
- AWS Amplify

## Zmienne środowiskowe

Utwórz plik `.env.local` dla konfiguracji specyficznych dla środowiska:

```env
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

## Współtworzenie

1. Sforkuj repozytorium
2. Utwórz branch funkcji
3. Wprowadź zmiany
4. Prześlij pull request

## Licencja

Ten projekt jest licencjonowany na licencji MIT.

## Wsparcie

W przypadku pytań lub wsparcia, skontaktuj się z zespołem deweloperskim.

## Dane kontaktowe

**Volkswagen Wątarski Włocławek**
- Adres: ul. Toruńska 169, 87-800 Włocławek
- Telefon: 54 230 60 60
- E-mail: salon@watarski.pl
- Godziny otwarcia: Pon-Pt 08:00-17:00, Sob 09:00-13:00 