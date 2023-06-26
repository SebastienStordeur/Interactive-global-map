import { FC } from "react";

interface CheckboxProps {
  label: string;
  onChange: (e: any) => void;
}

const Checkbox: FC<CheckboxProps> = ({ label, onChange }) => {
  return (
    <div className="checkbox">
      <label htmlFor={label} className="label">
        {label}
      </label>
      <input id={label} type="checkbox" onChange={onChange} />
    </div>
  );
};

export default Checkbox;
