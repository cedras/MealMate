import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../services/api";
import styled from "styled-components";

const Container = styled.div`
  padding: 2rem;
`;

const Title = styled.h1`
  font-size: ${({ theme }) => theme.fontSizes.heading};
  margin-bottom: 1.5rem;
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
  align-items: flex-start;
`;

const Image = styled.img`
  width: 100%;
  max-width: 500px;
  border-radius: 8px;
  flex: 1;
`;

const Ingredients = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 1rem;
  flex: 1;
`;

const InstructionHeading = styled.h2`
  font-size: 1.5rem;
  margin: 3rem 0 1rem;
  color: ${({ theme }) => theme.colors.secondary};
`;

const IngredientItem = styled.div`
  display: flex;
  align-items: center;
  background-color: #f9f9f9;
  padding: 0.5rem;
  border-radius: 8px;
`;

const IngredientImage = styled.img`
  width: 50px;
  height: 50px;
  margin-right: 1rem;
  border-radius: 8px;
`;

const IngredientText = styled.span`
  font-size: 1rem;
  font-weight: 500;
`;

const Instructions = styled.p`
  margin-top: 1rem;
  white-space: pre-line;
  line-height: 1.5;
  font-size: 1.1rem;
  background-color: #fefefe;
  padding: 1rem;
  border-radius: 8px;
  box-shadow: 0 0 6px rgba(0, 0, 0, 0.15);
`;

function Recipe() {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const res = await api.get(`lookup.php?i=${id}`);
        const meal = res.data.meals?.[0];
        if (!meal) throw new Error("Recipe not found");
        setRecipe(meal);
      } catch (err) {
        console.error("❌ API error:", err);
        setError("Recipe download has failed");
      } finally {
        setLoading(false);
      }
    };
    fetchRecipe();
  }, [id]);

  if (loading) return <Container>Loading recipe...</Container>;
  if (error) return <Container>{error}</Container>;
  if (!recipe) return null;

  const ingredients = getIngredients(recipe);

  return (
    <Container>
      <Title>{recipe.strMeal}</Title>
      <ContentWrapper>
        <Image src={recipe.strMealThumb} alt={recipe.strMeal} />
        <Ingredients>
          {ingredients.map((ing, index) => (
            <IngredientItem key={index}>
              <IngredientImage
                src={`https://www.themealdb.com/images/ingredients/${ing.name}-Small.png`}
                alt={ing.name}
              />
              <IngredientText>{ing.measure} {ing.name}</IngredientText>
            </IngredientItem>
          ))}
        </Ingredients>
      </ContentWrapper>
      <InstructionHeading>How to make this delicious recipe:</InstructionHeading>
      <Instructions>{recipe.strInstructions}</Instructions>
    </Container>
  );
}

const getIngredients = (recipe) => {
  const ingredients = [];
  for (let i = 1; i <= 20; i++) {
    const ingredient = recipe[`strIngredient${i}`];
    const measure = recipe[`strMeasure${i}`];
    if (ingredient && ingredient.trim() !== "") {
      ingredients.push({ name: ingredient, measure });
    }
  }
  return ingredients;
};

export default Recipe;
