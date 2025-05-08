import { useState } from 'react';

interface Tab {
  label: string;
  count?: number;
}

interface TabsProps {
  tabs: Tab[];
  activeTab: string;
  onTabClick: (label: string) => void;
}

const Tabs = ({ tabs, activeTab, onTabClick }: TabsProps) => {
  const [isSelectFocused, setIsSelectFocused] = useState(false);
  return (
    <>
      {/* Mobile Select Dropdown */}
      <div className="sm:hidden relative w-[150px]">
        <label htmlFor="tabs" className="sr-only">
          Select a tab
        </label>
        <select
          id="tabs"
          className="bg-white border border-nt-150 text-nt-400 text-sm rounded-2xl focus:ring-pm-500 focus:border-pm-500 block w-full py-2 pl-5 pr-4 appearance-none"
          value={activeTab}
          onChange={(e) => onTabClick(e.target.value)}
          // Set isSelectFocused = true on focus, false on blur
          onFocus={() => setIsSelectFocused(true)}
          onBlur={() => setIsSelectFocused(false)}
        >
          {tabs.map((tab) => (
            <option key={tab.label} value={tab.label}>
              <div className="flex flex-row gap-2 ">
                <p className="text-body-small-str text-nt-900">{tab.label} </p>
              </div>
              {tab.count !== undefined ? `(${tab.count})` : ''}
            </option>
          ))}
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2">
          <svg
            className={`w-4 h-4 text-nt-900 transition-transform duration-200 ${
              isSelectFocused ? 'rotate-180' : ''
            }`}
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </div>
      </div>

      {/* Desktop Tabs */}
      <ul className="hidden sm:flex text-center text-nt-500 bg-nt-50 rounded-[30px] border border-nt-150 divide-x divide-nt-150">
        {tabs.map((tab, index) => {
          const isActive = activeTab === tab.label;

          return (
            <li key={tab.label}>
              <button
                onClick={() => onTabClick(tab.label)}
                className={`
                                    py-2 px-4 ${isActive && 'bg-white '}
                                    ${index === 0 ? 'rounded-bl-[30px] rounded-tl-[30px] pl-5 ' : 'px-4'}
                                    ${index === tabs.length - 1 && 'rounded-br-[30px] rounded-tr-[30px]'}
                                    w-full
                                `}
              >
                <span
                  className={`${
                    isActive
                      ? 'text-nt-700 text-body-small-str'
                      : 'text-body-small-reg'
                  }`}
                >
                  {tab.label}
                </span>
                {tab.count !== undefined && (
                  <>
                    <span className="mx-1 h-3 border-l border-nt-150"></span>
                    <span
                      className={`${isActive && 'text-pm-500'} text-caption-str`}
                    >
                      {tab.count}
                    </span>
                  </>
                )}
              </button>
            </li>
          );
        })}
      </ul>
    </>
  );
};

export default Tabs;
