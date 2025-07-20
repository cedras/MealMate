import { Link } from "react-router-dom";
import styled from "styled-components";
import Logo from "./logo";

const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.secondary};
  color: ${({ theme }) => theme.colors.text};
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 1rem 2rem;
`;

const NavLinks = styled.div`
  display: flex;
  align-items: center;
`;

const NavLink = styled(Link)`
  display: flex;
  align-items: center;
  color: white;
  text-decoration: none;
  margin-right: 1rem;

  &:hover {
    text-decoration: underline;
  }
`;

function Navbar() {
  return (
    <Nav>
      <Logo small />
      <NavLinks>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/login">Login</NavLink>
        <NavLink to="/register">Register</NavLink>
        <NavLink to="/favourites">Favourites</NavLink>
      </NavLinks>
    </Nav>
  );
}
export default Navbar;
