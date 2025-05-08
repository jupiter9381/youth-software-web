import { useState } from 'react';

interface ToggleProps {
  label?: string;
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  disabled?: boolean;
}

const Toggle = ({
  label,
  checked = false,
  onChange,
  disabled = false,
}: ToggleProps) => {
  const [isFocused, setIsFocused] = useState(false);

  const handleToggleChange = () => {
    if (!disabled && onChange) {
      onChange(!checked);
    }
  };

  return (
    <label
      className={`flex items-center gap-2 ${disabled ? 'text-nt-300 cursor-not-allowed' : 'text-nt-700 cursor-pointer'}`}
    >
      <div
        onClick={handleToggleChange}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        className={`relative w-8 h-5 rounded-full flex items-center transition-all duration-300 border 
        ${checked && !disabled ? 'border-pm-500 bg-pm-500' : disabled ? 'border-nt-150 bg-nt-100' : 'border-nt-200 bg-nt-100'} 
        ${isFocused && !disabled ? 'border-pm-500 shadow-[0_0_6px_rgba(0,70,250,0.6)]' : ''}`}
        tabIndex={0} // Allows the div to be focusable
      >
        <div
          className={`absolute m-1 w-3 h-3 shadow-none rounded-full transition-transform duration-300 transform 
                        ${disabled ? 'bg-nt-200' : 'bg-nt-300 '} ${checked && !disabled ? 'translate-x-3 bg-nt-white' : 'translate-x-0'} ${checked && disabled ? 'translate-x-3' : 'translate-x-0'}
        `}
        />
      </div>

      {label && (
        <span
          className={`text-body-small-reg transition-all duration-300 ${checked ? 'text-body-small-str' : ''}`}
        >
          {label}
        </span>
      )}
    </label>
  );
};

interface ToggleOption {
  label: string;
  value: string;
  disabled?: boolean;
}

interface ToggleGroupProps {
  options: ToggleOption[];
  values: string[];
  onChange: (updatedValues: string[]) => void;
}

const ToggleGroup = ({ options, values, onChange }: ToggleGroupProps) => {
  const handleToggleChange = (value: string) => {
    const updatedValues = values.includes(value)
      ? values.filter((v) => v !== value) // Remove value if already selected
      : [...values, value]; // Add value if not selected
    onChange(updatedValues);
  };

  return (
    <div className="flex flex-col gap-4">
      {options.map((option) => (
        <Toggle
          key={option.value}
          label={option.label}
          checked={values.includes(option.value)}
          onChange={() => handleToggleChange(option.value)}
          disabled={option.disabled}
        />
      ))}
    </div>
  );
};

export default ToggleGroup;
