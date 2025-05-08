import { useState } from 'react';
import { IconProps } from './iconProps';

const StepArrow = ({
  color = '#DBDEE7',
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
      className="w-[14px] h-[26px] max-[500px]:w-[10.5px] max-[500px]:h-[12px]"
      viewBox="0 0 14 26"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      style={{ cursor: hoverColor || onClick ? 'pointer' : 'default' }}
    >
      <path d="M0.5 1L12.5 13L0.5 25" stroke={currentColorValue} />
    </svg>
  );
};

export default StepArrow;
