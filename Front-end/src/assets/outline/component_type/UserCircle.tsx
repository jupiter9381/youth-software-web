import { useState } from 'react';
import { IconProps } from './iconProps';

const UserCircle = ({
  color = '#0046FA',
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
        d="M14.9846 15.604C13.8434 14.0979 12.0353 13.125 10 13.125C7.96467 13.125 6.15658 14.0979 5.01539 15.604M14.9846 15.604C16.5279 14.2303 17.5 12.2287 17.5 10C17.5 5.85786 14.1421 2.5 10 2.5C5.85786 2.5 2.5 5.85786 2.5 10C2.5 12.2287 3.47208 14.2303 5.01539 15.604M14.9846 15.604C13.6596 16.7834 11.9135 17.5 10 17.5C8.08653 17.5 6.34042 16.7834 5.01539 15.604M12.5 8.125C12.5 9.50571 11.3807 10.625 10 10.625C8.61929 10.625 7.5 9.50571 7.5 8.125C7.5 6.74429 8.61929 5.625 10 5.625C11.3807 5.625 12.5 6.74429 12.5 8.125Z"
        stroke={currentColorValue}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default UserCircle;
