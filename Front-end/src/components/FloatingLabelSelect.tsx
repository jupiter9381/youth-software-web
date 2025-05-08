import { useEffect, useState } from 'react';

interface FloatingLabelSelectProps {
  label: string;
  options: optionType[];
  value: string;
  onChange: (value: string) => void;
  error?: boolean;
  disabled?: boolean;
  searchable?: boolean;
  sideSelect?: boolean;
  width?: string;
  helperText?: string; // Optional helper text
  flex?: number;
  formSelect?: boolean; //To use it in formSelect and pass only the value and not the label
}

export interface optionType {
  id: number;
  label: string;
  value?: string;
}

import ChevronDown from '../assets/outline/Chevron-down.svg';
import ChevronUp from '../assets/outline/Chevron-up.svg';
import Search from '../assets/outline/Search.svg';

const FloatingLabelSelect = ({
  label,
  options,
  value,
  onChange,
  error,
  disabled,
  searchable,
  sideSelect,
  width,
  helperText,
  flex,
  formSelect,
}: FloatingLabelSelectProps) => {
  // const [isFocused, setIsFocused] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [filteredOptions, setFilteredOptions] = useState(options);

  useEffect(() => {
    if (search.trim() === '') {
      setFilteredOptions(options);
      setIsLoading(false);
    } else {
      setIsLoading(true);
      const timeout = setTimeout(() => {
        setFilteredOptions(
          options.filter((option) =>
            option.label.toLowerCase().includes(search.toLowerCase()),
          ),
        );
        setIsLoading(false);
      }, 300);
      return () => clearTimeout(timeout);
    }
  }, [search, options]);

  // Handler for changing value and closing dropdown
  const handleSelect = (option: string) => {
    onChange(option);
    setIsOpen(false);
    setSearch('');
  };

  return (
    <div
      className={`${flex === 1 && 'flex-1'} relative ${width ? `w-[${width}]` : 'w-full'} ${
        disabled ? 'cursor-not-allowed' : 'cursor-pointer'
      } `}
    >
      {!disabled && (
        <label
          className={`absolute left-3 text-caption-reg -top-2 transition-all duration-200 ${
            disabled
              ? 'text-nt-300 bg-transparent'
              : error
                ? 'text-sys-rd600'
                : 'text-nt-300'
          } bg-white px-1`}
        >
          {label}
        </label>
      )}

      <div
        className={`${
          width ? `w-[${width}]` : 'w-full'
        }  p-3 h-12  text-body-small-str border rounded-t-lg focus:outline-none 
                ${
                  disabled
                    ? 'border-nt-200 bg-nt-100 text-nt-400 cursor-not-allowed '
                    : error
                      ? 'border-sys-rd600'
                      : 'border-nt-150'
                } 
                ${disabled ? 'focus:outline-none' : error ? 'focus:border-sys-rd600' : 'focus:border-pm-700'}
                ${disabled ? 'text-nt-250' : 'text-nt-700'}
                ${isOpen ? 'rounded-b-none' : 'rounded-lg'}
                ${sideSelect && 'rounded-tr-none rounded-br-none'}
                flex items-center justify-between 
            `}
        onClick={() => !disabled && setIsOpen(!isOpen)}
        // onFocus={() => setIsFocused(true)}
        // onBlur={() => setIsFocused(false)}
        tabIndex={0}
      >
        <span>{value || 'Select'}</span>
        <span className="text-nt-500">
          {isOpen ? (
            <img src={ChevronUp} alt="Up" />
          ) : (
            <img src={ChevronDown} alt="Down" />
          )}
        </span>
      </div>
      {helperText && (
        <p
          className={`mt-1 text-caption-reg ${error ? 'text-sys-rd600' : 'text-nt-700'}`}
        >
          {helperText}
        </p>
      )}

      {isOpen && (
        <div
          className={`absolute text-body-small-reg top-full left-0 w-full border border-nt-150 rounded-b-lg bg-white shadow-lg z-10 ${
            helperText && '-mt-[1.3rem]'
          }`}
        >
          {searchable && (
            <div className="px-5 py-3 flex items-center gap-2">
              <img src={Search} alt="Up" />
              <input
                type="text"
                placeholder="Search"
                className="outline-none border-none w-full text-body-small-reg"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          )}

          {isLoading ? (
            <div className="p-3 flex justify-center items-center">
              <div role="status">
                <svg
                  aria-hidden="true"
                  className="inline w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                  viewBox="0 0 100 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="currentColor"
                  />
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="currentFill"
                  />
                </svg>
                <span className="sr-only">Loading...</span>
              </div>
            </div>
          ) : (
            <ul className="max-h-60 overflow-y-auto">
              {filteredOptions.map((option) => (
                <li
                  key={option.id}
                  className="px-5 py-2 cursor-pointer hover:bg-pm-50 text-nt-700"
                  onClick={() => {
                    const value = formSelect
                      ? (option.value ?? '')
                      : (option.label ?? ''); // Safe access with fallback
                    handleSelect(value);
                  }}
                >
                  {option.label}
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
};

export default FloatingLabelSelect;
