import CustomSelect from "./CustomSelect";

import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import "@testing-library/jest-dom/extend-expect";

describe("CustomSelect component", () => {
  const options = [
    { label: "Option 1", value: "option1" },
    { label: "Option 2", value: "option2" },
    { label: "Option 3", value: "option3" },
  ];

  beforeEach(() => {
    render(<CustomSelect options={options} category="Test" />);
  });

  it("renders without crashing", () => {
    const selectElement = screen.getByText(/Select an option/i);
    expect(selectElement).toBeTruthy();
  });

  it("should open the list of options on click", async () => {
    const selectElement = screen.getByText(/Select an option/i);
    userEvent.click(selectElement); // Open the list

    const optionElement = await screen.findByText(/option1/i); // Waits for 'option1' to appear
    userEvent.click(optionElement); // Select the option

    // The select element should now display the selected option
    /*  expect(selectElement).toHaveTextContent("option1"); */
    /*     const selectElement = screen.getByText(/Select an option/i);

    // Initially, the list should not be visible
    expect(screen.queryByText(/option1/i)).not.toBeInTheDocument();

    // Click the select element to open the list
    userEvent.click(selectElement);

    // Now the first option should be visible
    expect(screen.getByText(/option1/i)).toBeInTheDocument();

    // Click the select element again to close the list
    userEvent.click(selectElement);

    // The first option should not be visible again
    expect(screen.queryByText(/option1/i)).not.toBeInTheDocument(); */
  });

  /*   it("should display the selected option", () => {
    render(<CustomSelect options={options} category="Test" />);
    const selectElement = screen.getByText(/Select an option/i);
    userEvent.click(selectElement);
    const optionElement = screen.getByText(/option1/i);
    userEvent.click(optionElement);
    expect(selectElement).toHaveTextContent("option1");
  }); */
});
