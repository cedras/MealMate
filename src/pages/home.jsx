import styled from 'styled-components';
import Logo from "../components/logo";
import SearchInput from '../components/SearchInput';
import SearchResults from '../components/SearchResults';


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

const Popular = styled.div`
  font-size: 2rem;
  margin-top: 50px;
  
`

const mockResults = [
  { id: 1, title: "Kurczak w sosie", description: "Aromatyczny i pyszny obiad"},
  { id: 2, title: "Kurczak z ryżem", description: "Aromatyczny i zdrowy obiad"}
];

function Home() {
  return (
    <Container>
      <MainContent>
        <Logo />
        <Greeting>Welcome to the MealMate friend, start looking for your perfect recipes now!</Greeting>
        <SearchInput />
        <Popular>Some of the most popular recipes lately:</Popular>
      </MainContent>
    </Container>
  );
}

export default Home;