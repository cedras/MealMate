import { Link } from "react-router-dom";
import styled from "styled-components";
import Logo from "./logo";
import { useUser } from "../components/usercontext";

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

const Button = styled.button`
  padding: 0.5rem 1rem;
  background-color: white;
  color: ${({ theme }) => theme.colors.secondary};
  border: none;
  border-radius: 6px;
  cursor: pointer;
  margin-right: 1rem;

  &:hover {
    opacity: 0.9;
  }
`;

function Navbar() {
  const { user, logout } = useUser();

  return (
    <Nav>
      <Logo $small={true} />
      <NavLinks>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/favourites">Favourites</NavLink>

        {user ? (
          <>
            <Button onClick={logout}>Logout</Button>
          </>
        ) : (
          <>
            <NavLink to="/login">Login</NavLink>
            <NavLink to="/register">Register</NavLink>
          </>
        )}
      </NavLinks>
    </Nav>
  );
}

export default Navbar;
