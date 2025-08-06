
# 🍽️ MealMate

MealMate to aplikacja webowa umożliwiająca szybkie wyszukiwanie przepisów kulinarnych na podstawie dostępnego składnika. Użytkownik niezalogowany może przeglądać przepisy, a po zalogowaniu uzyskuje dostęp do dodatkowych funkcji, takich jak zapisywanie ulubionych dań.

---

## 🎯 Cel projektu

- Zbudowanie aplikacji SPA (Single Page Application) w React.
- Połączenie z zewnętrznym API do pobierania przepisów kulinarnych.
- Umożliwienie rejestracji i logowania użytkowników (Firebase).
- Przechowywanie stanu zalogowania w React Context.
- Dynamiczne renderowanie interfejsu w zależności od stanu użytkownika.
- Podstawowa responsywność aplikacji.

---

## 🛠️ Technologie

- **React** (komponenty funkcyjne, hooki)
- **React Router DOM** – routing SPA
- **styled-components** – stylowanie komponentów i motyw
- **Axios** – komunikacja z API
- **Firebase** – logowanie i rejestracja użytkownika
- **React Context** – zarządzanie stanem zalogowanego użytkownika

---

## 📱 Responsywność

- Aplikacja działa poprawnie na urządzeniach mobilnych dzięki elastycznym układom `flex` i `grid`.
- Stylowanie komponentów jest skalowalne i responsywne.

---

## 📄 Modele danych

Poniżej opis danych, z jakimi pracuje aplikacja jako struktury obiektów w pamięci i w API.

### `User`

Reprezentuje zalogowanego użytkownika:

```js
{
  id: "firebase-uid",
  email: "example@mail.com"
}
```

### `Recipe`

Reprezentuje przepis kulinarny:

```js
{
  id: "52977",
  name: "Chicken Alfredo",
  image: "https://www.themealdb.com/images/media/meals/...",
  instructions: "Step-by-step description...",
  ingredients: [
    { name: "Chicken", measure: "200g" },
    { name: "Cream", measure: "100ml" },
    // ...
  ]
}
```

### `Search`

Reprezentuje zapytanie użytkownika:

```js
{
  ingredient: "chicken",
  results: [Recipe, Recipe, Recipe] // lista przepisów z API
}
```

---

## ✅ Funkcjonalności

- Wyszukiwanie przepisów po jednym składniku
- Wyświetlanie wyników (obrazek, nazwa przepisu)
- Przejście do szczegółów przepisu (instrukcje, składniki z obrazkami)
- Rejestracja i logowanie użytkownika
- Dynamiczna nawigacja w zależności od zalogowania
- Przechowywanie stanu użytkownika (z Context API)
- Obsługa błędów (brak wyników, błąd API)
- Powiadomienia tekstowe

---

## 🌐 API: TheMealDB

- Darmowe API do przepisów
- Możliwość wyszukiwania po jednym składniku
- Endpointy używane:
  - `filter.php?i=ingredient` – wyszukiwanie po składniku
  - `lookup.php?i=id` – szczegóły dania

Dokumentacja: [https://www.themealdb.com/api.php](https://www.themealdb.com/api.php)
