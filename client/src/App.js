import './App.css';
import { Route, Switch, BrowserRouter } from "react-router-dom";
import LandingPage from "./components/LandingPage/LandingPage";
import Home from "./components/Home/Home"
import CountryDetails from './components/CountryDetails/CountryDetails';
import FormAddActivity from "./components/FormAddActivity/FormAddactivity"

function App() {
  return (
    // pagina con link aparte
    <BrowserRouter>
      <div className="App">
        <Switch>
          <Route exact path="/">
            <LandingPage />
          </Route>
          <Route exact path="/home">
            <Home />
          </Route>
          <Route exact path="/country-detail/:id">
            <CountryDetails />
          </Route>
          <Route exact path="/add-activity">
            <FormAddActivity />
          </Route>
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
