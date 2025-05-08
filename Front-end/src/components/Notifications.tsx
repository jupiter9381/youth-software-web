import { useState } from 'react';

// Assets
// import Notification from "../assets/outline/Notifications.svg";
import NotificationContent from './ContentBlocks/NotificationContent';
import X from '../assets/outline/X.svg';
// import ArrowTrendingUp from "../assets/outline/Arrow-trending-up.svg";

// component
import Notification from '../assets/outline/component_type/Notifications';
// import ArrowTrendingUp from "../assets/outline/component_type/ArrowTrendingUp";
// import { useActivityLogs } from "../services/activityLogs/use-activityLogsAPI";

const Notifications = () => {
  const [openNotifications, setOpenNotifications] = useState<boolean>(false);
  return (
    <div>
      <div
        className="cursor-pointer"
        onClick={() => setOpenNotifications(!openNotifications)}
      >
        <Notification hoverColor="#0046FA" />
      </div>
      <div
        className={`fixed inset-0  ${!openNotifications && 'h-full w-0'} z-50`}
      >
        {/* Background overlay */}
        <div
          className={`fixed inset-0 bg-black/25 z-40 transition-opacity ${
            openNotifications ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
          onClick={() => setOpenNotifications(!openNotifications)}
        ></div>

        {/* Notification content */}
        <div
          className={`h-screen fixed right-0 z-50 overflow-y-auto flex flex-col w-[25rem] justify-between bg-white shadow-elevation-2 transform transition-transform duration-300 ease-in-out ${
            openNotifications ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          <div>
            {/* close and title */}
            <div className="py-[1.12rem] px-4 flex gap-4 border-b border-nt-150">
              <img
                className="cursor-pointer"
                src={X}
                draggable={false}
                onClick={() => setOpenNotifications(!openNotifications)}
              />

              <div>
                <h4>Activity Log</h4>
              </div>
            </div>
            {/* contents */}
            <div className="flex-grow">
              <NotificationContent />
            </div>
            {/* view all container
                        <div className='flex py-3 p-5 flex justify-center gap-2'>
                            <div className=' hover:underline'>
                                <ArrowTrendingUp color='#0046FA' />
                            </div>
                            <span className='text-body-small-str text-pm-500 cursor-pointer hover:underline'>
                                View all activity
                            </span>
                        </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Notifications;
