import "./App.css";
import BookCard from "./components/BookCard";
import BookList from "./components/BookList";
import SignInForm from "./components/SignInForm";
import SignUpForm from "./components/SignUpForm";

function App() {
  console.log(import.meta.env.VITE_BACKEND_URL);
  return (
    <>
      {/* <section className="bg-gray-50 dark:bg-gray-900">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto lg:py-0">
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <SignInForm />
            <SignUpForm />
          </div>
        </div>
      </section> */}
      <BookList />
    </>
  );
}

export default App;
