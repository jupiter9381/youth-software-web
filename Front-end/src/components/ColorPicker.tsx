import { useRef, useEffect, useState } from 'react';
import { ChromePicker } from 'react-color';

interface ColorPickerProps {
  color: string;
  onColorChange: (color: string) => void;
  disabled?: boolean; // Optional disabled prop
  label?: string;
  error?: boolean;
}

const ColorPicker = ({
  color,
  onColorChange,
  disabled = false,
  label,
  error,
}: ColorPickerProps) => {
  const [isPickerOpen, setIsPickerOpen] = useState(false); // Internal state for toggling the picker
  const pickerRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = (e: MouseEvent) => {
    if (pickerRef.current && !pickerRef.current.contains(e.target as Node)) {
      setIsPickerOpen(false); // Close picker when clicking outside
    }
  };

  useEffect(() => {
    if (isPickerOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isPickerOpen]);

  const [isFocused, setIsFocused] = useState(false);

  const togglePicker = () => {
    setIsPickerOpen((prevState) => !prevState); // Toggle the picker open/close state
  };

  return (
    <div className="relative w-full">
      {/* Label */}
      <label
        className={`
                    absolute left-3 transition-all duration-200 pointer-events-none px-1 rounded-sm
                    ${isFocused || color ? 'text-caption-reg -top-2 bg-white' : 'top-3.5 text-body-small-str'}
                    ${disabled ? 'text-nt-300 ' : error ? 'text-sys-rd600' : 'text-nt-300 bg-white'}
                `}
      >
        {label}
      </label>

      <div
        ref={pickerRef}
        className={`flex items-center border rounded-lg w-full h-12 
                    hover:border-pm-500
                    focus:border-pm-500
                    ${disabled ? 'bg-nt-100 text-nt-300 cursor-not-allowed' : ''}
                `}
      >
        <input
          type="text"
          value={color}
          onChange={(e) => onColorChange(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          disabled={disabled}
          placeholder={label ? label : 'Choose a color'}
          className={`w-full px-3 text-body-small-str outline-none
                        ${disabled ? 'cursor-not-allowed' : 'text-nt-700'}
                    `}
        />

        <button
          className={`h-full border-l px-4 py-2 transition-colors 
                        ${disabled ? 'border-nt-200 text-nt-300 cursor-not-allowed' : 'border-nt-150 text-nt-500 hover:text-red-600'}
                    `}
          aria-label="Color picker toggle"
          onClick={togglePicker}
          disabled={disabled}
        >
          <div
            className="h-6 w-6 rounded"
            style={{ backgroundColor: color || '#FFFFFF' }}
          />{' '}
          {/* Default color if empty */}
        </button>

        {isPickerOpen && (
          <div
            className="absolute right-10 top-12 mt-2 z-50 bg-white shadow-elevation-3 rounded-lg"
            style={{ width: '188px' }}
          >
            <ChromePicker
              color={color || '#FFFFFF'}
              onChange={(updatedColor) => onColorChange(updatedColor.hex)}
              disableAlpha
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default ColorPicker;
