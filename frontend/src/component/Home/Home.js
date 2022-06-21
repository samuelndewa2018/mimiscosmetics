import ProductCard from "../Products/ProductCard";
import ProductCardNew from "../Products/ProductCardNew";
import Header from "./Header";
import MetaData from "../../more/Metadata";
import Footer2 from "../footer/Footer";
import BottomTab from "../../more/BottomTab";
import Loading from "../../more/Loader";
import Slider from "./Slider";
import React, { useEffect } from "react";
import { Carousel } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, getProduct } from "../../actions/ProductActions";
import { clearErrorsNew, getProductNew } from "../../actions/ProductNewActions";
import "react-toastify/dist/ReactToastify.css";
import "./Home.css";

const Home = () => {
  const dispatch = useDispatch();
  const { products, error, loading } = useSelector((state) => state.products);
  const { productsNew } = useSelector((state) => state.productsNew);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
      dispatch(clearErrorsNew());
    }
    dispatch(getProduct());
    dispatch(getProductNew());
  }, [dispatch, error]);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
          <MetaData title="Home" />
          <Header />

          <div className="banner">
            <Slider />
          </div>

          <section className="icons-container">
            <div className="icons">
              <img src="img/icon-1.png" alt="" />
              <div className="infom">
                <h3>free delivery</h3>
                <span>on orders above ksh 999 </span>
              </div>
            </div>

            <div className="icons">
              <img src="img/icon-2.png" alt="" />
              <div className="infom">
                <h3>10 days returns</h3>
                <span>moneyback guarantee</span>
              </div>
            </div>

            <div className="icons">
              <img src="img/icon-3.png" alt="" />
              <div className="infom">
                <h3>offer & gifts</h3>
                <span>on all orders</span>
              </div>
            </div>

            <div className="icons">
              <img src="img/icon-4.png" alt="" />
              <div className="infom">
                <h3>secure paymens</h3>
                <span>protected by M-PESA</span>
              </div>
            </div>
          </section>
          <div id="container">
            <h2 className="homeHeading">Featured Products</h2>

            <div className="container">
              {products &&
                products.map((product) => (
                  <ProductCard key={product._id} product={product} />
                ))}
            </div>
          </div>
          {/* <div id="container">
            <h2 className="homeHeading">New Products</h2>

            <div className="container">
              {productsNew &&
                productsNew.map((productNew) => (
                  <ProductCardNew
                    key={productNew._id}
                    productNew={productNew}
                  />
                ))}
            </div>
          </div> */}
          <ToastContainer
            position="top-center"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
          />
          <Footer2 />
          <BottomTab />
        </>
      )}
    </>
  );
};

export default Home;
