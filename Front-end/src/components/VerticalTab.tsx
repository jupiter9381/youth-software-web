import { useEffect, useState } from 'react';
import ChevronRight from '../assets/outline/Chevron-right.svg';

interface TabItem {
  label: string;
  dotColor: string;
}

interface VerticalTabProps {
  tabs: TabItem[];
  onClick?: (index: number) => void;
  defaultFirstTab?: boolean;
  currentIndex?: number;
}

const VerticalTab = ({
  tabs,
  defaultFirstTab,
  currentIndex,
  onClick,
}: VerticalTabProps) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const handleTabClick = (index: number) => {
    setActiveIndex(index);
    if (onClick) {
      onClick(index);
    }
  };

  useEffect(() => {
    if (defaultFirstTab) {
      setActiveIndex(0);
    }
  }, [defaultFirstTab]);

  useEffect(() => {
    if (currentIndex) {
      setActiveIndex(currentIndex);
    }
  }, [currentIndex]);

  return (
    <div className="flex flex-col gap-2 md:w-[200px] w-full">
      {tabs.map((tab, index) => (
        <div
          key={index}
          onClick={() => handleTabClick(index)}
          className={`flex items-center justify-between p-4 cursor-pointer rounded-lg md:w-[200px] w-full ${
            activeIndex === index ? 'bg-blue-50' : 'hover:bg-gray-100'
          }`}
        >
          <div className="flex items-center gap-2">
            <span
              className="w-2 h-2 rounded-full"
              style={{ backgroundColor: tab.dotColor }}
            />
            <span
              className={`${
                activeIndex === index ? ' text-nt-900' : 'text-nt-500'
              } text-caption-all-caps uppercase`}
            >
              {tab.label}
            </span>
          </div>
          <img
            src={ChevronRight}
            alt="Right"
            style={{ height: '20px', width: '20px' }}
          />
        </div>
      ))}
    </div>
  );
};

export default VerticalTab;
