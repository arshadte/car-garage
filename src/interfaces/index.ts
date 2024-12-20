export interface Car {
    id: number; // Primary key
    make: string; // Manufacturer
    model: string; // Model name
    registration: string; // Registration number
    price: number; // Price
  }
  
  export interface AddCarFormProps {
    onAddCar: (car: Omit<Car, "id">) => void; // Function to add a car without an ID
  }
  
  export interface CarListProps {
    cars: Car[]; // Array of cars to display
  }
  