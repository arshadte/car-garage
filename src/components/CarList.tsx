// CarList.tsx
import React from "react";
import { CarListProps } from "../interfaces";

// Component to display a formatted list of cars
const CarList: React.FC<CarListProps> = ({ cars }) => {
  return (
    <ul className="car-list">
      {cars.map((car) => (
        <li key={car.id} className="car-item">
          <div className="car-line">
            <span>{car.make}</span> <span>{car.model}</span>
          </div>
          <div className="registration">{car.registration}</div>
          <div className="price">£{car.price.toFixed(2)}</div>
        </li>
      ))}
    </ul>
  );
};

export default CarList;
