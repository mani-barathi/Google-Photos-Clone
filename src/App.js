import './css/App.css';
import Nav from "./components/Nav.js";

function App() {
  const user = "mani"
  return (
    <div className="app">
      <Nav />

      {user ? (
        <>
          <div></div>
        </>
      ) : (
          <div></div>
        )
      }

    </div>
  );
}

export default App;
