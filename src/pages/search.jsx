import { useLocation } from "react-router-dom";
import { useEffect, useState } from 'react';
import SearchResults from "../components/SearchResults";
import api from "../services/api";
import styled from "styled-components";

const Container = styled.div`
padding: 2rem;
`;

const Title = styled.h2`
font-size: ${({ theme }) => theme.fontSizes.heading};
`;


function Search() {
    const location = useLocation();
    const query = new URLSearchParams(location.search).get("q") || "";
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState([false]);
    const [error, setError] = useState([null]);
   

   useEffect(() => {
    if (!query) return;

    const fetchRecipes = async () => {
        setLoading(true);
        setError(null);

        try {
            const response = await api.get(`search.php?s=${query}`);
            const meals = response.data.meals || [];
            const formatted = meals.map((meal) => ({
                    id: meal.idMeal,
                    title: meal.strMeal,
                    image: meal.strMealThumb,
            }));
            setResults(formatted);
        } catch (err) {
            setError("There has been an error with downloading data");
            setResults([]);
        } finally {
            setLoading(false);
        }
    };

    fetchRecipes();
   }, [query]);

   if (loading) return <p>Loading recipes...</p>;
   if (error) return <p>{error}</p>;
   if (!results.length) return <p>No results found for "{query}"</p>;

   return <SearchResults results={results} />;

    
}

export default Search;