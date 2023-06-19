import CustomSelect from "./CustomSelect";

import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

describe("CustomSelect component", () => {
  const options = [
    { label: "Option 1", value: "option1" },
    { label: "Option 2", value: "option2" },
    { label: "Option 3", value: "option3" },
  ];

  it("renders without crashing", () => {
    render(<CustomSelect options={options} category="Test" />);
    const selectElement = screen.getByText(/Select an option/i);
    expect(selectElement).toBeTruthy();
  });
});
