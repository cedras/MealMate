import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import Logo from "./logo";
import { useUser } from "../components/usercontext";
import { useState } from "react";

const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.secondary};
  color: ${({ theme }) => theme.colors.text};
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 1rem 2rem;
  position: relative;
`;

const NavLinks = styled.div`
  display: flex;
  align-items: center;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background-color: ${({ theme }) => theme.colors.secondary};
  flex-direction: column;
  align-items: flex-start;
  padding: 1rem;
  gap: 1rem;
  transform: ${({ $isOpen}) => 
    $isOpen ? "translateY(0)" : "translatey(-200%)"};
  opacity: ${({ $isOpen }) => ($isOpen ? "1" : "0")};
  pointer-events: ${({ $isOpen }) => ($isOpen ? "auto" : "none")};
  transition: all 0.3s ease-in-out;
  z-index: 100;
}
  
`;

const NavLink = styled(Link)`
  color: white;
  text-decoration: none;
  margin-right: 1rem;

  &:hover {
    text-decoration: underline;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
  margin: 0;
  width: 100%;
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

const Burger = styled.div`
  display: none;
  flex-direction: column;
  justify-content: space-between;
  width: 25px;
  height: 18px;
  cursor: pointer;

  span {
    display: block;
    height: 3px;
    background: white;
    border-radius: 2px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
  display: flex;
  }
`

function Navbar() {
  const { user, logout } = useUser();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/");
    setIsOpen(false);
  };
  

  return (
    <Nav>
      <Logo/>

      <Burger onClick={() => setIsOpen((prev) => !prev)}>
      <span></span>
      <span></span>
      <span></span>
      </Burger>
      <NavLinks $isOpen={isOpen}>
        <NavLink to="/" onClick={() => setIsOpen(false)}>Home</NavLink>

        {user ? (
          <>
            <NavLink to="/favourites" onClick={() => setIsOpen(false)}>Favourites</NavLink>
            <Button onClick={handleLogout} >Logout</Button>
          </>
        ) : (
          <>
            <NavLink to="/login" onClick={() => setIsOpen(false)}>Login</NavLink>
            <NavLink to="/register" onClick={() => setIsOpen(false)}>Register</NavLink>
          </>
        )}
      </NavLinks>
    </Nav>
  );
}

export default Navbar;
