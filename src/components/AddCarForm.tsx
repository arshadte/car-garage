import React, { useState } from "react";
import { AddCarFormProps } from "../interfaces";

const AddCarForm: React.FC<AddCarFormProps> = ({ onAddCar }) => {
  const [formData, setFormData] = useState({ make: "", model: "", registration: "", price: 0 });
  const [errors, setErrors] = useState<{ [key: string]: string }>({}); // To track validation errors

  // Validate form inputs before submission
  const validate = (): boolean => {
    const newErrors: { [key: string]: string } = {};
    if (!formData.make) newErrors.make = "Make is required.";
    if (!formData.model) newErrors.model = "Model is required.";
    if (!formData.registration) newErrors.registration = "Registration is required.";
    if (!formData.price || isNaN(formData.price) || formData.price <= 0)
      newErrors.price = "Price must be a positive number.";

    setErrors(newErrors); // Update errors state
    return Object.keys(newErrors).length === 0; // Return true if no errors
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); // Prevent default form behavior

    if (validate()) {
      onAddCar(formData); // Pass valid data to the parent component
      setFormData({ make: "", model: "", registration: "", price: 0 }); // Reset form fields
      setErrors({}); // Clear previous errors
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === "price" ? Number(value) : value,
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="make">Make:</label>
        <input
          id="make"
          type="text"
          name="make"
          value={formData.make}
          onChange={handleChange}
        />
        {errors.make && <span>{errors.make}</span>}

        <label htmlFor="model">Model:</label>
        <input
          id="model"
          type="text"
          name="model"
          value={formData.model}
          onChange={handleChange}
        />
        {errors.model && <span>{errors.model}</span>}
      </div>

      <div>
        <label htmlFor="registration">Registration:</label>
        <input
          id="registration"
          type="text"
          name="registration"
          value={formData.registration}
          onChange={handleChange}
        />
        {errors.registration && <span>{errors.registration}</span>}

        <label htmlFor="price">Price:</label>
        <input
          id="price"
          type="number"
          name="price"
          value={formData.price === 0 ? "" : formData.price}
          onChange={handleChange}
        />
        {errors.price && <span>{errors.price}</span>}
      </div>

      <button type="submit">Submit Car</button>
    </form>
  );
};

export default AddCarForm;
