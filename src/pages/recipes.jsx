import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../services/api";
import styled from "styled-components";
import { useUser } from "../hooks/useUser";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { db } from "../services/firebase";

const Container = styled.div`
  padding: 2rem;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    padding: 1rem;
  }
`;

const Title = styled.h1`
  font-size: ${({ theme }) => theme.fontSizes.heading};
  margin-bottom: 1.5rem;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    font-size: ${({ theme }) => theme.fontSizes.small};
  }
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

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    max-width: 100%;
  }
`;

const Ingredients = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 1rem;
  flex: 1;
`;

const InstructionHeading = styled.h2`
  font-size: 1.5rem;
  margin: 0 0 1rem;
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

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    font-size: ${({ theme }) => theme.fontSizes.small};
    padding: 0.75rem;
  }
`;

const FavouriteButton = styled.button`
  margin: 1.5rem 0;
  padding: 0.75rem 1.5rem;
  background-color: ${({ theme }) => theme.colors.primary};
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  transition: background 0.3s;

  &:hover {
    background-color: ${({ theme }) => theme.colors.secondary};
  }
`;

function Recipe() {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const { user } = useUser();

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const res = await api.get(`lookup.php?i=${id}`);
        const meal = res.data.meals?.[0];
        if (!meal) throw new Error("Recipe not found");
        setRecipe(meal);
      } catch (error) {
        console.error("❌ API error:", error);
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

  const handleSaveToFavourites = async () => {
    if (!user) return;

    const recipeRef = doc(db, "favourites", user.uid, "meals", recipe.idMeal);

    try {
      const existing = await getDoc(recipeRef);

      if (existing.exists()) {
        alert("This recipe is already in your favourites!");
        return;
      }

      await setDoc(recipeRef, {
        id: recipe.idMeal,
        name: recipe.strMeal,
        image: recipe.strMealThumb,
      });

      alert("Recipe saved to your favourites!");
    } catch (error) {
      console.error("❌ Error saving recipe:", error);
      alert("Failed to save recipe.");
    }
  };

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
              <IngredientText>
                {ing.measure} {ing.name}
              </IngredientText>
            </IngredientItem>
          ))}
        </Ingredients>
      </ContentWrapper>
      {user && (
        <FavouriteButton onClick={handleSaveToFavourites}>
          ❤️ Save to favourites
        </FavouriteButton>
      )}
      <InstructionHeading>
        How to make this delicious recipe:
      </InstructionHeading>
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
