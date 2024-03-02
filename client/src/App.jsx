import { createContext, useState } from "react";
import "./App.css";
import BookList from "./components/BookList";
import SignInForm from "./components/SignInForm";
import SignUpForm from "./components/SignUpForm";

export const AuthContext = createContext();

function App() {
  const [userId, setUserId] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [signInUpToggle, setSignInUpToggle] = useState(true);

  const login = (id) => {
    setUserId(id);
    setIsLoggedIn(true);
  };

  const logout = () => {
    setUserId(null);
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ userId, isLoggedIn, login, logout }}>
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
