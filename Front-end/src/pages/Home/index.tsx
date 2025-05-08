// REACT AND RTK
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../reducers/store';
import {
  clearToken,
  setTrial,
  updateTimeOutSessionPopup,
} from '../../reducers/authSlice';
import { isTokenExpired } from '../../functions/isTokenExpired';
import { useOrganisations } from '../../services/organisations/use-organisations';
import { useTrialStatus } from '../../functions/trialUtils';
// import TrialError from "../../assets/TrialExpired.svg";
import TrialError from '../../assets/trialExpired.svg';
import { setFaviconState } from '../../reducers/faviconSlice';

// COMPONENTS
import TopBar from '../../components/TopBar';
import Sidebar from '../Dashboard/Sidebar';
import { menuItems } from './menuItems';
import Popup from '../../components/Popup';
import SystemsIcon from '../../components/SystemIcon';
// import { useSubscriptions } from "../../services/subscriptions/use-subscriptions";
import SubscriptionExpired from '../../assets/filled/SubscriptionExpired';
import CheckGreen from '../../assets/filled/CheckGreen.svg';
import SubscriptionInfo from '../../assets/filled/SubscriptionInfo';
import { useSubscriptions } from '../../services/subscriptions/use-subscriptions';
// import InformationCircle from "../../assets/filled/InformationCircle";

const points = [
  'Share and request any data',
  'Edit address book',
  'Invite team members',
  'Create and update templates',
];

