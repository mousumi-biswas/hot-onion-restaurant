import React, { useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Header from "./components/Header/Header";
import Banner from "./components/Banner/Banner";
import Foods from "./components/Foods/Foods";
import FoodDetail from "./components/FoodDetail/FoodDetail";
import SignUp from "./components/SignUp/SignUp";
import Shipment from "./components/Shipment/Shipment";
import Order from "./components/Order/Order";
import Footer from "./components/Footer/Footer";
import Features from "./components/Features/Features";
import NotFound from "./components/NotFound/NotFound";
import SearchResult from "./components/SearchResult/SearchResult";
import Inventory from "./components/Inventory/Inventory";
import { AuthProvider, PrivateRoute } from "./components/SignUp/useAuth";

function App() {
  const [orderId, setOrderId] = useState(null);
  const [cart, setCart] = useState([]);
  const [userEmail, setUserEmail] = useState(null);
  const [deliveryDetails, setDeliveryDetails] = useState({
    todoor: null,
    road: null,
    flat: null,
    businessname: null,
    address: null,
  });
  const deliveryDetailsHandler = (data) => {
    setDeliveryDetails(data);
  };
  //const clearCart = () => {
  //setCart([]);
  //};

  const Email = (email) => {
    setUserEmail(email);
  };

  const clearCart = () => {
    const orderedItems = cart.map((cartItem) => {
      return { food_id: cartItem.id, quantity: cartItem.quantity };
    });

    const orderDetailsData = { orderedItems, deliveryDetails };
    fetch("http://localhost:4200/submitOrder", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(orderDetailsData),
    })
      .then((res) => res.json())
      .then((data) => setOrderId(data._id));
    console.log(orderId);

    setCart([]);
  };

  const cartHandler = (data) => {
    const itemAdded = cart.find((crt) => crt.id == data.id);
    const newCart = [...cart, data];
    setCart(newCart);
    if (itemAdded) {
      const remainingCarts = cart.filter((crt) => crt.id != data);
      setCart(remainingCarts);
    } else {
      const newCart = [...cart, data];
      setCart(newCart);
    }
  };

  const checkOutItemHandler = (productId, productQuantity) => {
    const newCart = cart.map((item) => {
      if (item.id == productId) {
        item.quantity = productQuantity;
      }
      return item;
    });

    const filteredCart = newCart.filter((item) => item.quantity > 0);
    setCart(filteredCart);
  };
  return (
    <AuthProvider>
      <Router>
        <div className="main">
          <Switch>
            <Route exact path="/">
              <Header cart={cart}></Header>
              <Banner></Banner>
              <Foods cart={cart}></Foods>
              <Features></Features>
              <Footer></Footer>
            </Route>
            <Route path="/food/:id">
              <Header cart={cart}></Header>
              <FoodDetail cart={cart} cartHandler={cartHandler}></FoodDetail>
              <Footer></Footer>
            </Route>
            <Route path="/search=:searchQuery">
              <Header cart={cart}></Header>
              <Banner></Banner>
              <SearchResult></SearchResult>
              <Features></Features>
              <Footer></Footer>
            </Route>
            <PrivateRoute path="/checkout">
              <Header cart={cart}></Header>
              <Shipment
                deliveryDetails={deliveryDetails}
                deliveryDetailsHandler={deliveryDetailsHandler}
                cart={cart}
                clearCart={clearCart}
                checkOutItemHandler={checkOutItemHandler}
              ></Shipment>
              <Footer></Footer>
            </PrivateRoute>
            <PrivateRoute path="/order-complete">
              <Header cart={cart}></Header>
              <Order deliveryDetails={deliveryDetails}></Order>
              <Footer></Footer>
            </PrivateRoute>
            <Route path="/inventory">
              <Header cart={cart} />
              <Inventory></Inventory>
              <Footer />
            </Route>

            <Route path="/login">
              <SignUp></SignUp>
            </Route>
            <Route path="*">
              <NotFound></NotFound>
            </Route>
          </Switch>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
