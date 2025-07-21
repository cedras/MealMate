import styled from 'styled-components';

const ResultsContainer = styled.div`
display: grid;
grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
gap: 1.5rem;
margin-top:2rem;
`;

const RecipeCard = styled.div`
background-color: white; 
border: 1px solid black;
border-radius: 8px;
box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
transition: transform 0.2 ease;

&:hover {
    transform: translateY(-5px);
}

`;

const Title = styled.h3`
margin-bottom: 0.5rem;
font-size: ${({ theme }) => theme.fontSizes.heading};
`;

const Description = styled.p`
color: #555;
`;

function SearchResults({ results }) {
    return (
        <ResultsContainer>
            {results.map((recipe) => (
                <RecipeCard key={recipe.id}>
                    <Title>{recipe.title}</Title>
                    <Description>{recipe.desscription}</Description>
                </RecipeCard>
            ))}
        </ResultsContainer>
    );
}

export default SearchResults;