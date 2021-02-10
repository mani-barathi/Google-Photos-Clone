import { useSelector } from "react-redux"
import './css/App.css';
import Nav from "./components/Nav.js";
import Login from "./components/Login.js";
import HomePage from "./components/HomePage.js";

function App() {
  const user = useSelector(state => state.user)

  return (
    <div className="app">

      {user ? (
        <>
          <Nav />
          <HomePage />
          {/* <AlbumPage /> */}
        </>
      ) : (
          <Login />
        )
      }

    </div>
  );
}

export default App;
