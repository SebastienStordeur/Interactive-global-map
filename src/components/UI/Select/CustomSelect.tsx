import { FC, useEffect, useRef } from "react";
import { useState } from "react";

interface CustomSelectProps {
  options: { label: string; value: string }[];
  category: string;
}

const CustomSelect: FC<CustomSelectProps> = ({ options, category }) => {
  const [isOpen, setisOpen] = useState(false);
  const [optionSelected, setOptionSelected] = useState<null | string>(null);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const toggleList = () => setisOpen(!isOpen);
  const handleSelect = (value: string) => {
    setOptionSelected(value);
    setisOpen(false);
  };

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setisOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  return (
    <div className="custom-list" ref={dropdownRef}>
      <div className="main-entry" onClick={toggleList}>
        {optionSelected ? optionSelected : "Select an option"}
      </div>
      {isOpen && (
        <ul className="options-container" aria-hidden="true">
          {options.map((option) => (
            <li key={option.value} onClick={() => handleSelect(option.value)} className="option">
              {option.value}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CustomSelect;
