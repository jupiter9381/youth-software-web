import ContextMenuItem from '../ContextMenuItem';

import UserCircleIcon from '../../assets/outline/User-circle.svg';
import UserCircleHovIcon from '../../assets/outline/hovered/User-circleHover.svg';
import LogOutIcon from '../../assets/outline/Arrow-right-on-rectangle.svg';
import LogOutHovIcon from '../../assets/outline/hovered/Arrow-right-on-rectangleHover.svg';

interface UserMenuProps {
  onProfileClick?: () => void;
  onLogoutClick?: () => void;
  isExpired: boolean;
}

const UserMenu = ({
  onProfileClick = () => {},
  onLogoutClick = () => {},
  isExpired,
}: UserMenuProps) => {
  return (
    <div className="w-40 flex flex-col shadow-elevation-2 bg-white rounded-2xl gap-2 py-2">
      {!isExpired && (
        <ContextMenuItem
          label="My Profile"
          handleClick={onProfileClick}
          icon={UserCircleIcon}
          iconHovered={UserCircleHovIcon}
        />
      )}
      <ContextMenuItem
        label="Log Out"
        handleClick={onLogoutClick}
        icon={LogOutIcon}
        iconHovered={LogOutHovIcon}
      />
    </div>
  );
};

export default UserMenu;
