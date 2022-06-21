import React from "react";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { Link } from "react-router-dom";
import { Rating } from "@material-ui/lab";
import "./productCard.css";

const ProductCardNew = ({ productNew }) => {
  const options = {
    value: productNew.ratings,
    readOnly: true,
    precision: 0.5,
  };

  return (
    <>
      <Link className="ProductCard" to={`/productNew/${productNew._id}`}>
        <img
          src={productNew.images[0].url}
          alt={productNew.name}
          className="ProductImg"
        />
        <p className="productName">{productNew.name}</p>
        <div className="RatingReview">
          <span>
            <Rating {...options} />
          </span>
          <span>({productNew.numOfReviews} Reviews)</span>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <div className="offerPriceBox">
            <h1
              className="discountPrice"
              style={{
                paddingLeft: "2.5vmax",
                fontSize: ".9vmax",
                paddingBottom: "0",
              }}
            >
              {productNew.offerPrice > 0
                ? `was Ksh${productNew.offerPrice}`
                : ""}
            </h1>
            <span className="p__Price">
              {`Ksh.${productNew.price}`}{" "}
              <div className="AddShoppingCartIcon">
                <AddShoppingCartIcon />
              </div>
            </span>
          </div>
        </div>
      </Link>
    </>
  );
};

export default ProductCardNew;
