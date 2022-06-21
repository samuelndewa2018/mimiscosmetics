import MetaData from "../../more/Metadata";
import CheckoutSteps from "./CheckoutSteps";
import Header from "../Home/Header";
import Footer from "../footer/Footer";
import axios from "axios";
import LocalShippingIcon from "@material-ui/icons/LocalShipping";
import React, { useState } from "react";
import { Typography } from "@material-ui/core";
import { CLEAR_CART } from "../../constans/CartConstans";
import { createOrder } from "../../actions/OrderAction";
import { ToastContainer, toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import "./payment.css";
import "react-toastify/dist/ReactToastify.css";

const Payment = ({ history }) => {
  const dispatch = useDispatch();
  const orderInfo = JSON.parse(sessionStorage.getItem("orderInfo"));
  const { shippingInfo, cartItems } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.user);
  const [loading, setLoading] = useState(false);
  const [isChecked, setIsChecked] = useState(true);
  const [processing, setProcessing] = useState(false);
  const [succeeded, setSucceeded] = useState(false);
  const [disabled, setDisabled] = useState(false);
  let productPrice = cartItems.reduce(
    (acc, item) => acc + item.quantity * item.price,
    0
  );
  const subtotal = productPrice;
  const shippingCharges = productPrice > 999 ? 0 : 50;
  const totalPrice = subtotal + shippingCharges;
  const phoneNo = shippingInfo.phoneNo;
  const order = {
    shippingInfo,
    orderItems: cartItems,
    itemsPrice: orderInfo.subtotal,
    shippingPrice: orderInfo.shippingCharges,
    totalPrice: orderInfo.totalPrice,
    phoneNo: orderInfo.phoneNo,
    email: user.email,
  };
  const message = `You have New Order \n Total: ${totalPrice} \n Phone: ${shippingInfo.phoneNo} \n Email: ${user.email} \n Items: Check on Website`;
  const messageUser = `Hello ${user.name}, \n\n We have Received your Order worth ${totalPrice}. \nYour Order will be proccessed within the next 24hrs.\n \n Thank you for Shopping with Mimiscosmetics. `;
  const submitHandler2 = async (e) => {
    e.preventDefault();
    if (subtotal === 0) {
      toast.error("Your cart is Empty");
    } else {
      try {
        setProcessing(true);
        const { data } = await axios.post(`/api/v2/receive/order`, {
          message,
        });
        const { data2 } = await axios.post(`/api/v2/receive/order/user`, {
          email: user.email,
          message: messageUser,
        });
        dispatch(createOrder(order));
        setProcessing(false);

        history.push("/success");
        dispatch({
          type: CLEAR_CART,
        });
        toast.success(data.message);
      } catch (err) {
        setProcessing(false);
        toast.error("There was Problem in processing your Order");
        history.push("/process/payment");
      }
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    if (subtotal === 0) {
      toast.error("Your cart is Empty");
    } else {
      setProcessing(true);
      if (!shippingInfo.phoneNo) {
        return toast.error(
          "Your phone number is missing. Please go back and fill it"
        );
      }
      try {
        setLoading(true);
        const { data } = await axios.post(`api/v2/stk/push`, {
          phoneNo,
          totalPrice,
        });
        toast.success("Payment is being processed");
        const { data2 } = await axios.post(`/api/v2/receive/order`, {
          message,
        });
        const { data3 } = await axios.post(`/api/v2/receive/order/user`, {
          email: user.email,
          message: messageUser,
        });
        setLoading(false);
        toast.success(data.message);

        setProcessing(false);
        dispatch(createOrder(order));
        history.replace("/success");
        dispatch({
          type: CLEAR_CART,
        });
      } catch (err) {
        setLoading(false);
        setProcessing(false);
        toast.error("There was Problem in processing your Order");
        history.push("/process/payment");
      }
    }
  };

  return (
    <>
      <MetaData title="Payment" />
      <Header />
      <CheckoutSteps activeStep={2} />
      <div className="paymentContainer">
        <form className="paymentForm" style={{ fontFamily: "Courier New" }}>
          <Typography>Payment Info</Typography>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "spaceAround",
            }}
          >
            <d className="flexCollumn2">{` ${user.name}, as: "${user.email}"`}</d>
          </div>
          <div>
            <d className="flexCollumn">Mpesa No:</d>
            <d className="flexCollumn2">{phoneNo}</d>
          </div>
          <div>
            <d className="flexCollumn">Delivery To:</d>
            <d className="flexCollumn2">
              {`${shippingInfo.address}, ${shippingInfo.state}.`}
            </d>
          </div>
          <div>
            <d className="flexCollumn">Payment Totals:</d>
            <d className="flexCollumn2">{`Ksh. ${totalPrice}`}</d>
          </div>
          <div
            className="flexCollumn"
            style={{ fontFamily: "Poppins,sans-serif" }}
          >
            Pay Through:
          </div>
          <div style={{ display: "flex", flexDirection: "collumn" }}>
            {" "}
            <div style={{ flex: "0.5" }}>
              <input
                type="radio"
                name="mpesa"
                onClick={() => setIsChecked(true)}
              />
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/M-PESA_LOGO-01.svg/800px-M-PESA_LOGO-01.svg.png"
                alt="LipaNaMPESA"
                style={{
                  width: "72px",
                  height: "54px",
                  margin: "0 10px 10px 10px",
                  cursor: "pointer",
                }}
              />
            </div>
            <div style={{ flex: "0.5" }}>
              <input
                type="radio"
                name="mpesa"
                onClick={() => setIsChecked(false)}
              />
              <d className="OnDelivery">
                <LocalShippingIcon style={{ color: "#3bb77e" }} />
                On Delivey
              </d>
            </div>
          </div>

          {isChecked === true ? (
            <button
              style={{ borderRadius: "3px", outline: "none" }}
              onClick={submitHandler}
              className="paymentFormBtn"
              disabled={processing || disabled || succeeded}
            >
              {processing ? "Processing..." : `Pay Ksh ${totalPrice} via MPESA`}
            </button>
          ) : (
            <button
              type="submit"
              style={{ borderRadius: "3px", outline: "none" }}
              onClick={submitHandler2}
              className="paymentFormBtn"
              disabled={processing || disabled || succeeded}
            >
              {processing ? "Processing..." : "Submit Order"}
            </button>
          )}
        </form>
      </div>
      <Footer />
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
    </>
  );
};

export default Payment;
