import { FC } from "react";

interface CheckboxProps {
  label: string;
  onChange: (e: any) => void;
  value: string;
}

const Checkbox: FC<CheckboxProps> = ({ label, onChange, value }) => {
  return (
    <div className="checkbox">
      <label htmlFor={label} className="label">
        {label}
      </label>
      <input id={label} value={value} type="checkbox" onChange={onChange} />
    </div>
  );
};

export default Checkbox;
