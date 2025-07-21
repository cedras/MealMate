import { useLocation } from "react-router-dom";
import { useEffect, useState } from 'react';
import SearchResults from "../components/SearchResults";
import styled from "styled-components";

const Container = styled.div`
padding: 2rem;
`;

const Title = styled.h2`
font-size: ${({ theme }) => theme.fontSizes.heading};
`;


function Search() {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const searchTerm = searchParams.get('q') || '';

    const allMockRecipes = [
        { id: 1, title: 'Chicken Alfredo'},
        { id: 2, title: 'Spicy Chicken Wings'},
        { id: 3, title: 'Vegan Salad'},
    ];

    const [filteredRecipes, setFilteredRecipes] = useState([]);

    useEffect(() => {
        const results = allMockRecipes.filter((recipe) => 
        recipe.title.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredRecipes(results);
    }, [searchTerm]);

    return (
        <Container>
            <Title>Wyniki wyszukiwania dla: "{query}"</Title>
            <SearchResults results={filteredRecipes} />
        </Container>
    );
}

export default Search;