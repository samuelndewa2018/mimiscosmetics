import React from "react";
import DeleteIcon from "@material-ui/icons/Delete";
import { Link } from "react-router-dom";
import "./FavouriteItemsCard.css";

const FavouriteItemsCard = ({ item, deleteFavouriteItems }) => {
  return (
    <>
      <div className="FavouriteItemsCard">
        <div>
          <img src={item.image} alt="ssa" />
          <Link
            to={`/product/${item.product}`}
            style={{
              fontSize: "300 0.9vmax",
              fontFamily: "cursive",
            }}
          >
            {item.name}
          </Link>
          <p onClick={() => deleteFavouriteItems(item.product)}>
            {" "}
            <DeleteIcon />
            Remove
          </p>
        </div>

        <div>
          <span>{`Ksh ${item.price}`}</span>
        </div>
        <div>
          <Link to={`/product/${item.product}`}>
            <button
              className="favouritesButton"
              onClick={() => deleteFavouriteItems(item.product)}
            >
              Add To Cart
            </button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default FavouriteItemsCard;
