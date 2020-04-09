import React from "react";
import "./Inventory.css";
import foods from "../../Data/foods";
import features from "../../Data/features";
const AddProducts = () => {
  const dataPost = (url, foodsData) => {
    fetch(url, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(foodsData),
    })
      .then((res) => res.json())
      .then((data) => console.log(data))
      .catch((err) => console.log(err));
  };

  return (
    <div className="container py-5">
      <h2 className="header">Add Food Item</h2>
      <button
        onClick={() => dataPost("http://localhost:4200/addFood", foods)}
        className="btn btn-success mr-2"
      >
        Add products
      </button>
      <button
        onClick={() => dataPost("http://localhost:4200/addFeatures", features)}
        className="btn btn-success"
      >
        Add Features
      </button>
    </div>
  );
};

export default AddProducts;
