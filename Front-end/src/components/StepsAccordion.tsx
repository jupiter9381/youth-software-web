import { useEffect, useState } from 'react';

interface StepAccordionProps {
  stepNumber: number;
  title: string;
  children: React.ReactNode;
  isOpenInitially?: boolean;
  isActive?: boolean;
  onClickAction: () => void;
  hide?: boolean;
  isStepComplete?: boolean; // New prop to check completion status
}

const StepAccordion: React.FC<StepAccordionProps> = ({
  stepNumber,
  title,
  children,
  isOpenInitially = false,
  isActive = false,
  hide,
  onClickAction,
  isStepComplete = false,
}) => {
  const [isOpen, setIsOpen] = useState(isOpenInitially);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
    onClickAction();
  };

  useEffect(() => {
    if (hide) setIsOpen(false);
  }, [hide]);

  return (
    <div className="w-full border-b border-gray-200 py-6">
      <div
        className="flex items-center cursor-pointer"
        onClick={toggleAccordion}
      >
        <div className="flex gap-4">
          <div
            className={`flex items-center justify-center w-6 h-6 rounded-full text-caption-all-caps mr-2 ${
              isStepComplete
                ? 'bg-sys-gr50 text-white'
                : isActive
                  ? 'bg-pm-50 text-pm-500'
                  : 'bg-nt-100 text-nt-300'
            }`}
          >
            {isStepComplete ? (
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="#13A757"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M9.29448 18.6396L3 12.3451L4.57362 10.7715L9.29448 15.4924L19.4264 5.36047L21 6.93409L9.29448 18.6396Z" />
              </svg>
            ) : (
              stepNumber
            )}
          </div>
          <span className="text-body-base-reg text-nt-900">{title}</span>
        </div>

        <div className="ml-auto">
          <svg
            className={`w-4 h-4 transition-transform duration-300 ${isOpen ? 'transform rotate-180' : ''}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </div>
      </div>
      {isOpen && children && (
        <div className="mt-6 transition-all duration-300 gap-4">{children}</div>
      )}
    </div>
  );
};

export default StepAccordion;
