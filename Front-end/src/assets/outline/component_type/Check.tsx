import { useState } from 'react';
import { IconProps } from './iconProps';

const Check = ({ color = '#9497A3', hoverColor, onClick }: IconProps) => {
  const [currentColor, setCurrentColor] = useState<string>(color);

  const handleMouseEnter = () => {
    if (hoverColor) setCurrentColor(hoverColor);
  };

  const handleMouseLeave = () => {
    if (hoverColor) setCurrentColor(color);
  };

  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      style={{ cursor: hoverColor || onClick ? 'pointer' : 'default' }}
    >
      <path
        d="M9.29448 18.6396L3 12.3451L4.57362 10.7715L9.29448 15.4924L19.4264 5.36047L21 6.93409L9.29448 18.6396Z"
        fill={currentColor}
      />
    </svg>
  );
};

export default Check;
