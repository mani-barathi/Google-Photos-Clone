import { useState } from "react"
import './css/App.css';
import Nav from "./components/Nav.js";
import Login from "./components/Login.js";

function App() {
  const [user, setUser] = useState(null)

  return (
    <div className="app">

      {user ? (
        <>
          <Nav user={user} setUser={setUser} />
        </>
      ) : (
          <Login setUser={setUser} />
        )
      }

    </div>
  );
}

export default App;
