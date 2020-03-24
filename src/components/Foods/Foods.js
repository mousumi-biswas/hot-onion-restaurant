import React, { useState, useEffect } from "react";
import "./Foods.css";
import AllFoods from "../../Data/foods.json";
import FoodItem from "../FoodItem/FoodItem";

const Foods = () => {
  const [foods, setFoods] = useState([]);
  useEffect(() => {
    setFoods(AllFoods);
  }, []);

  const [selectedFoodType, setSelectedFoodType] = useState("Breakfast");
  const selectedFoods = foods.filter(food => food.type === selectedFoodType);

  return (
    <section className="food-area">
      <div className="container">
        <nav>
          <ul className="nav justify-content-center">
            <li
              onClick={() => setSelectedFoodType("Breakfast")}
              className="nav-item"
            >
              <span
                to="breakfast"
                className={
                  selectedFoodType === "Breakfast"
                    ? "active nav-link"
                    : "nav-link"
                }
              >
                Breakfast
              </span>
            </li>
            <li
              onClick={() => setSelectedFoodType("Lunch")}
              className="nav-item"
            >
              <span
                to="lunch"
                className={
                  selectedFoodType === "Lunch" ? "active nav-link" : "nav-link"
                }
              >
                Lunch
              </span>
            </li>
            <li
              onClick={() => setSelectedFoodType("Dinner")}
              className="nav-item"
            >
              <span
                to="dinner"
                className={
                  selectedFoodType === "Dinner" ? "active nav-link" : "nav-link"
                }
              >
                Dinner
              </span>
            </li>
          </ul>
        </nav>

        <div className="row">
          {selectedFoods.map(food => (
            <FoodItem food={food}></FoodItem>
          ))}
        </div>
        <div className="text-center">
          <button disabled className="btn btn-info">
            Check Out Your Food
          </button>
        </div>
      </div>
    </section>
  );
};

export default Foods;
