import { useState } from 'react';

import ChevronDown from '../assets/outline/Chevron-down.svg';
import ChevronUp from '../assets/outline/Chevron-up.svg';

import ContextMenuItem from './ContextMenuItem';

interface MenuItem {
  label: string;
  icon?: string;
  iconHovered?: string;
  action: () => void;
}

interface DropupMenuProps {
  items: MenuItem[];
  mainLabel: string;
  variant?: 'outlined' | 'standard';
}

const AccountDropdown = (props: DropupMenuProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen((prev) => !prev);

  return (
    <div
      className={`flex flex-col relative w-full ${isOpen ? 'overflow-visible' : 'overflow-hidden'}`}
    >
      <div
        className={`relative inline-block text-left w-full transition ease-in-out duration-300  bg-white z-10 ${
          isOpen
            ? 'rounded-b-lg border border-nt-150 border-t-0'
            : 'rounded-lg border border-white'
        }`}
      >
        <div
          className={`flex items-center justify-between cursor-pointer transition ease-in-out duration-300 py-3 px-5 ${isOpen ? 'rounded-b-lg bg-white ' : 'rounded-lg'}`}
          onClick={toggleMenu}
        >
          <span className="text-body-small-reg text-gray-800">
            {props.mainLabel}
          </span>
          <img src={isOpen ? ChevronDown : ChevronUp} />
        </div>
      </div>
      <div
        className={`absolute z-0 w-full bg-white border border-nt-150 rounded-t-lg overflow-hidden transition-all duration-900 ${
          isOpen ? 'bottom-full z-100' : 'translate-y-full bottom-full z-0'
        }`}
      >
        <ul className="flex flex-col text-gray-800">
          {props.items.map((item, index) => (
            <li
              key={index}
              className="flex items-center gap-2 hover:bg-gray-100 cursor-pointer"
            >
              <ContextMenuItem
                label={item.label}
                icon={item.icon}
                iconHovered={item.iconHovered}
                fontStyle={
                  item.icon &&
                  'text-body-small-reg text-nt-500 group-hover:text-blue-600'
                }
                handleClick={() => {
                  setIsOpen(false);
                  item.action();
                }}
              />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AccountDropdown;
