import StepArrow from '../assets/outline/component_type/StepArrow';

interface StepsProps {
  label: string;
  number: number;
  disabled: boolean;
  isLastStep?: boolean;
}

const Steps = (props: StepsProps) => {
  return (
    <div className="flex items-center group">
      <div className="flex items-center group" style={{ gap: '8px' }}>
        <div
          className={`flex items-center justify-center rounded-full font-bold ${
            !props.disabled
              ? 'text-sys-bl600 bg-pm-50'
              : 'text-nt-300 bg-nt-100'
          } `}
          style={{ width: '24px', height: '24px' }}
        >
          <p className="text-caption-str ">{props.number}</p>
        </div>
        <span
          className={`text-caption-all-caps uppercase w-max ${props.disabled && 'text-nt-300'}`}
        >
          {props.label}
        </span>
        {!props.isLastStep && <StepArrow color="#DBDEE7" />}
      </div>
    </div>
  );
};

export default Steps;
