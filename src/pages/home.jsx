import styled from 'styled-components';
import Logo from "../components/logo";
import SearchInput from '../components/SearchInput';
import SearchResults from '../components/SearchResults';
import { useEffect, useState } from 'react';
import api from '../services/api';
import { Link } from 'react-router-dom';


const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;


const MainContent = styled.main`
    margin-top: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem;
`;

const Greeting = styled.h1`
  font-size: 2rem;
  margin-bottom: 2rem;
  text-align: center;
`;

const RandomRecipesSection = styled.div`
  font-size: 2rem;
  margin-top: 50px;
  
`

const RandomMealsGrid = styled.div`
  margin-top: 2rem;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  width: 100%;
  max-width: 1000px;
`;

const RandomCard = styled.div`
  background-color: white;
  border: 1px solid #ddd;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 0 6px rgba(0, 0, 0, 0.05);
  transition: transform 0.2s;

  &:hover {
    transform: scale(1.02);
  }
`;

const RandomImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
`;

const RandomTitle = styled.h3`
  padding: 1rem;
  font-size: 1.2rem;
`;



function Home() {

  const [randomMeals, setRandomMeals] = useState([]);

useEffect(() => {
  const fetchRandomMeals = async () => {
    try {
      const promises = Array.from({ length: 3 }, () => api.get('/random.php'));
      const results = await Promise.all(promises);
      const meals = results.map(res => res.data.meals[0]);
      setRandomMeals(meals);
    } catch (err) {
      console.error("❌ Failed to fetch random meals:", err);
    }
  };

  fetchRandomMeals();
}, []);

  return (
    <Container>
      <MainContent>
        <Logo />
        <Greeting>Welcome to the MealMate friend, start looking for your perfect recipes now!</Greeting>
        <SearchInput />
        <RandomRecipesSection>Some random recipes for inspiration:</RandomRecipesSection>

        <RandomMealsGrid>
          {randomMeals.map((meal) => (
            <Link to={`/recipes/${meal.idMeal}`} key={meal.idMeal} style={{ textDecoration: 'none', color: 'inherit' }}>
              <RandomCard>
                <RandomImage src={meal.strMealThumb} alt={meal.strMeal} />
                <RandomTitle>{meal.strMeal}</RandomTitle>
              </RandomCard>
            </Link>
          ))}
        </RandomMealsGrid>
      </MainContent>
    </Container>
  );
}

export default Home;