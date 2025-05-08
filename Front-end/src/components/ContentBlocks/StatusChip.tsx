interface StatusChipProps {
  label: string;
  status:
    | 'unviewed'
    | 'viewed'
    | 'unanswered'
    | 'missed'
    | 'system'
    | 'custom'
    | 'unverified';
}

const statusStyles = {
  unviewed: 'bg-sys-bl50 text-sys-bl600',
  viewed: 'bg-sys-gr50 text-sys-gr600',
  unanswered: 'bg-sys-pr50 text-sys-pr600',
  missed: 'bg-sys-rd50 text-sys-rd600',
  system: 'bg-pm-50 text-pm-500 w-fit',
  custom: 'bg-sd-50 text-sd-500 w-fit',
  unverified: 'bg-nt-100 text-nt-300 w-fit',
};

const StatusChip = ({ label, status }: StatusChipProps) => {
  return (
    <span
      className={`py-1 px-2 w-[88px] h-fit rounded flex justify-center text-caption-reg ${statusStyles[status]}`}
    >
      {label}
    </span>
  );
};

export default StatusChip;
