import "./App.css";

//import router modules
import { Route, BrowserRouter as Router } from "react-router-dom";

//components
import Header from "./components/Header";

//import pages
import Home from "./pages/Home/Home";
import RandomNumber from "./pages/RandomNumber/RandomNumber";

function App() {
  return (
    <div className="App">
      <Router>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/random-number">
          <Header />
          <div className="page">
            <RandomNumber />
          </div>
        </Route>
      </Router>
    </div>
  );
}

export default App;
