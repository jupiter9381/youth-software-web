import { ChangeEvent } from 'react';

interface CheckboxProps {
  label: any;
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  disabled?: boolean;
  alignItems?: string;
}

const Checkbox = ({
  label,
  checked = false,
  onChange,
  disabled = false,
  alignItems,
}: CheckboxProps) => {
  // const [isFocused, setIsFocused] = useState(false);

  const handleCheckboxChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!disabled && onChange) {
      onChange(e.target.checked);
    }
  };

  return (
    <label
      className={`flex items-${alignItems ? alignItems : 'center'} gap-2 ${disabled ? 'cursor-not-allowed text-nt-300' : 'cursor-pointer text-nt-700'}`}
    >
      <div
        className={`relative flex items-center justify-center w-5 min-w-[20px] h-5 min-h-[20px] rounded border transition-all duration-300 ${
          checked
            ? disabled
              ? 'bg-nt-150 border-nt-200 '
              : 'border-pm-500 shadow-[0_0_6px_rgba(0,70,250,0.6)]'
            : disabled
              ? 'bg-nt-100 border-nt-200'
              : 'border-nt-200 '
        } `}
      >
        <input
          type="checkbox"
          checked={checked}
          onChange={handleCheckboxChange}
          // onFocus={() => setIsFocused(true)}
          // onBlur={() => setIsFocused(false)}
          disabled={disabled}
          className="absolute opacity-0 w-full h-full cursor-pointer"
        />
        {checked && (
          <svg
            width="12"
            height="9"
            viewBox="0 0 12 9"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="transition-all duration-300"
          >
            <path
              d="M1.58008 4.20717L4.93541 7.5625L10.8104 1.6875"
              stroke={disabled ? '#D3D3D3' : '#0046FA'}
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        )}
      </div>
      <span
        className={`text-body-small-reg transition-all duration-300 ${checked ? 'text-body-small-str' : ''}`}
      >
        {label}
      </span>
    </label>
  );
};

export default Checkbox;
