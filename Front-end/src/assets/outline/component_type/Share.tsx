import { useState } from 'react';
import { IconProps } from './iconProps';

const Share = ({
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
        d="M6.01434 9.08925C5.69413 8.51409 5.08 8.125 4.375 8.125C3.33947 8.125 2.5 8.96447 2.5 10C2.5 11.0355 3.33947 11.875 4.375 11.875C5.08 11.875 5.69413 11.4859 6.01434 10.9107M6.01434 9.08925C6.16447 9.35891 6.25 9.66947 6.25 10C6.25 10.3305 6.16447 10.6411 6.01434 10.9107M6.01434 9.08925L13.9857 4.66075M6.01434 10.9107L13.9857 15.3393M13.9857 15.3393C13.8355 15.6089 13.75 15.9195 13.75 16.25C13.75 17.2855 14.5895 18.125 15.625 18.125C16.6605 18.125 17.5 17.2855 17.5 16.25C17.5 15.2145 16.6605 14.375 15.625 14.375C14.92 14.375 14.3059 14.7641 13.9857 15.3393ZM13.9857 4.66075C14.3059 5.23591 14.92 5.625 15.625 5.625C16.6605 5.625 17.5 4.78553 17.5 3.75C17.5 2.71447 16.6605 1.875 15.625 1.875C14.5895 1.875 13.75 2.71447 13.75 3.75C13.75 4.08053 13.8355 4.39109 13.9857 4.66075Z"
        stroke={currentColorValue}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default Share;
