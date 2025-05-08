import { useState, useRef } from 'react';
import { CSSTransition } from 'react-transition-group';
import { useNavigate } from 'react-router-dom';
import ContextMenuItem from '../ContextMenuItem';
import OutlinePlus from '../../assets/outline/component_type/OutlinePlus';

interface CreateTemplateWithMenuProps {
  templateId: string | undefined;
}

const CreateTemplateWithMenu = ({
  templateId,
}: CreateTemplateWithMenuProps) => {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const [addNewTemplateOptions, setAddNewTemplateOptions] = useState(false);
  const navigate = useNavigate();

  const handleMenuClose = () => {
    setTimeout(() => {
      setAddNewTemplateOptions(false);
    }, 300);
  };

  const toggleMenuVisibility = () => {
    if (addNewTemplateOptions) {
      handleMenuClose();
    } else {
      setAddNewTemplateOptions(true);
    }
  };

  return (
    <>
      <button
        ref={buttonRef}
        className="secondary-btn small-btn"
        onClick={toggleMenuVisibility}
      >
        <OutlinePlus color="#0046FA" />
        New
      </button>
      <CSSTransition
        in={addNewTemplateOptions}
        timeout={300}
        classNames="menu"
        unmountOnExit
        onExited={() => setAddNewTemplateOptions(false)}
      >
        <div
          ref={menuRef}
          onClick={(e) => e.stopPropagation()}
          className="absolute z-10 shadow-elevation-2 top-12 min-[486px]:right-0 max-[485px]:left-0 b-2 rounded-2xl overflow-hidden"
        >
          <div className="w-40 flex flex-col bg-white shadow-elevation-2 rounded-2xl gap-2 py-2">
            <ContextMenuItem
              label="New Request"
              handleClick={() => {
                navigate(`/home/requests/new?template=${templateId}`);
                toggleMenuVisibility();
              }}
            />
            <ContextMenuItem
              label="New Share"
              handleClick={() => {
                navigate(`/home/shares/new/single?template=${templateId}`);
                toggleMenuVisibility();
              }}
            />
          </div>
        </div>
      </CSSTransition>
    </>
  );
};

export default CreateTemplateWithMenu;
