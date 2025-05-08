import React, { ReactNode, useState } from 'react';

interface TooltipProps {
  content: string; // The text to show in the tooltip
  children: ReactNode; // The element that the tooltip will wrap
}

const Tooltip: React.FC<TooltipProps> = ({ content, children }) => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div
      className="relative flex items-center"
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
    >
      {children}
      {isVisible && (
        <div className="absolute top-full left-1/2 transform -translate-x-1/2 mb-2 w-max bg-nt-150 text-caption-reg p-2 rounded  z-10">
          {content}
        </div>
      )}
    </div>
  );
};

export default Tooltip;
