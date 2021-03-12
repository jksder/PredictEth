import "./App.css";

//import router modules
import { Route, BrowserRouter as Router } from "react-router-dom";

//import pages
import Home from "./pages/Home/Home";
import RandomNumber from './pages/RandomNumber/RandomNumber';

function App() {
  return (
    <div className="App">
      <Router>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/random-number">
          <RandomNumber />
        </Route>
      </Router>
    </div>
  );
}

export default App;
