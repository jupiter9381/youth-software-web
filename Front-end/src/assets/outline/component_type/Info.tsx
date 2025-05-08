import { useState } from 'react';
import { IconProps } from './iconProps';

const Info = ({ color = '#0046FA', hoverColor, onClick }: IconProps) => {
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
        fillRule="evenodd"
        clipRule="evenodd"
        d="M10 3.86364C6.61098 3.86364 3.86364 6.61098 3.86364 10C3.86364 13.389 6.61098 16.1364 10 16.1364C13.389 16.1364 16.1364 13.389 16.1364 10C16.1364 6.61098 13.389 3.86364 10 3.86364ZM2.5 10C2.5 5.85786 5.85786 2.5 10 2.5C14.1421 2.5 17.5 5.85786 17.5 10C17.5 14.1421 14.1421 17.5 10 17.5C5.85786 17.5 2.5 14.1421 2.5 10ZM10 9.31819C10.3766 9.31819 10.6818 9.62345 10.6818 10V12.7273C10.6818 13.1038 10.3766 13.4091 10 13.4091C9.62344 13.4091 9.31818 13.1038 9.31818 12.7273V10C9.31818 9.62345 9.62344 9.31819 10 9.31819ZM10 6.59091C9.62344 6.59091 9.31818 6.89617 9.31818 7.27273C9.31818 7.64928 9.62344 7.95454 10 7.95454H10.0068C10.3834 7.95454 10.6886 7.64928 10.6886 7.27273C10.6886 6.89617 10.3834 6.59091 10.0068 6.59091H10Z"
        fill={currentColor}
      />
    </svg>
  );
};

export default Info;
