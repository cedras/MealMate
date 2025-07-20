# 🍽️ MealMate

MealMate to aplikacja webowa pozwalająca użytkownikowi na szybkie znalezienie przepisów kulinarnych na podstawie dostępnego składnika. Użytkownik niezalogowany może wyszukiwać przepisy, a po zalogowaniu dodatkowo zapisywać swoje ulubione dania i mieć dostęp do własnego dashboardu.

---

##  Cel projektu

- Stworzyć pełną aplikację SPA (Single Page Application) w React z podziałem na widoki publiczne i prywatne.
- Połączyć frontend z Firebase (uwierzytelnianie + Firestore).
- Skorzystać z darmowego API TheMealDB, aby umożliwić wyszukiwanie przepisów.
- Zapewnić pełną responsywność aplikacji (mobile-first).
- Stosować nowoczesne podejście do stylowania z `styled-components` oraz zarządzania stanem z `Redux Toolkit`.

---

##  Technologie

- **React** (komponenty, routing, hooki)
- **React Router DOM** – routing aplikacji
- **styled-components** – stylowanie komponentów (CSS-in-JS + theming)
- **Axios** – do komunikacji z zewnętrznymi API
- **Redux Toolkit** – do zarządzania stanem globalnym
- **Firebase** – uwierzytelnianie + baza danych (Firestore)
- **TheMealDB API** – zewnętrzne API do przepisów (darmowe, ale ograniczone do 1 składnika)

---

##  Responsywność

- Interfejs aplikacji będzie dostosowany do ekranów mobilnych (mobile-first).
- W przypadku maksymalnego zmniejszenia okna przeglądarki — nawigacja zmienia się w ikonę menu (hamburger), a widoki układają się pionowo.

---

##  Klasy danych (Model)

### `User`
- `id`
- `email`
- `password`
- `favourites: Recipe[]`

### `Recipe`
- `id`
- `name`
- `image`
- `category`
- `instructions`
- `ingredients[]`

### `Search`
- `ingredient: string`
- `results: Recipe[]`

---

## MoSCoW (wymagania projektu)

### ✅ Must Have
- Możliwość wyszukania przepisów po **jednym składniku** (ograniczenie API)
- Prezentacja wyników (nazwa, kategoria, obrazek, przycisk „zobacz przepis”)
- Rejestracja i logowanie użytkownika (Firebase Auth)
- Zapisywanie ulubionych przepisów (Firestore)
- Nawigacja dynamicznie dostosowująca się do zalogowanego/niezalogowanego użytkownika
- Widok `Dashboard` z zapisanymi przepisami użytkownika
- Routing między stronami
- Komponent Loader (spinner podczas pobierania danych)

### ✅ Should Have
- Obsługa błędów (np. brak wyników)
- Notyfikacje np. po zapisaniu/usunięciu przepisu
- Tłumaczenie składników z innego języka
- Rozdzielenie komponentów na logiczne sekcje

### ✅ Could Have
- Możliwość dodania notatek do przepisu przez użytkownika
- Zapamiętywanie ostatniego wyszukiwanego składnika
- Proponowanie podobnych przepisów z tej samej kategorii

### ❌ Won't Have
- Wyszukiwanie po wielu składnikach (limit API)
- System komentarzy / ocen
- Możliwość dodawania własnych przepisów

---

##  API: TheMealDB

- Darmowe API do pobierania przepisów
- Można wyszukiwać tylko po **jednym składniku**
- Link do dokumentacji: [https://www.themealdb.com/api.php](https://www.themealdb.com/api.php)

---



