import { useEffect, useRef, useState } from 'react';

import StatusChip from './StatusChip';
import More from '../../assets/outline/component_type/More';
import TemplateMenu from '../NavigationBlocks/TemplateMenu';
import { CSSTransition } from 'react-transition-group';

interface Field {
  order: number;
  type: string;
  name: string;
}

interface TemplateCardProps {
  name: string;
  logo: string; // URL to the logo image
  isSystem: boolean;
  fields: Field[];
  onClick: () => void;
  onRequestTemplateClick?: () => void;
  onShareTemplateClick?: () => void;
  onDuplicateTemplateClick?: () => void;
  onDeleteTemplateClick?: () => void;
  onEditTemplateClick?: () => void;
}

const TemplateCard = ({
  logo,
  name,
  isSystem,
  fields,
  onClick,
  onRequestTemplateClick,
  onShareTemplateClick,
  onDuplicateTemplateClick,
  onDeleteTemplateClick,
  onEditTemplateClick,
}: TemplateCardProps) => {
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const handleMenuClose = () => {
    setTimeout(() => {
      setIsMenuVisible(false);
    }, 300);
  };

  const toggleMenuVisibility = () => {
    if (isMenuVisible) {
      handleMenuClose();
    } else {
      setIsMenuVisible(true);
    }
  };

  const handleOutsideClick = (event: MouseEvent) => {
    if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
      handleMenuClose();
    }
  };

  useEffect(() => {
    if (isMenuVisible) {
      document.addEventListener('mousedown', handleOutsideClick);
    } else {
      document.removeEventListener('mousedown', handleOutsideClick);
    }
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [isMenuVisible]);

  return (
    <div
      className="flex flex-col  items-start bg-white p-4 pl-5 gap-2 rounded-2xl cursor-pointer"
      onClick={onClick}
    >
      <div className="relative flex w-full justify-between">
        <div className="flex items-center gap-2">
          {logo === '' || !logo ? (
            <p className="text-body-small-str md:max-w-28 lg:max-w-32 truncate">
              {name}
            </p>
          ) : (
            <img
              src={logo}
              alt={`${name} Logo`}
              className="text-body-small-str object-contain h-6 md:max-w-28 lg:max-w-40 truncate"
            />
          )}
          <StatusChip
            label={isSystem ? 'System' : 'Custom'}
            status={isSystem ? 'system' : 'custom'}
          />
        </div>
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleMenuVisibility();
          }}
        >
          <More color="#9497A3" hoverColor="#0046FA" />
        </button>
        {/* TemplateMenu */}
        <CSSTransition
          in={isMenuVisible}
          timeout={300} // Transition time matches handleMenuClose timeout
          classNames="menu"
          unmountOnExit
        >
          <div
            ref={menuRef}
            onClick={(e) => e.stopPropagation()}
            className={`absolute shadow-elevation-2 rounded-2xl top-full right-0 z-10`}
          >
            <TemplateMenu
              onRequestTemplateClick={() => {
                if (onRequestTemplateClick) {
                  onRequestTemplateClick();
                  toggleMenuVisibility();
                }
              }}
              onShareTemplateClick={() => {
                if (onShareTemplateClick) {
                  onShareTemplateClick();
                  toggleMenuVisibility();
                }
              }}
              onDuplicateTemplateClick={() => {
                if (onDuplicateTemplateClick) {
                  onDuplicateTemplateClick();
                  toggleMenuVisibility();
                }
              }}
              isSystem={isSystem}
              {...(!isSystem && {
                onDeleteTemplateClick: () => {
                  if (onDeleteTemplateClick) {
                    onDeleteTemplateClick();
                  }
                  toggleMenuVisibility();
                },
              })}
              {...(!isSystem && {
                onEditTemplateClick: () => {
                  if (onEditTemplateClick) {
                    onEditTemplateClick();
                  }
                  toggleMenuVisibility();
                },
              })}
            />
          </div>
        </CSSTransition>
      </div>

      {/* Main Content */}
      <div className=" flex flex-col md:flex-row items-start md:items-center flex-grow gap-2">
        {/* Field Labels */}
        <div className="text-caption-reg text-nt-300">
          {Object.values(fields).map((field, index) => (
            <span key={index}>
              {field.name}
              {index < Object.values(fields).length - 1 ? ', ' : ''}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TemplateCard;
