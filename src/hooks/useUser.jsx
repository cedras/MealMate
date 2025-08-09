import { useContext } from "react";
import UserContext from "../components/userContext";

export const useUser = () => useContext(UserContext);