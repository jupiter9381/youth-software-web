import MetricsIcon, { MetricsStatusType } from '../MetricsIcon';

interface DashboardMetricsProps {
  count: number;
  label: string;
  // iconFill?: boolean;
  status: MetricsStatusType;
}

const DashboardMetrics = ({ count, label, status }: DashboardMetricsProps) => {
  return (
    <>
      {/* Show on screens > 650px */}
      <div
        className={`hidden min-[651px]:flex flex-col items-center w-full h-[187px] bg-white gap-3 p-6 pl-8 rounded-3xl`}
      >
        <div className="flex flex-row w-full justify-between items-center">
          <h2>{count}</h2>
          <MetricsIcon status={status} />
        </div>
        <div className="w-full">
          <p className="text-body-base-reg text-nt-700 w-[110px]">{label}</p>
        </div>
      </div>

      {/* Show on screens ≤ 650px */}
      <div
        className={`flex min-[651px]:hidden flex-row items-center w-full h-auto bg-white gap-3 p-4 rounded-3xl`}
      >
        <div className="flex flex-row w-full justify-center items-center">
          <h2>{count}</h2>
        </div>
        <div className="w-full flex flex-row items-center gap-4">
          <MetricsIcon status={status} />
          <p className="text-body-small-reg text-nt-700 w-[110px]">{label}</p>
        </div>
      </div>
    </>
  );
};

export default DashboardMetrics;
