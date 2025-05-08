import { colorMap } from '../colorMap';

interface WarningProps {
  colorKey?: keyof typeof colorMap;
}

const Warning: React.FC<WarningProps> = ({ colorKey = 'rd600' }) => {
  const color = colorMap[colorKey];

  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M9.40136 4.0034C10.5558 2.00229 13.444 2.00229 14.5985 4.0034L21.9528 16.7509C23.1066 18.7509 21.6632 21.2501 19.3542 21.2501H4.64559C2.33661 21.2501 0.893183 18.7509 2.04703 16.7509L9.40136 4.0034ZM12.0001 9.25C12.4143 9.25 12.7501 9.58579 12.7501 10V13.75C12.7501 14.1642 12.4143 14.5 12.0001 14.5C11.5859 14.5 11.2501 14.1642 11.2501 13.75V10C11.2501 9.58579 11.5859 9.25 12.0001 9.25ZM12.0001 17.5C12.4143 17.5 12.7501 17.1642 12.7501 16.75C12.7501 16.3358 12.4143 16 12.0001 16C11.5859 16 11.2501 16.3358 11.2501 16.75C11.2501 17.1642 11.5859 17.5 12.0001 17.5Z"
        fill={color}
      />
    </svg>
  );
};

export default Warning;
