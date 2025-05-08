import EyeSlash from './../assets/filled/Eye-Slash';
import Warning from '../assets/filled/Warning';
import Envelope from '../assets/filled/Envelope';

// Define the type for status
export type MetricsStatusType = 'Unviewed' | 'Missed' | 'Unanswered';

interface MetricSymbolProps {
  status: MetricsStatusType;
}

// Define a mapping of status to color
const statusStyles = {
  Unviewed: {
    color: 'bg-pm-50',
  },
  Missed: {
    color: 'bg-sys-rd50',
  },
  Unanswered: {
    color: 'bg-sys-pr50',
  },
};

const MetricsIcon = ({ status }: MetricSymbolProps) => {
  const { color } = statusStyles[status];

  // Select the correct SVG based on the status
  const renderIcon = () => {
    switch (status) {
      case 'Unviewed':
        return <EyeSlash colorKey="bl600" />;
      case 'Missed':
        return <Warning colorKey="rd600" />;
      case 'Unanswered':
        return <Envelope colorKey="pr600" />;
      default:
        return null;
    }
  };

  return (
    <div
      className={`w-14 max-[450px]:w-10 h-14 max-[450px]:h-10 flex items-center justify-center rounded-full ${color}`}
    >
      {renderIcon()}
    </div>
  );
};

export default MetricsIcon;
