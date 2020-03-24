import React, { useState } from "react";
import "./FoodDetail.css";
import { useParams } from "react-router-dom";
import AllFoodData from "../../Data/foods.json";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCartArrowDown,
  faCheckCircle
} from "@fortawesome/free-solid-svg-icons";

const FoodDetail = props => {
  const { id } = useParams();
  const currentFood = AllFoodData.find(food => food.id == id);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(currentFood.images[0]);
  const [isSuccess, setIsSuccess] = useState(false);

  useState(() => {
    if (currentFood.quantity) {
      setQuantity(currentFood.quantity);
    }
  }, [currentFood.quantity]);

  const finalCartHandler = currentFood => {
    currentFood.quantity = quantity;
    props.cartHandler(currentFood);
    setIsSuccess(true);
  };

  if (isSuccess) {
    setTimeout(() => setIsSuccess(false), 3000);
  }

  return (
    <div className="food-details my-5 pt-5 container">
      <div className="row">
        <div className="col-md-6 pr-md-4">
          <h1>{currentFood.name}</h1>
          <p className="my-5">{currentFood.fullDescription}</p>
          <div className="d-flex  my-4">
            <h2 className="price">${currentFood.price.toFixed(2)}</h2>

            <div className="cart-container ml-3 btn">
              <button
                className="btn"
                onClick={() => setQuantity(quantity <= 1 ? 1 : quantity - 1)}
              >
                -
              </button>{" "}
              {quantity}{" "}
              <button className="btn" onClick={() => setQuantity(quantity + 1)}>
                +
              </button>
            </div>
          </div>
          <div className="action d-flex align-items-center">
            <button
              className="btn btn-danger btn-rounded mb-2"
              onClick={() => finalCartHandler(currentFood)}
            >
              <FontAwesomeIcon icon={faCartArrowDown} /> Add
            </button>
            {isSuccess && (
              <p className="ml-3 success-mgs text-success">
                <FontAwesomeIcon icon={faCheckCircle} /> Item added
              </p>
            )}
          </div>

          <div className="more-images mt-5 ">
            {currentFood.images.map((img, index) => (
              <img
                onClick={() => setSelectedImage(currentFood.images[index])}
                className={
                  currentFood.images[index] === selectedImage
                    ? "mr-4 small-img active-small-img"
                    : "mr-4 small-img"
                }
                height="150px"
                src={img}
                alt=""
              />
            ))}
          </div>
        </div>
        <div className="col-md-6">
          <img className="img-fluid" src={selectedImage} alt="" />
        </div>
      </div>
    </div>
  );
};

export default FoodDetail;
