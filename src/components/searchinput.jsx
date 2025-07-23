import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const InputWrapper = styled.div`
  display: flex;
  width: 100%;
  max-width: 500px;
  margin-bottom: 2rem;
`;

const Input = styled.input`
  flex: 1;
  padding: 0.75rem 1rem;
  font-size: 1rem;
  border: 2px solid ${({ theme }) => theme.colors.primary};
  border-radius: 8px 0 0 8px;
  outline: none;
`;

const Button = styled.button`
  padding: 0.75rem 1rem;
  font-size: 1rem;
  background-color: ${({ theme }) => theme.colors.primary};
  color: white;
  border: none;
  border-radius: 0 8px 8px 0;
  cursor: pointer;

  &:hover {
    background-color: ${({ theme }) => theme.colors.secondary};
  }
`;

function SearchInput() {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = () => {
    if (query.trim()) {
      navigate(`/search?q=${encodeURIComponent(query.trim())}`);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") handleSearch();
  };

  return (
    <InputWrapper>
      <Input
        type="text"
        placeholder="Enter your ingiredient (e.g. chicken, pasta)"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={handleKeyPress}
      />
      <Button onClick={handleSearch}>Search</Button>
    </InputWrapper>
  );
}

export default SearchInput;