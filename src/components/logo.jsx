import styled from "styled-components";
import { Link } from "react-router-dom";

const LogoWrapper = styled(Link)`
  width: fit-content;
  font-size: ${({ small }) => (small ? '1.2rem' : '2rem')};
  font-weight: bold;
  color: white;
  background-color: ${({ theme }) => theme.colors.logo};
  padding: 0.5rem 1rem;
  margin: 1rem 2rem;
  text-decoration: none;
  border-radius: 8px;

  &:hover {
    opacity: 0.9;
    background-color: ${({ theme }) => theme.colors.logoHover};
  }
`;

function Logo({ small = false }) {
  return <LogoWrapper to="/" small={small}>🍽️ MealMate</LogoWrapper>;
}

export default Logo;