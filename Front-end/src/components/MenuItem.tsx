import { useState } from 'react';
import { Link } from 'react-router-dom';

interface MenuItemProps {
  label: string;
  iconOutLined: string;
  iconFilled: string;
  path: string;
  active?: boolean;
  onClick?: () => void; // onClick function as a prop
  sidebarUse?: boolean;
}

const MenuItem = ({
  label,
  iconOutLined,
  iconFilled,
  path,
  active = false,
  onClick,
  sidebarUse,
}: MenuItemProps) => {
  const [isHovered, setIsHovered] = useState(false);

  const displayIcon = active || isHovered ? iconFilled : iconOutLined;

  return (
    <Link
      to={path}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick} // Trigger the onClick function passed from Sidebar
      className="cursor-pointer"
    >
      <div
        className={`flex items-center transition-all duration-300 ease-in-out py-3 px-5`}
        style={{
          gap: '12px',
          borderRadius: '8px',
        }}
      >
        <img
          src={displayIcon}
          alt={label}
          className={`transition-transform duration-30 h-6 w-6`}
        />
        {/* <span
                    className={`transition-colors duration-300
        ${active ? "text-nt-900 text-body-base-str" : isHovered ? "text-nt-900 text-body-strong" : "text-nt-500 text-body-base-reg"}
        ${sidebarUse && !active && !isHovered ? "text-nt-900" : ""}`}
                >
                    {label}
                </span> */}

        <span
          className={`transition-colors duration-300 text-nt-500 text-body-base-reg ${active && 'text-body-base-str text-nt-900'} ${!sidebarUse && isHovered ? 'text-pm-500' : ''}`}
        >
          {label}
        </span>
      </div>
    </Link>
  );
};

export default MenuItem;
