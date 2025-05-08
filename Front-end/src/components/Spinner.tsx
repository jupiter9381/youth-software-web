interface SpinnerProps {
  color?: string;
  size?: 'sm' | 'md' | 'lg';
  wfull?: boolean;
}

const Spinner = ({ color, size, wfull }: SpinnerProps) => {
  let sizeClasses;
  switch (size) {
    case 'sm':
      sizeClasses = 'w-5 h-5';
      break;
    case 'md':
      sizeClasses = 'w-8 h-8';
      break;
    case 'lg':
      sizeClasses = 'w-12 h-12';
      break;
    default:
      sizeClasses = 'w-12 h-12'; // default if no size provided
  }

  return (
    <div
      className={`flex flex-col items-center h-full ${wfull ? 'w-full' : 'w-min'} justify-center`}
    >
      <div
        className={`${sizeClasses} border-4 ${
          color ? color : 'border-pm-500'
        } border-solid border-t-transparent rounded-full animate-spin`}
      ></div>
    </div>
  );
};

export default Spinner;
