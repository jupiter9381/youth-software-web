// import { useState } from "react";

interface RadioButtonProps {
  label: string;
  selected?: boolean;
  onChange?: () => void;
  disabled?: boolean;
}

const RadioButton = ({
  label,
  selected = false,
  onChange,
  disabled = false,
}: RadioButtonProps) => {
  // const [isFocused, setIsFocused] = useState(false);

  return (
    <label
      className={`flex items-center gap-2 ${disabled ? 'cursor-not-allowed text-nt-300' : 'cursor-pointer text-nt-700'}`}
    >
      <div
        className={`relative flex items-center justify-center w-5 h-5 rounded-full border transition-all duration-300 ${
          selected
            ? disabled
              ? 'bg-nt-150 border-nt-200'
              : 'border-pm-500 shadow-[0_0_6px_rgba(0,70,250,0.6)]'
            : disabled
              ? 'bg-nt-100 border-nt-200'
              : 'border-nt-200'
        }`}
      >
        <input
          type="radio"
          checked={selected}
          onChange={onChange}
          // onFocus={() => setIsFocused(true)}
          // onBlur={() => setIsFocused(false)}
          disabled={disabled}
          className={`absolute opacity-0 w-full h-full ${disabled ? 'cursor-not-allowed' : 'cursor-pointer'}`}
        />
        {selected && (
          <div
            className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${disabled ? 'bg-nt-200' : 'bg-pm-500'}`}
          />
        )}
      </div>
      <span
        className={`text-body-small-reg transition-all duration-300 ${selected ? 'text-body-small-str' : ''}`}
      >
        {label}
      </span>
    </label>
  );
};

interface RadioGroupProps {
  options: { label: string; value: string; disabled?: boolean }[];
  value: string;
  onChange: (value: string) => void;
}

const RadioGroup = ({ options, value, onChange }: RadioGroupProps) => {
  return (
    <div className="flex flex-col gap-4">
      {options.map((option) => (
        <RadioButton
          key={option.value}
          label={option.label}
          selected={value === option.value}
          onChange={() => onChange(option.value)}
          disabled={option.disabled}
        />
      ))}
    </div>
  );
};

export default RadioGroup;
