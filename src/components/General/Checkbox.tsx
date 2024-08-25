import { FC, ChangeEvent } from 'react';

interface CheckboxProps {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}
const Checkbox: FC<CheckboxProps> = ({ label, checked, onChange }) => {
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.checked);
  };
  return (
    <div className="flex items-center space-x-2.5">
      <input
        type="checkbox"
        checked={checked}
        onChange={handleChange}
        className="h-5 w-5 border-2 border-gray-300 text-blue-500 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
      />
      <label className="text-xs-display">{label}</label>
    </div>
  );
};

export default Checkbox;
