import Product from "./pages/Product";
import Home from "./pages/Home";
import ProductList from "./pages/ProductList";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Cart from "./pages/Cart";
import Success from "./pages/Success";
import Checkout from "./pages/Checkout";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import ScrollToTop from "./scrollTop";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Announcement from "./components/Anouncement";
import { useSelector } from "react-redux";

const App = () => {
  const user = useSelector(state => state.user.currentUser );
  return (
    <Router>
      <Announcement/>
      <ScrollToTop/>
      <Navbar/>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/products/:category">
          <ProductList />
        </Route>
        <Route path="/product/:id">
          <Product />
        </Route>
        <Route path="/cart">
          <Cart />
        </Route>
        <Route path="/success">
          <Success />
        </Route>
        <Route path="/checkout">
          <Checkout />
        </Route>
        <Route path="/login">
          {user ? <Redirect to="/" /> : <Login />}
        </Route>
        <Route path="/register">
          {user ? <Redirect to="/" /> : <Register />}
        </Route>
        <Redirect to="/" /> 
      </Switch>
      <Footer/>
    </Router>
  );
};

export default App;