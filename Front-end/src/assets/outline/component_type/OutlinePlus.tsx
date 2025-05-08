import { useState } from 'react';

interface OutlinePlusProps {
  color?: string;
  hoverColor?: string;
}

const OutlinePlus: React.FC<OutlinePlusProps> = ({
  color = '#9497A3',
  hoverColor,
}) => {
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
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{ cursor: hoverColor ? 'pointer' : 'default' }} // Changes cursor based on hover availability
    >
      <path
        d="M10 3.75V16.25M16.25 10L3.75 10"
        stroke={currentColor}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default OutlinePlus;
