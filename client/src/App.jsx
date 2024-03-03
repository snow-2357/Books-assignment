import { createContext, useEffect, useState } from "react";
import "./App.css";
import BookList from "./components/BookList";
import SignInForm from "./components/SignInForm";
import SignUpForm from "./components/SignUpForm";
import axios from "axios";

export const AuthContext = createContext();

function App() {
  const [userToken, setUserToken] = useState(
    localStorage.getItem("token") || null
  );

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [signInUpToggle, setSignInUpToggle] = useState(true);

  const login = (token) => {
    localStorage.setItem("token", token);
    setUserToken(token);
    setIsLoggedIn(true);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUserToken(null);
    setIsLoggedIn(false);
  };

  useEffect(() => {
    const checkTokenValidity = async () => {
      try {
        if (userToken) {
          const response = await axios.get(
            `${import.meta.env.VITE_BACKEND_URL}/user/check-token`,
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
      // setIsLoading(false);
    };

    checkTokenValidity();
  }, [userToken]);

  return (
    <AuthContext.Provider value={{ userToken, isLoggedIn, login, logout }}>
      {!isLoggedIn ? (
        <section className="bg-gray-50 dark:bg-gray-900 h-screen">
          <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto lg:py-0">
            <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
              {signInUpToggle ? (
                <SignInForm toggle={() => setSignInUpToggle(false)} />
              ) : (
                <SignUpForm toggle={() => setSignInUpToggle(true)} />
              )}
            </div>
          </div>
        </section>
      ) : (
        <BookList />
      )}
    </AuthContext.Provider>
  );
}

export default App;
