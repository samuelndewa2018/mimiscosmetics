import WebFont from "webfontloader";
import Home from "./component/Home/Home";
import About from "./component/about/About";
import Contact from "./component/contact/Contact";
import LoginSignup from "./component/Authentication/LoginSignup";
import UserData from "./more/UserData";
import ProductDetails from "./component/Products/ProductDetails";
import ProductDetailsNew from "./component/Products/ProductDetailsNew";
import Search from "./component/Products/Search";
import Products from "./component/Products/Products";
import Shipping from "./component/cart/Shipping";
import ConfirmOrder from "./component/cart/ConfirmOrder";
import Success from "./component/cart/Success";
import MyOrder from "./component/user/MyOrder";
import MyOrderDetails from "./component/user/MyOrderDetails";
import Cart from "./component/cart/Cart";
import Favourites from "./component/cart/Favourites";
import ForgotPassword from "./component/user/ForgotPassword";
import Store from "./store";
import ProtectedRoute from "./route/ProtectedRoute";
import Profile from "./component/user/Profile";
import UpdatePassword from "./component/user/UpdatePassword";
import ResetPassword from "./component/user/ResetPassword";
import EditProfile from "./component/user/EditProfile";
import Support from "./more/Support";
import Rules from "./more/Rules";
import MoreOption from "./component/user/MoreOption";
import Dashboard from "./component/Admin/Dashboard";
import CreateProduct from "./component/Admin/CreateProduct";
import CreateProductNew from "./component/Admin/CreateProductNew";
import AllProducts from "../../frontend/src/component/Admin/AllProducts";
import EditProduct from "../../frontend/src/component/Admin/EditProduct";
import AllOrder from "../../frontend/src/component/Admin/AllOrder";
import UpdateOrder from "../../frontend/src/component/Admin/UpdateOrder";
import AllUsers from "../../frontend/src/component/Admin/AllUsers";
import UpdateUser from "../../frontend/src/component/Admin/UpdateUser";
import AllReviews from "../../frontend/src/component/Admin/AllReviews";
import ContactUs from "./more/ContactUs";
import Payment from "./component/cart/Payment";
import { useEffect } from "react";
import { loadUser } from "./actions/userAction";
import { useSelector } from "react-redux";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";

function App() {
  const { isAuthenticated, user } = useSelector((state) => state.user);

  useEffect(() => {
    WebFont.load({
      google: {
        families: ["Roboto", "Droid Sans", "Chilanka"],
      },
    });
    Store.dispatch(loadUser());
  }, []);
  return (
    <Router>
      {isAuthenticated && <UserData user={user} />}

      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/products" component={Products} />
        <Route exact path="/product/:id" component={ProductDetails} />
        <Route exact path="/productNew/:id" component={ProductDetailsNew} />
        <Route exact path="/search" component={Search} />
        <Route exact path="/products/:keyword" component={Products} />
        <Route exact path="/cart" component={Cart} />
        <Route exact path="/about" component={About} />
        <Route exact path="/contact" component={Contact} />
        <Route exact path="/login" component={LoginSignup} />
        <Route exact path="/support" component={Support} />
        <Route exact path="/favourites" component={Favourites} />
        <Route exact path="/password/forgot" component={ForgotPassword} />
        <Route exact path="/password/reset/:token" component={ResetPassword} />
        <Route exact path="/faq" component={Rules} />
        <Route exact path="/more" component={MoreOption} />
        <Route exact path="/commingsoon" component={ContactUs} />
        <Route exact path="/process/payment" component={Payment} />
        <ProtectedRoute exact path="/me" component={Profile} />
        <ProtectedRoute exact path="/shipping" component={Shipping} />
        <ProtectedRoute exact path="/order/confirm" component={ConfirmOrder} />
        <ProtectedRoute exact path="/success" component={Success} />
        <ProtectedRoute exact path="/orders" component={MyOrder} />
        <ProtectedRoute exact path="/order/:id" component={MyOrderDetails} />
        <ProtectedRoute exact path="/me/update" component={UpdatePassword} />
        <ProtectedRoute exact path="/me/update/info" component={EditProfile} />
        <ProtectedRoute
          isAdmin={true}
          exact
          path="/dashboard"
          component={Dashboard}
        />
        <ProtectedRoute
          isAdmin={true}
          exact
          path="/admin/product"
          component={CreateProduct}
        />
        <ProtectedRoute
          isAdmin={true}
          exact
          path="/admin/product/new/new"
          component={CreateProductNew}
        />
        <ProtectedRoute
          isAdmin={true}
          exact
          path="/admin/products"
          component={AllProducts}
        />
        <ProtectedRoute
          isAdmin={true}
          exact
          path="/edit/product/:id"
          component={EditProduct}
        />
        <ProtectedRoute
          isAdmin={true}
          exact
          path="/admin/orders"
          component={AllOrder}
        />
        <ProtectedRoute
          isAdmin={true}
          exact
          path="/admin/order/:id"
          component={UpdateOrder}
        />
        <ProtectedRoute
          isAdmin={true}
          exact
          path="/admin/users"
          component={AllUsers}
        />
        <ProtectedRoute
          isAdmin={true}
          exact
          path="/admin/user/:id"
          component={UpdateUser}
        />
        <ProtectedRoute
          isAdmin={true}
          exact
          path="/admin/reviews"
          component={AllReviews}
        />
      </Switch>
    </Router>
  );
}

export default App;
