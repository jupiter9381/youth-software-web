// assets
import Check from '../../../assets/outline/Check.svg';
import X from '../../../assets/outline/X.svg';
// import CheckBadge from "../../../assets/filled/CheckBadge";
import CheckGreen from '../../../assets/filled/CheckGreen.svg';

const AccountType = (props: {
  accountType: string;
  planPaid: { data: boolean; setPlanPaid: any };
}) => {
  // true = yearly | false = monthly
  const price = [
    { type: 'business', monthlyPrice: 9.95, annualPrice: 101.49 },
    { type: 'solo', monthlyPrice: 3.95, annualPrice: 40.29 },
  ];
  const businessPlan = [
    {
      label: 'Share and request any data',
      status: true,
    },
    {
      label: 'Up to 10 team members',
      status: true,
    },
    {
      label: 'Custom expiration time (up to 24 hours)',
      status: true,
    },
    {
      label: 'Unlimited views within timeframe',
      status: true,
    },
    {
      label: 'Email notifications',
      status: true,
    },
    {
      label: 'Dashboard',
      status: true,
    },
    {
      label: 'History log (90 days)',
      status: true,
    },
    {
      label: 'Address book',
      status: true,
    },
    {
      label: 'Prebuilt and custom templates',
      status: true,
    },
    {
      label: 'Custom domain',
      status: true,
    },
    {
      label: 'Two factor authentication',
      status: true,
    },
    {
      label: 'Fully customisable forms',
      status: true,
    },
    {
      label: 'Custom branding',
      status: true,
    },
    {
      label: 'Team management',
      status: true,
    },
  ];

  const soloPlan = [
    {
      label: 'Share and request any data',
      status: true,
    },
    {
      label: '1 user',
      status: true,
    },
    {
      label: 'Custom expiration time (120, 90, 60 minutes)',
      status: true,
    },
    {
      label: '1 view',
      status: true,
    },
    {
      label: 'Email notifications',
      status: true,
    },
    {
      label: 'Dashboard',
      status: true,
    },
    {
      label: 'History log (30 days)',
      status: true,
    },
    {
      label: 'Address book',
      status: true,
    },
    {
      label: 'Prebuilt templates',
      status: true,
    },
    {
      label: 'Pass On subdomain only',
      status: true,
    },
    {
      label: 'Two factor authentication',
      status: true,
    },
    {
      label: 'Fully customisable forms',
      status: false,
    },
    {
      label: 'Custom branding',
      status: false,
    },
    {
      label: 'Team management',
      status: false,
    },
  ];

  return (
    <div className="flex flex-col items-center gap-[24px] w-full ">
      <div className="flex gap-[12px] relative">
        <span className="text-body-small-reg text-nt-700">Paid monthly</span>
        {/* <Toggle
                    checked={props.planPaid.data}
                    onChange={() =>
                        props.planPaid.setPlanPaid(!props.planPaid.data)
                    }
                /> */}
        <label className="inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            checked={props.planPaid.data}
            className="sr-only peer"
            onClick={() => props.planPaid.setPlanPaid(!props.planPaid.data)}
          />
          <div className="relative w-9 h-5 bg-blue-600 peer-focus:outline-none dark:peer-focus:ring-blue-800 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
        </label>
        <span className="text-body-small-reg text-nt-700">Paid annually</span>
        <div className="absolute bg-sd-50 px-[8px] rounded-[4px] right-[-75px] top-[-2px]">
          <span className="text-caption-reg text-sd-500">Save 15%</span>
        </div>
      </div>

      <div className="shadow-elevation-2 rounded-[20px]">
        <div className="flex flex flex-col lg:flex-row rounded-[20px] overflow-hidden">
          {/* ---------------business--------------- */}
          <div
            className={`flex-1 flex flex-col gap-[20px] ${props.accountType !== 'business' ? 'bg-nt-50' : 'bg-white'}`}
          >
            <h2
              className={`px-[36px] pt-[36px] ${props.accountType !== 'business' && 'text-nt-300'}`}
            >
              Business
            </h2>
            <div className="flex flex-col gap-[16px] px-[36px]">
              {businessPlan.map((plan, index) => (
                <div key={index} className="flex gap-[12px]">
                  <img
                    src={
                      plan.status
                        ? props.accountType !== 'business'
                          ? Check
                          : CheckGreen
                        : Check
                    }
                    draggable="false"
                    style={{
                      height: '24px',
                    }}
                  />
                  <span
                    className={`text-body-base-reg ${props.accountType !== 'business' ? 'text-nt-300' : 'text-nt-700'}`}
                  >
                    {plan.label}
                  </span>
                </div>
              ))}
            </div>
            <div className="flex-grow" />
            <div className="py-[16px] px-[40px] border-t border-t-[1px] border-t-nt-150 flex items-end">
              <h4
                className={`font-sans mr-[8px] ${props.accountType !== 'business' ? 'text-nt-300' : 'text-pm-500'}`}
              >
                $
                {props.planPaid.data
                  ? price[0].annualPrice
                  : price[0].monthlyPrice}
              </h4>
              <span className="text-caption-all-caps uppercase text-nt-300 pb-1">
                {props.planPaid.data ? '/ PER YEAR' : '/ PER MONTH'}
              </span>
            </div>
          </div>

          {/* ---------------solo--------------- */}
          <div
            className={`flex-1 flex flex-col gap-[20px] ${props.accountType !== 'solo' ? 'bg-nt-50' : 'bg-white'}`}
          >
            <h2
              className={`px-[36px] pt-[36px] ${props.accountType !== 'solo' && 'text-nt-300'}`}
            >
              Solo
            </h2>
            <div className="flex flex-col gap-[16px] px-[36px]">
              {soloPlan.map((plan, index) => (
                <div key={index} className="flex gap-[12px]">
                  <img
                    src={
                      plan.status
                        ? props.accountType !== 'solo'
                          ? Check
                          : CheckGreen
                        : X
                    }
                    draggable="false"
                    style={{
                      height: '24px',
                    }}
                  />
                  <span
                    className={`text-body-base-reg ${props.accountType !== 'solo' ? 'text-nt-300' : 'text-nt-700'}`}
                  >
                    {plan.label}
                  </span>
                </div>
              ))}
            </div>
            <div className="flex-grow" />
            <div className="py-[16px] px-[40px] border-t border-t-[1px] border-t-nt-150 flex items-end">
              <h4
                className={`font-sans mr-[8px] ${props.accountType !== 'solo' ? 'text-nt-300' : 'text-pm-500'} `}
              >
                $
                {props.planPaid.data
                  ? price[1].annualPrice
                  : price[1].monthlyPrice}
              </h4>
              <span className="text-caption-all-caps uppercase text-nt-300 pb-1">
                {props.planPaid.data ? '/ PER YEAR' : '/ PER MONTH'}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* <div className='h-[40px] w-full' style={{ height: "40px" }}>
                {"\u200B"}
            </div> */}
    </div>
  );
};

export default AccountType;
