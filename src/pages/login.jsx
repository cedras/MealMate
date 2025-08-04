import { useState } from "react";
import styled from "styled-components";
import { auth } from "../services/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

const Container = styled.div`
    padding: 2rem;
    max-width: 500px;
    margin: 0 auto;
`;

const LoginMessage = styled.h2`
  font-size: 2rem;
    margin-bottom: 2rem;
    text-align: center;
`;

const Form = styled.form`
    display: flex;
    flex-direction: column;
    gap: 1rem;
    align-items: center;
    
`;

const Input = styled.input`
padding: 0.75rem;
    border: 2px solid ${({ theme }) => theme.colors.primary};
    border-radius: 8px;
    width: 300px;
`;

const Button = styled.button`
    padding: 0.75rem;
    background-color: ${({ theme }) => theme.colors.primary};
    color: white;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    width: 150px;

    &:hover {
        background-color: ${({ theme }) => theme.colors.secondary};
        opacity: 0.9;
    }
`;

const Message = styled.p`
    color: ${({ success }) => (success ? "green" : "red")};
`;

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState(null);
    const [success, setSuccess] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage(null);

        if (!email || !password) {
            setMessage("Please fill in all fields.");
            setSuccess(false);
            return;
        }

        try {
            await signInWithEmailAndPassword(auth, email, password);
            setMessage("Login successful!");
            setSuccess(true);
        } catch (error) {
            setMessage(`Error: ${error.message}`);
            setSuccess(false);
        }
    };

    return (
        <Container>
            <LoginMessage>Login to MealMate</LoginMessage>
            <Form onSubmit={handleSubmit}>
                <Input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <Input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <Button type="submit">Login</Button>
                {message && <Message success={success}>{message}</Message>}
            </Form>
            </Container>
    );
}
export default Login;
            