const Home = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  // const [menuItemsModified, setMenuItemsModified] = useState<any[] | null>(
  //     null
  // );

  // RTK
  const { getOrganisation } = useOrganisations({});
  const { data: trialDetails, generalAction } = useSubscriptions({
    queryParameters: '/status',
  });

  const orgDetails = useSelector(
    (state: RootState) => state.organisationReducer,
  );
  const userRole = useSelector((state: RootState) => state.authReducer.role);
  const token = useSelector((state: RootState) => state.authReducer.token);
  const popupTimeOut = useSelector(
    (state: RootState) => state.authReducer.timeOutSessionPopup,
  );

  // Pop ups
  const [subscriptionPopup, setSubscriptionPopup] = useState(false);
  const [showEndSessionPopup, setShowEndSessionPopup] = useState(false);

  // Hook to check trial status
  const { isExpired, formatted, isCancelled, isSubscribed } =
    useTrialStatus(true); // Gets if trial is expired and formatted string

  const getTrialStatus = async () => {
    await generalAction({
      queryParameters: `/status`,
      method: 'GET',
    });
  };

  useEffect(() => {
    if (getOrganisation) {
      //dispatch(setTrial(getOrganisation.trial));
      getTrialStatus();

      if (trialDetails) {
        dispatch(setTrial(trialDetails));
      }
    }
  }, [getOrganisation, trialDetails]);

  useEffect(() => {
    if (location) {
      const isHome = location.pathname.includes('home');

      if (isHome) {
        if (!token) {
          window.location.href = '/';
        }
      }
    }
  }, [location, token]);

  useEffect(() => {
    const checkTokenExpiry = () => {
      if (token && isTokenExpired(token)) {
        setShowEndSessionPopup(true);
      }
    };

    // Run check on component mount
    checkTokenExpiry();

    // Set interval to check token expiration every minute
    const interval = setInterval(checkTokenExpiry, 60000); // 60,000ms = 1 minute

    return () => clearInterval(interval); // Cleanup on unmount
  }, [token, dispatch, navigate]);

  useEffect(() => {
    if (popupTimeOut) {
      setShowEndSessionPopup(true);
      dispatch(updateTimeOutSessionPopup(false));
    }
  }, [popupTimeOut]);

  const isBillingPage = location.pathname === '/home/settings/billing';

  // useEffect(() => {
  //     if (menuItems && organisationType) {
  //         let filteredMenuItems =
  //             organisationType === "SOLO"
  //                 ? menuItems.filter(
  //                       (item) =>
  //                           ![
  //                               "Settings",
  //                           ].includes(item.label)
  //                   )
  //                 : menuItems;

  //         setMenuItemsModified(filteredMenuItems);
  //     }
  // }, [menuItems, organisationType]);

  return (
    <>
      {token ? (
        <div className="bg-nt-50 h-screen w-full flex relative">
          <div className="relative xl:flex hidden">
            {isExpired && (
              <div className="absolute inset-0 bg-white bg-opacity-40 z-50"></div>
            )}
            <Sidebar
              isOpen={true}
              menuItems={menuItems}
              isExpired={isExpired}
            />
          </div>
          <div className="w-full flex flex-col">
            <TopBar
              formatted={formatted}
              isExpired={isExpired}
              isSubscribed={isSubscribed}
              isCancelled={isCancelled}
            />
            {/* {subscriptionStatus && !subscriptionStatus.isSubscribed && (
                            <div
                                className={`flex flex-row gap-2 rounded-md border border-sd-500 bg-sd-50 md:mx-10 sm:mx-8 sm:mt-3 mt-2 mx-4 py-2 px-3`}
                            >
                                <InformationCircle />
                                <p className='text-caption-reg text-sd-500'>
                                    Your subscription has expired —{" "}
                                    {orgDetails.type === "BUSINESS" &&
                                        (userRole === "OWNER" || userRole === "ADMIN") && (
                                            <span
                                                className='cursor-pointer text-sd-500 hover:text-[#CC690D]'
                                                onClick={() => setSubscriptionPopup(true)}
                                            >
                                                renew now
                                            </span>
                                        )}
                                    {userRole === "MEMBER" && (
                                        <span
                                            className=' text-sd-500'
                                            // onClick={() => window.alert("Renew clicked")}
                                        >
                                            contact {orgDetails.name} to renew
                                        </span>
                                    )}
                                </p>
                            </div>
                        )} */}
            <div className="flex h-full w-full relative">
              {/* Overlay with message and button */}
              {isExpired && !isSubscribed && !isBillingPage ? (
                <>
                  <div className="absolute inset-0 bg-nt-50 bg-opacity-80 backdrop-blur-sm flex justify-center items-center z-30">
                    <div className="p-10 rounded-lg text-center flex flex-col gap-5 items-center">
                      <img
                        src={TrialError}
                        alt="Trial Expired Icon"
                        className="w-28"
                      />
                      <h2 className="text-h4 text-nt-900">
                        Your trial period has expired
                      </h2>
                      <button
                        className="primary-btn base-btn w-full"
                        onClick={() => navigate('/home/settings/billing')}
                      >
                        Buy Subscription
                      </button>
                    </div>
                  </div>
                </>
              ) : (
                <Outlet />
              )}
            </div>
          </div>

          <Popup
            isOpen={showEndSessionPopup}
            disableOverlayClick={false}
            closeAction={() => {
              dispatch(setFaviconState(null));
              dispatch(clearToken());
              setShowEndSessionPopup(false);
            }}
          >
            <div className="flex flex-col gap-8">
              <div className="flex justify-center">
                <SystemsIcon status="Warning" />
              </div>
              <div className="flex flex-col gap-5 items-center">
                <h3 className="text-center">Warning</h3>
                <span className="text-center text-body-base-reg text-nt-700">
                  Session Expired
                </span>
                <div className="flex gap-3">
                  <button
                    className="primary-btn base-btn"
                    onClick={() => {
                      dispatch(setFaviconState(null));
                      dispatch(clearToken());
                    }}
                  >
                    Okay
                  </button>
                </div>
              </div>
            </div>
          </Popup>
          <Popup
            isOpen={subscriptionPopup}
            closeAction={() => {
              setSubscriptionPopup(false);
            }}
            disableOverlayClick={false}
          >
            <div className="flex flex-col gap-8 items-center">
              <div className="flex justify-center">
                {orgDetails.type === 'BUSINESS' &&
                  (userRole === 'OWNER' || userRole === 'ADMIN') && (
                    <SubscriptionExpired />
                  )}
                {userRole === 'MEMBER' && <SubscriptionInfo />}
              </div>
              <div className="flex flex-col justify-start w-[376px] gap-5">
                <h3 className="text-center">Your subscription has expired</h3>

                {orgDetails.type === 'BUSINESS' &&
                  (userRole === 'OWNER' || userRole === 'ADMIN') && (
                    <>
                      <span className="text-body-base-reg text-nt-700">
                        Renew your subscription and restore access to features
                        such as:
                      </span>
                      <div className="flex flex-col gap-4">
                        {points.map((point, index) => (
                          <div key={index} className="flex gap-3">
                            <img
                              src={CheckGreen}
                              draggable="false"
                              style={{
                                height: '24px',
                              }}
                            />
                            <span className={`text-body-base-reg text-nt-700`}>
                              {point}
                            </span>
                          </div>
                        ))}
                      </div>
                      <div className="flex gap-3 w-full mt-3">
                        <button
                          className="primary-btn base-btn w-full"
                          onClick={() => {
                            window.alert('Subscription not yet implemented');
                          }}
                        >
                          Renew Subcription
                        </button>
                      </div>
                    </>
                  )}
                {userRole === 'MEMBER' && (
                  <span className="text-body-base-reg text-nt-700 text-center">
                    Contact {orgDetails.name} to renew the subscription and
                    restore access to all features.
                  </span>
                )}
              </div>
            </div>
          </Popup>
        </div>
      ) : (
        <></>
      )}
    </>
  );
};

export default Home;
