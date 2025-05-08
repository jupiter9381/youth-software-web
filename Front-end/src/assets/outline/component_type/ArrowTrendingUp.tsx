import { useState } from 'react';
import { IconProps } from './iconProps';

const ArrowTrendingUp = ({
  color = '#9497A3',
  hoverColor,
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
        d="M1.875 15L7.5 9.37502L11.0887 12.9637C12.0918 10.9901 13.7535 9.33527 15.9335 8.36464L18.2174 7.3478M18.2174 7.3478L13.2664 5.44727M18.2174 7.3478L16.3169 12.2989"
        stroke={currentColor}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default ArrowTrendingUp;
