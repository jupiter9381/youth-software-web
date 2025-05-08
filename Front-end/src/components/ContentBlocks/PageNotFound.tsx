import { useNavigate } from 'react-router-dom';
import DashboardIcon from '../../assets/outline/component_type/DashboardIcon';
import PageNotFoundIcon from '../../assets/PageNotFoundIcon.svg';

const PageNotFound = () => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-[#F9FAFF]">
      <img src={PageNotFoundIcon} className="w-45 h-45" />

      <div className="flex flex-col gap-5 w-2/6 items-center ">
        <h3 className="mt-4 text-xl">We can't find this page</h3>
        <p className="text-body-base-reg text-nt-700 text-center">
          It looks like the destination you were trying to reach isn't there.
          Try exploring other sections of the app.
        </p>
        <button
          onClick={() => navigate('/home')}
          className="secondary-btn base-btn bg-white"
        >
          {/* <img src={DashboardIcon} className='w-6 h-6' />*/}

          <DashboardIcon color="#0046FA" />
          <p className="text-body-base-str">Go to Dashboard</p>
        </button>
      </div>
    </div>
  );
};

export default PageNotFound;
