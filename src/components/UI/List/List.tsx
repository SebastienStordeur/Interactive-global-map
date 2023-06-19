import { FC, useEffect, useRef } from "react";
import { useState } from "react";

const List: FC = () => {
  const [isOpen, setisOpen] = useState(false);
  const [optionSelected, setOptionSelected] = useState<null | string>(null);

  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const options = [
    { label: "Option 1", value: "option1" },
    { label: "Option 2", value: "option2" },
    { label: "Option 3", value: "option3" },
  ];

  const toggleList = () => setisOpen(!isOpen);
  const handleSelect = (value: string) => {
    setOptionSelected(value);
    toggleList();
  };

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        toggleList();
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  return (
    <div className="custom-list" ref={dropdownRef}>
      <div onClick={toggleList}>{optionSelected ? optionSelected : "Select an option"}</div>
      {isOpen && (
        <div>
          {options.map((option) => (
            <div key={option.value} onClick={() => handleSelect(option.value)} className="option">
              {option.value}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default List;
