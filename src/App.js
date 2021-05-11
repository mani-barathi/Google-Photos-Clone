import { useSelector } from "react-redux"
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import './css/App.css';
import Nav from "./components/Nav.js";
import Login from "./components/Login.js";
import HomePage from "./pages/HomePage.js";
import AlbumPage from "./pages/AlbumPage.js";

function App() {
  const user = useSelector(state => state.user)

  return (
    <div className="app">
      <Router>

        {user ? (
          <>
            <Nav />

            <Switch>

              <Route path='/' exact>
                <HomePage />
              </Route>

              <Route path='/album/:albumName' >
                <AlbumPage />
              </Route>

            </Switch>
          </>
        ) : (
            <Login />
          )
        }

      </Router>
    </div>
  );
}

export default App;
