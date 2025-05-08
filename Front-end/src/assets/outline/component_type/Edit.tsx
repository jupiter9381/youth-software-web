import { useState } from 'react';
import { IconProps } from './iconProps';

const Edit = ({
  color = '#9497A3',
  hoverColor,
  onClick,
  isHovered,
}: IconProps) => {
  const [currentColor, setCurrentColor] = useState<string>(color);

  const handleMouseEnter = () => {
    if (!isHovered && hoverColor) setCurrentColor(hoverColor);
  };

  const handleMouseLeave = () => {
    if (!isHovered && hoverColor) setCurrentColor(color);
  };

  const currentColorValue = isHovered && hoverColor ? hoverColor : currentColor;

  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      style={{ cursor: hoverColor || onClick ? 'pointer' : 'default' }}
    >
      <path
        d="M14.0514 3.73889L15.4576 2.33265C16.0678 1.72245 17.0572 1.72245 17.6674 2.33265C18.2775 2.94284 18.2775 3.93216 17.6674 4.54235L5.69349 16.5162C5.25292 16.9568 4.70953 17.2806 4.11241 17.4585L1.875 18.125L2.54148 15.8876C2.71936 15.2905 3.04321 14.7471 3.48377 14.3065L14.0514 3.73889ZM14.0514 3.73889L16.25 5.93749"
        stroke={currentColorValue}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default Edit;
