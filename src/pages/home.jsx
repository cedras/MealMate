import styled from 'styled-components';
import Logo from "../components/logo";


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

function Home() {
  return (
    <Container>
      <MainContent>
        <Logo />
        <Greeting>Witaj w MealMate! Znajdź idealny przepis na dziś.</Greeting>
        
      </MainContent>
    </Container>
  );
}

export default Home;