import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { 
  Navigation, 
  Footer, 
  Home, 
  FilterableProductTable, 
  Pokedex,
  AllChgs,
  LoginMovieChg,
 } from "./components/export";
import { PRODUCTS } from './components/products/data.js';


function App() {
  
  return (
    
      <Router>
        <Navigation />
        <Switch>
          <Route path="/" exact component={() => <Home />} />
          <Route exact path="/pokemon" component={() => <Pokedex />} />
          <Route exact path="/products" component={() => <FilterableProductTable products={PRODUCTS} />} />
          {/* THIS BELOW WORKS THE SAME AS ABOVE AND I HAVE NO IDEA WHY YET */}
          <Route exact path="/buzzy" component={AllChgs} />
          <Route exact path="/login" component={LoginMovieChg} />
        </Switch>
        <Footer />
      </Router>

  );
}

export default App;