import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import SearchResults from "../components/searchResults";
import api from "../services/api";
import styled from "styled-components";

const Container = styled.div`
  padding: 2rem;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    padding: 1rem;
  }
`;

const Title = styled.h2`
  font-size: ${({ theme }) => theme.fontSizes.heading};

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    font-size: ${({ theme }) => theme.fontSizes.small};
  }
`;

function Search() {
  const location = useLocation();
  const query = new URLSearchParams(location.search).get("q") || "";
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!query) return;

    const fetchRecipes = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await api.get(`filter.php?i=${query}`);
        const meals = response.data.meals || [];

        const formatted = meals.map((meal) => ({
          id: meal.idMeal,
          name: meal.strMeal,
          image: meal.strMealThumb,
        }));

        setResults(formatted);
      } catch (err) {
        console.error("❌ API error:", err);
        setError("Coś poszło nie tak przy pobieraniu danych.");
      } finally {
        setLoading(false);
      }
    };

    fetchRecipes();
  }, [query]);

  if (loading) return <p>Loading recipes...</p>;
  if (error) return <p>{error}</p>;
  if (!results.length) return <p>No results found for "{query}"</p>;

  console.log("Query:", query);
  console.log("Results:", results);
  console.log("API full URL:", `filter.php?i=${query}`);

  return <SearchResults results={results} />;
}

export default Search;
