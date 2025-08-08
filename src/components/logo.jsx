import styled from "styled-components";
import { Link } from "react-router-dom";

const LogoWrapper = styled(Link)`
  width: fit-content;
  font-size: ${({ theme }) => theme.fontSizes.heading};
  font-weight: bold;
  color: white;
  background-color: ${({ theme }) => theme.colors.logo};
  padding: 1rem 2rem;
  margin: 1rem 2rem;
  text-decoration: none;
  border-radius: 8px;
  position: relative;

  &:hover {
    opacity: 0.9;
    background-color: ${({ theme }) => theme.colors.logoHover};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    font-size: 1.5rem;
    padding: 0.8rem 1.8rem;
  }
`;

function Logo() {
  return <LogoWrapper to="/">🍽️ MealMate</LogoWrapper>;
}

export default Logo;