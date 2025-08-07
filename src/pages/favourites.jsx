import { useEffect, useState } from "react";
import styled from "styled-components";
import { db } from "../services/firebase";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
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
  max-width: 600px;
  width: 100%;
`;

const FavItem = styled.li`
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #fafafa;
  padding: 0.75rem 1rem;
  border-radius: 8px;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.05);
`;

const FavLink = styled(Link)`
  display: flex;
  align-items: center;
  text-decoration: none;
  color: inherit;
  flex-grow: 1;

  &:hover {
    text-decoration: underline;
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

const DeleteButton = styled.button`
  margin-left: 1rem;
  padding: 0.5rem 1rem;
  background-color: crimson;
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 0.9rem;
  cursor: pointer;

  &:hover {
    background-color: darkred;
  }
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

  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, "favourites", user.uid, "meals", id));
      setRecipes(prev => prev.filter(recipe => recipe.id !== id));
      alert("Recipe removed from favourites.");
    } catch (error) {
      console.error("❌ Failed to delete recipe:", error);
      alert("Failed to delete recipe.");
    }
  };

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
            <DeleteButton onClick={() => handleDelete(recipe.id)}>❌</DeleteButton>
          </FavItem>
        ))}
      </FavList>
    </Container>
  );
}

export default Favourites;