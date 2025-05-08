import { forwardRef, useState } from 'react';

// assets
// import Eye from "../assets/outline/Eye.svg";
// import EyeSlash from "../assets/outline/Eye-slash.svg";
import Eye from '../assets/outline/component_type/Eye';
import EyeSlash from '../assets/outline/component_type/EyeSlash';

interface FloatingLabelInputProps {
  label: string;
  value?: string;
  onChange?: (value: string) => void;
  helperText?: string; // Optional helper text
  error?: boolean; // Error state for helper text
  disabled?: boolean; // Disabled state for input
  readonly?: boolean;
  type?: string;
  register?: any; // Register function from react-hook-form
  formField?: string; // Name for the input
  sideInputLeft?: boolean;
  sideInputRight?: boolean;
  passwordAction?: any;
  showPassword?: boolean;
  width?: string;
  flex?: number;
  borderR?: boolean;
}

// ForwardRef will accept the ref parameter correctly typed
const FloatingLabelInput = forwardRef<
  HTMLInputElement,
  FloatingLabelInputProps
>(
  (
    {
      label,
      value = '',
      onChange,
      helperText,
      error,
      disabled,
      readonly,
      type,
      register,
      formField,
      sideInputLeft,
      sideInputRight,
      passwordAction,
      showPassword,
      width,
      flex,
      borderR,
    },
    ref, // Correctly typed as HTMLInputElement
  ) => {
    const [isFocused, setIsFocused] = useState(false);

    const handleKeyDown = (e: React.KeyboardEvent) => {
      if (e.key === 'Enter') {
        e.preventDefault(); // Prevent Enter key from submitting or causing any unwanted actions
      }
    };

    return (
      <div
        className={` ${flex === 1 && 'flex-1'} relative ${width ? `w-[${width}]` : 'w-full'}`}
      >
        <label
          className={`max-w-[90%] overflow-hidden text-ellipsis
                    absolute left-3 transition-all duration-200 pointer-events-none px-1 rounded-sm
                    ${isFocused || value ? 'text-caption-reg -top-2 !bg-white' : 'top-3.5 text-body-small-str'}
                    ${disabled ? 'text-nt-300 ' : error ? 'text-sys-rd600' : 'text-nt-300 !bg-white'}
                   
                `}
        >
          {label}
        </label>
        <input
          ref={ref}
          {...(register && formField && register(formField))}
          type={
            type === 'email'
              ? 'email'
              : type === 'password'
                ? showPassword
                  ? 'text'
                  : type
                : 'text'
          }
          value={value}
          {...(onChange ? { onChange: (e) => onChange(e.target.value) } : {})}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          onKeyDown={handleKeyDown}
          disabled={disabled}
          readOnly={readonly}
          className={`w-full p-3 h-12 border text-body-small-str focus:outline-none rounded-lg
                    ${sideInputLeft ? 'border-r-0 rounded-tr-none rounded-br-none' : ''}
                    ${sideInputRight ? 'border-l-0 rounded-tl-none rounded-bl-none' : ''}
                    ${
                      disabled
                        ? 'border-nt-200 text-nt-400 cursor-not-allowed'
                        : error
                          ? 'border-sys-rd600'
                          : 'border-nt-150'
                    }
                    ${disabled ? 'focus:outline-none' : error ? 'focus:border-sys-rd600' : 'focus:border-pm-700'}
                    ${disabled ? 'text-nt-250' : 'text-nt-700'}
                    ${borderR && 'border-r-2'}

    `}
          placeholder=" "
        />
        {helperText && (
          <p
            className={`mt-1 text-caption-reg ${error ? 'text-sys-rd600' : 'text-nt-700'}`}
          >
            {helperText}
          </p>
        )}
        {type === 'password' && (
          <div
            className="absolute top-0 right-0 h-12 flex items-center p-3 cursor-pointer"
            onClick={passwordAction}
          >
            {showPassword ? (
              <Eye hoverColor="#0046FA" />
            ) : (
              <EyeSlash hoverColor="#0046FA" />
            )}
          </div>
        )}
      </div>
    );
  },
);

export default FloatingLabelInput;
// <div className='relative w-full'>
//     <label
//         className={`
//             absolute left-3 transition-all duration-200
//             ${isFocused || value ? "text-caption-reg -top-2" : "top-3.5 text-body-small-str"}
//             ${disabled ? "text-nt-300 bg-transparent" : error ? "text-sys-rd600" : "text-nt-300"}
//             bg-white px-1
//         `}
//     >
//         {label}
//     </label>
//     <input
//         type='text'
//         value={value}
//         onChange={(e) => onChange(e.target.value)}
//         onFocus={() => setIsFocused(true)}
//         onBlur={() => setIsFocused(false)}
//         disabled={disabled}
//         className={`
//             w-full p-3 h-12 border rounded-lg text-body-small-str focus:outline-none
//             ${disabled ? "border-nt-200 text-nt-400 cursor-not-allowed" : error ? "border-sys-rd600" : "border-nt-150"}
//             ${disabled ? "focus:outline-none" : error ? "focus:border-sys-rd600" : "focus:border-pm-700"}
//             ${disabled ? "text-nt-250" : "text-nt-700"}
//         `}
//     />
//     {helperText && <p className={`mt-1 text-caption-reg ${error ? "text-sys-rd600" : "text-nt-700"}`}>{helperText}</p>}
// </div>
