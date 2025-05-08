import { useState } from 'react';
import SvgColorChanger from '../../functions/SvgColorChanger';

interface AdditionalActionProps {
  label: string; // Text to display
  svgPath: string; // Path to the SVG icon
}

const AdditionalAction = ({ label, svgPath }: AdditionalActionProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="flex flex-col items-center gap-1 cursor-pointer group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Icon with dynamic hover color */}
      <SvgColorChanger
        svgPath={svgPath}
        strokeColor={isHovered ? '#0046FA' : '#A9ACBA'}
        width="24" // Icon size can be customized here
        height="24"
      />
      {/* Label with dynamic hover color */}
      <span
        className={`text-body-small-str transition-colors duration-300 ${isHovered ? 'text-nt-900' : 'text-nt-400'}`}
      >
        {label}
      </span>
    </div>
  );
};

export default AdditionalAction;
