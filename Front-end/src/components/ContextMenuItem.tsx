import React, { useState } from 'react';

interface ContextMenuProps {
  label: string;
  icon?: string; // URL for the default icon
  iconHovered?: string; // URL for the hovered icon
  fontStyle?: string;
  customIcon?: React.ReactNode; // Optional: Custom icon component
  justifyPosition?: string;
  enableHoverBg?: true;
  disabled?: boolean;
  handleClick: () => void;
}

const ContextMenuItem = ({
  label,
  icon,
  iconHovered,
  fontStyle,
  customIcon,
  justifyPosition, // justify-center etc.
  enableHoverBg,
  disabled,
  handleClick,
}: ContextMenuProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`cursor-pointer flex items-center group w-full gap-2 ${
        justifyPosition && justifyPosition
      } ${icon && iconHovered ? 'h-9 py-2 px-4' : 'h-11 py-3 px-5'} ${enableHoverBg && isHovered && 'bg-gray-100'} ${disabled && 'bg-gray-100 opacity-80 !cursor-not-allowed'}`}
      onClick={handleClick}
    >
      {/* Render either a customIcon or the default icon logic */}
      {customIcon ? (
        <div className="flex items-center">
          {React.cloneElement(customIcon as React.ReactElement, {
            isHovered,
          })}
        </div>
      ) : (
        icon &&
        iconHovered && (
          <img
            className="transition-all duration-300"
            src={isHovered ? iconHovered : icon}
            alt={label}
          />
        )
      )}

      <span
        className={
          fontStyle
            ? fontStyle
            : icon && iconHovered
              ? 'text-caption-reg text-nt-500 group-hover:text-nt-900'
              : 'text-body-small-reg group-hover:text-pm-500'
        }
      >
        {label}
      </span>
    </div>
  );
};

export default ContextMenuItem;
