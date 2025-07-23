import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../services/api";
import styled from "styled-components";

const Container = styled.div`
padding: 2rem;
`;

const Title = styled.h1`
font-size: ${({ theme }) => theme.fontSizes.heading};
`;

const Image = styled.img`
width: 100%;
max-width: 500px;
border-radius 8px;
margin-bottom: 1rem;
`;

const Instructions = styled.p`
white-space: pre-line;
`;

function Recipe() {
    const { id } = useParams();
    const [recipe, setRecipe] = useState(null);
    const [loading, setLoading] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
    const fetchRecipe = async () => {
        try {
            const res = await api.get(`lookup.php?i=${id}`);
            const meal = res.data.meals?.[0];
            if(!meal) throw new Error("Recipe not found");
            setRecipe(meal);
        } catch (err) {
            setError("Recipe download has failed");
        } finally {
            setLoading(false);
        }
    };
    fetchRecipe();
}, [id]);

if (loading) return <Container>Loading recipe...</Container>;
if (error) return <Container>{error}</Container>;

return (
    <Container>
        <Title>{recipe.strMeal}</Title>
        <Image src={recipe.strMealThumb} alt={recipe.strMeal}/>
        <Instructions>{recipe.strInstructions}</Instructions>
    </Container>
);
}

export default Recipe;