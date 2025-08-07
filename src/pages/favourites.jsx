import { useEffect, useState } from "react";
import styled from "styled-components";
import { db } from "../services/firebase";
import { collection, getDocs } from "firebase/firestore";
import { useUser } from "../components/usercontext";
import { Link } from "react-router-dom";

const Container = styled.div`
  padding: 2rem;
`;

const Title = styled.h1`
  font-size: ${({ theme }) => theme.fontSizes.heading};
  margin-bottom: 2rem;
`;

const FavList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const FavItem = styled.li`
  margin-bottom: 1rem;
`;

const FavLink = styled(Link)`
  display: flex;
  align-items: center;
  padding: 0.75rem 1rem;
  background-color: #fafafa;
  border-radius: 8px;
  text-decoration: none;
  color: inherit;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.05);
  transition: background 0.2s;

  &:hover {
    background-color: #f0f0f0;
  }
`;

const FavThumbnail = styled.img`
  width: 60px;
  height: 60px;
  border-radius: 6px;
  margin-right: 1rem;
  object-fit: cover;
`;

const FavName = styled.span`
  font-size: 1.1rem;
  font-weight: 500;
`;

function Favourites() {
  const { user } = useUser();
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFavourites = async () => {
      try {
        const mealsSnapshot = await getDocs(collection(db, "favourites", user.uid, "meals"));
        const mealsData = mealsSnapshot.docs.map(doc => doc.data());
        setRecipes(mealsData);
      } catch (error) {
        console.error("❌ Failed to fetch favourites:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFavourites();
  }, [user]);

  if (loading) return <Container>Loading your favourite recipes...</Container>;
  if (recipes.length === 0) return <Container>You have no favourite recipes yet.</Container>;

  return (
    <Container>
      <Title>Your Favourite Recipes</Title>
      <FavList>
        {recipes.map(recipe => (
          <FavItem key={recipe.id}>
            <FavLink to={`/recipes/${recipe.id}`}>
              <FavThumbnail src={recipe.image} alt={recipe.name} />
              <FavName>{recipe.name}</FavName>
            </FavLink>
          </FavItem>
        ))}
      </FavList>
    </Container>
  );
}

export default Favourites;