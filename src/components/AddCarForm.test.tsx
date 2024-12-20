import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import AddCarForm from "../components/AddCarForm";

describe("AddCarForm Component", () => {
  test("renders all form fields and the submit button", () => {
    render(<AddCarForm onAddCar={jest.fn()} />);

    expect(screen.getByLabelText(/make/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/model/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/registration/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/price/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /submit car/i })).toBeInTheDocument();
  });

  test("displays validation errors for empty inputs", async () => {
    render(<AddCarForm onAddCar={jest.fn()} />);

    fireEvent.click(screen.getByRole("button", { name: /submit car/i }));

    expect(await screen.findByText(/make is required/i)).toBeInTheDocument();
    expect(screen.getByText(/model is required/i)).toBeInTheDocument();
    expect(screen.getByText(/registration is required/i)).toBeInTheDocument();
    expect(screen.getByText(/price must be a positive number/i)).toBeInTheDocument();
  });

  test("calls onAddCar with correct data when form is valid", () => {
    const onAddCarMock = jest.fn();
    render(<AddCarForm onAddCar={onAddCarMock} />);

    fireEvent.change(screen.getByLabelText(/make/i), { target: { value: "Toyota" } });
    fireEvent.change(screen.getByLabelText(/model/i), { target: { value: "Corolla" } });
    fireEvent.change(screen.getByLabelText(/registration/i), { target: { value: "ABC123" } });
    fireEvent.change(screen.getByLabelText(/price/i), { target: { value: 15000 } });

    fireEvent.click(screen.getByRole("button", { name: /submit car/i }));

    expect(onAddCarMock).toHaveBeenCalledWith({
      make: "Toyota",
      model: "Corolla",
      registration: "ABC123",
      price: 15000,
    });

    expect(screen.getByLabelText(/make/i)).toHaveValue("");
    expect(screen.getByLabelText(/model/i)).toHaveValue("");
    expect(screen.getByLabelText(/registration/i)).toHaveValue("");
    expect(screen.getByLabelText(/price/i)).toHaveValue(null);
  });
});
