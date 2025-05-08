import { useState } from 'react';
import { IconProps } from './iconProps';

const Clock = ({
  color = '#9497A3',
  hoverColor,
  height = '16',
  width = '16',
  onClick,
}: IconProps) => {
  const [currentColor, setCurrentColor] = useState<string>(color);

  const handleMouseEnter = () => {
    if (hoverColor) setCurrentColor(hoverColor);
  };

  const handleMouseLeave = () => {
    if (hoverColor) setCurrentColor(color);
  };

  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      style={{ cursor: hoverColor || onClick ? 'pointer' : 'default' }}
    >
      <path
        d="M8 4V8H11M14 8C14 11.3137 11.3137 14 8 14C4.68629 14 2 11.3137 2 8C2 4.68629 4.68629 2 8 2C11.3137 2 14 4.68629 14 8Z"
        stroke={currentColor}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default Clock;
