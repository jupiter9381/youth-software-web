import { useState } from 'react';
import { IconProps } from './iconProps';

const HamburgerMenu = ({
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
      viewBox="0 0 512 512"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      style={{ cursor: hoverColor || onClick ? 'pointer' : 'default' }}
    >
      <g fill={currentColor}>
        <path d="M483.556 227.556H28.444C12.736 227.556 0 240.292 0 256s12.736 28.444 28.444 28.444h455.111c15.709 0 28.445-12.736 28.445-28.444s-12.736-28.444-28.444-28.444Z" />
        <path d="M483.556 28.444H28.444C12.736 28.444 0 41.181 0 56.889s12.736 28.444 28.444 28.444h455.111c15.708 0 28.444-12.736 28.444-28.444S499.264 28.444 483.556 28.444Z" />
        <path d="M483.556 426.667H28.444C12.736 426.667 0 439.403 0 455.111s12.736 28.444 28.444 28.444h455.111c15.708 0 28.444-12.736 28.444-28.444s-12.735-28.444-28.443-28.444Z" />
      </g>
    </svg>
  );
};

export default HamburgerMenu;
