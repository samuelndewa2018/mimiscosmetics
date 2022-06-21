import React from "react";
import Header from "../component/Home/Header";
import "./Loading.css";

const Loading = () => {
  return (
    <>
      <Header />
      <div className="loading">
        <input type="checkbox" id="check" />
        <label for="check" className="loadingLabel">
          <div class="check-icon"></div>
        </label>
      </div>
    </>
  );
};

export default Loading;
