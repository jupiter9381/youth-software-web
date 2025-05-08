import CheckBadge from '../assets/filled/CheckBadge';
import ShieldCircle from '../assets/filled/ShieldCircle';

type StatusType = 'Success' | 'Warning';

interface StatusSymbolProps {
  status: StatusType;
}

const statusStyles = {
  Success: {
    color: 'bg-sys-gr50',
  },
  Warning: {
    color: 'bg-sys-rd50',
  },
};

const SystemsIcon = ({ status }: StatusSymbolProps) => {
  const { color } = statusStyles[status];

  // Select the correct SVG based on the status
  const renderIcon = () => {
    switch (status) {
      case 'Success':
        return <CheckBadge colorKey="gr600" />;
      case 'Warning':
        return <ShieldCircle colorKey="rd600" />;
      default:
        return null;
    }
  };

  return (
    <div
      className={`w-20 h-20 flex items-center justify-center rounded-full ${color}`}
    >
      {renderIcon()}
    </div>
  );
};

export default SystemsIcon;
