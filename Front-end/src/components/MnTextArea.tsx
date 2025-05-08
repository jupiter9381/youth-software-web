import { useState } from 'react';

interface MnTextAreaProps {
  label: string;
  value: string;
  onChange?: (value: string) => void;
  error?: boolean;
  errorMessage?: string;
  disabled?: boolean;
  height?: string;
}

const MnTextArea = ({
  label,
  value,
  onChange,
  error,
  errorMessage,
  disabled,
  height,
}: MnTextAreaProps) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className="relative w-full ">
      <label
        className={`
                    absolute left-3 transition-all duration-200
                    ${
                      isFocused || value
                        ? 'text-caption-reg -top-2'
                        : 'top-3.5 text-body-small-str'
                    }
                    ${
                      disabled
                        ? 'text-nt-300'
                        : error
                          ? 'text-sys-rd600'
                          : 'text-nt-300'
                    }
                    bg-white px-1
                `}
      >
        {label}
      </label>
      <textarea
        value={value}
        {...(onChange ? { onChange: (e) => onChange(e.target.value) } : {})}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        disabled={disabled}
        className={`
                    w-full p-4 border rounded-lg resize-none text-body-small-str focus:outline-none
                    ${
                      disabled
                        ? 'border-nt-200 text-nt-400 cursor-not-allowed'
                        : error
                          ? 'border-sys-rd600'
                          : 'border-nt-150'
                    }
                    ${
                      disabled
                        ? 'focus:outline-none'
                        : error
                          ? 'focus:border-sys-rd600'
                          : 'focus:border-pm-500'
                    }
                    ${disabled ? 'text-nt-250' : 'text-nt-700'}
                `}
        placeholder=" "
        style={{
          height: height ?? '10rem',
        }}
      />
      {error && (
        <p className={`mt-1 text-caption-reg text-sys-rd600`}>{errorMessage}</p>
      )}
    </div>
  );
};

export default MnTextArea;
