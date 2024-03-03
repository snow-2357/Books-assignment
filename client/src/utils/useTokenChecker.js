import { useEffect, useState } from "react";
import axios from "axios";

const useTokenChecker = (initialToken) => {
  const [userToken, setUserToken] = useState(initialToken);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkTokenValidity = async () => {
      try {
        if (!userToken) {
          const response = await axios.get(
            "http://localhost:3000/check-token",
            {
              headers: { token: userToken },
            }
          );
          console.log(response);
          setIsLoggedIn(true);
        }
      } catch (error) {
        console.error("Error:", error);
      }
      setIsLoading(false);
    };

    checkTokenValidity();
  }, [userToken]);

  const login = (token) => {
    setUserToken(token);
  };

  const logout = () => {
    setUserToken(null);
    setIsLoggedIn(false);
  };

  return { userToken, isLoggedIn, isLoading, login, logout };
};

export default useTokenChecker;
