import MetaData from "./Metadata";
import BottomTab from "./BottomTab.js";
import Header from "../component/Home/Header";
import axios from "axios";
import Footer from "../component/footer/Footer";
import Loading from "./Loader";
import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { useSelector } from "react-redux";
import "react-toastify/dist/ReactToastify.css";
import "./Support.css";

const Support = ({ history }) => {
  const { loading } = useSelector((state) => state.profile);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [looading, setLooading] = useState(false);

  const submitHandler = async (e) => {
    e.preventDefault();
    if (!name || !email || !subject || !message) {
      return toast.error("Please fill email, subject and message");
    }
    try {
      setLooading(true);
      const { data } = await axios.post(`api/v2/contact/form`, {
        name,
        email,
        subject,
        message,
      });
      setLooading(false);
      toast.success(data.message);
    } catch (err) {
      setLooading(false);
      toast.error(
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message
      );
    }
  };

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
          <MetaData title="Support" />
          <Header />

          <div
            className="support"
            style={{
              width: "100%",
              justifyContent: "center",
              alignItems: "center",
              padding: "50px 0",
            }}
          >
            <h2
              className="support__heading"
              style={{
                textAlign: "center",
              }}
            >
              Hey How can we improve our services
            </h2>
            <h2
              className="support__heading"
              style={{
                textAlign: "center",
              }}
            >
              Report us for something...
            </h2>
            <div>
              <form className="supportForm" onSubmit={submitHandler}>
                <input
                  className="support__headingInput"
                  id="supportInput"
                  type="text"
                  required
                  name="user__name"
                  onChange={(e) => setName(e.target.value)}
                />
                <span style={{ marginLeft: "10px" }}>Write your Name ...</span>

                <input
                  type="text"
                  required
                  id="supportInput"
                  name="user__subject"
                  onChange={(e) => setSubject(e.target.value)}
                />
                <span style={{ marginLeft: "10px" }}> Write a Subject ...</span>

                <input
                  type="text"
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  id="supportInput"
                />
                <span style={{ marginLeft: "10px" }}>Write your Email...</span>

                <textarea
                  cols="30"
                  rows="5"
                  type="text"
                  required
                  className="supportTextarea"
                  name="user__message"
                  onChange={(e) => setMessage(e.target.value)}
                >
                  {" "}
                </textarea>
                <span style={{ marginLeft: "10px" }}>
                  write your message ...
                </span>

                <button className="supportBtn">
                  {" "}
                  {looading ? "Sending..." : "Submit"}
                </button>
              </form>
              <div className="animation"></div>
            </div>
          </div>
          <Footer />
          <BottomTab />

          <ToastContainer position="top-center" limit={1} />
        </>
      )}
    </>
  );
};

export default Support;
