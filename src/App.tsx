import { useState, useEffect } from "react";
import axios from "axios";
import AddCarForm from "./components/AddCarForm";
import CarList from "./components/CarList";
import FilterCars from "./components/FilterCars";

// Base URL for the API managing car data
const API_URL = "https://localhost:7134/api/Car";

// Define the Car type for consistent data handling
interface Car {
  id: number; // Unique identifier for each car
  make: string; // Manufacturer name
  model: string; // Car model
  registration: string; // Vehicle registration number
  price: number; // Car price in USD
}

function App() {
  // State to store all cars fetched from the API
  const [cars, setCars] = useState<Car[]>([]);
  // State for filtered cars based on user input
  const [filteredCars, setFilteredCars] = useState<Car[]>([]);

  // Fetch all cars from the API when the app initializes
  const fetchCars = async () => {
    try {
      const response = await axios.get(API_URL);
      setCars(response.data); // Populate the main car list
      setFilteredCars(response.data); // Initialize the filtered list
    } catch (error) {
      console.error("Error fetching cars:", error); // Log errors for debugging
    }
  };

  // Add a new car to the database and update state
  const addCar = async (car: Omit<Car, "id">) => {
    try {
      const response = await axios.post(API_URL, car);
      const updatedCars = [...cars, response.data]; // Append new car to state
      setCars(updatedCars); // Update car list
      setFilteredCars(updatedCars); // Refresh filtered list
    } catch (error) {
      console.error("Error adding car:", error); // Log errors for debugging
    }
  };

  // Filter cars based on user-entered keyword
  const filterCars = (keyword: string) => {
    if (!keyword) {
      setFilteredCars(cars); // Reset to show all cars if no filter
    } else {
      const lowerCaseKeyword = keyword.toLowerCase();
      setFilteredCars(
        cars.filter(
          (car) =>
            car.make.toLowerCase().includes(lowerCaseKeyword) ||
            car.model.toLowerCase().includes(lowerCaseKeyword) ||
            car.registration.toLowerCase().includes(lowerCaseKeyword)
        )
      );
    }
  };

  // Fetch cars once when the component mounts
  useEffect(() => {
    fetchCars();
  }, []);

  return (
    <div className="App">
      <h1>Car Garage</h1>
      {/* Form to add a new car */}
      <AddCarForm onAddCar={addCar} />

      {/* Input field to filter the car list */}
      <FilterCars onFilter={filterCars} />

      {/* Display the list of cars */}
      <CarList cars={filteredCars} />
    </div>
  );
}

export default App;
