import { ReactNode } from 'react';

// component
import ShieldCircle from '../assets/filled/ShieldCircle';

// assets
import X from '../assets/outline/X.svg';
import { DestructionTimeProps } from '../pages/Requests/pages/NewRequest';

interface WarningMessageProps {
  icon?: ReactNode;
  message?: string | ReactNode;
  onCloseAction?: () => void;
  destructionTime?: DestructionTimeProps;
  editDestructionTime?: boolean;
  openEditDestructionTime?: () => void;
}

const WarningMessage = ({
  icon,
  message,
  onCloseAction,
  destructionTime,
  editDestructionTime,
  openEditDestructionTime,
}: WarningMessageProps) => {
  return (
    <div className="w-full flex items-center py-5 px-6 rounded-2xl gap-2.5 bg-sys-rd50">
      <div className="h-8 w-8 flex items-center ">
        {icon ? icon : <ShieldCircle />}
      </div>

      <div className="flex-grow">
        {message && <span className="text-body-small-str">{message}</span>}
        {destructionTime && (
          <p className="text-body-small-str">
            For your security, this data will be automatically destroyed within{' '}
            <span className="text-body-small-str text-sys-rd600">
              {destructionTime?.timeLimit}
            </span>{' '}
            and/or after{' '}
            <span className="text-body-small-str text-sys-rd600">
              {destructionTime?.viewsLimit} view/s
            </span>
            .
          </p>
        )}
      </div>

      {onCloseAction && (
        <div>
          <div
            className="h-6 w-6 items-center justify-center cursor-pointer"
            onClick={onCloseAction}
          >
            <img src={X} className="h-full w-full" draggable="false" />
          </div>
        </div>
      )}
      {editDestructionTime && (
        <>
          <button
            className="inline-block w-auto flex-none secondary-btn small-btn"
            onClick={openEditDestructionTime}
          >
            Edit destruction settings
          </button>
        </>
      )}
    </div>
  );
};

export default WarningMessage;
