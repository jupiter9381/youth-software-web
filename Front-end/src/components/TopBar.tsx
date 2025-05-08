import { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

// slice
import {
  clearToken,
  setDateFormat,
  setIsSelectedUserOrgId,
  setUser,
  setUserOrganisationId,
  setUserRole,
} from '../reducers/authSlice';

import { RootState } from '../reducers/store';

// assets
// import Clock from "../assets/outline/Clock.svg";
import BarsBottomLeft from '../assets/filled/BarsBottomLeft.svg';
import PassOnLogo from '../assets/logo.svg';

// components
import Breadcrumbs from './Breadcrumbs';
import Avatar from './Avatar';
import Sidebar from '../pages/Dashboard/Sidebar';
import UserMenu from './NavigationBlocks/UserMenu';
import Notifications from './Notifications';
import Clock from '../assets/outline/component_type/Clock';

//css
import '../App.css';
import UserProfile from './BuildingBlocks/UserProfile';
import { menuItems } from '../pages/Home/menuItems';
import { useUsers } from '../services/users/use-users';
import LoadingScreen from './LoadingScreen';
import Popup from './Popup';
import SystemsIcon from './SystemIcon';
import { setFaviconState } from '../reducers/faviconSlice';
import { useOrganisations } from '../services/organisations/use-organisations';
import StatusChip from './ContentBlocks/StatusChip';

export interface UserProps {
  email: string;
  firstName: string;
  id: string;
  lastName: string;
  profile: { displayName: string; displayPhoto: string };
}

// interface Breadcrumb {
//     label: string;
//     path: string;
// }

// interface TopBarProps {
//     breadcrumbs?: Breadcrumb[];
//     trialPeriod?: string;
//     trialEndText?: string;
//     clockIcon?: string;
//     clockColor?: string;
//     notificationIcon?: string;
//     userImage?: string;
//     onNotificationClick?: () => void;
//     onUserClick?: () => void;
// }

interface TopBarProps {
  formatted: string;
  isExpired: boolean;
  isSubscribed: boolean | undefined;
  isCancelled: boolean | undefined;
}

const TopBar = ({
  formatted,
  isExpired,
  isSubscribed,
  isCancelled,
}: TopBarProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  // const navigate = useNavigate();
  const dispatch = useDispatch();

  const [breadcrumbsData, setBreadcrumbsData] = useState<
    {
      label: string;
      path: string;
    }[]
  >([]);

  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isOpenSideBar, setIsOpenSideBar] = useState(false);
  const [showUserProfile, setShowUserProfile] = useState(false);

  const [successModal, setSuccessModal] = useState(false);

  const [showLogoutPopup, setShowLogoutPopup] = useState(false);

  const [closing, setClosing] = useState(false);

  const [profileDetails, setProfileDetails] = useState<UserProps | null>(null);

  const [isMultipleOrg, setIsMultipleOrg] = useState<boolean>(false);
  const [orgList, setOrgList] = useState<any[] | null>(null);

  const [
    showDeleteAccountConfirmationPopup,
    setShowDeleteAccountConfirmationPopup,
  ] = useState(false);

  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const token = useSelector((state: RootState) => state.authReducer.token);
  const isSelectedUserOrgId = useSelector(
    (state: RootState) => state.authReducer.isSelectedUserOrgId,
  );

  const {
    getProfile,
    getUserOrganisation,
    deleteUserAccount,
    loadingQuery,
    getUserSettings,
    refetchGetProfile,
  } = useUsers();

  const { getOrganisationMembers } = useOrganisations({});

  const handleClose = () => {
    setClosing(true);
    setTimeout(() => {
      setClosing(false);
      setIsUserMenuOpen(false);
    }, 300);
  };

  const openConfirmPopup = () => {
    setShowDeleteAccountConfirmationPopup(true);
  };

  const deleteAccount = async () => {
    const deleteResult: any = await deleteUserAccount({});
    if (deleteResult.error) {
      console.log(deleteResult.error.data['message']);
    } else {
      dispatch(setFaviconState(null));
      dispatch(clearToken());
      navigate(`/`);
    }
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsUserMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const setDetails = async () => {
      if (getProfile) {
        setProfileDetails(getProfile);
        dispatch(setUser(getProfile));
        // console.log(getProfile);
        const result = await getOrganisationMembers({
          page: 1, // Replace with the desired page value
          limit: 10, // Replace with the desired limit value
          filters: {
            id: '',
            email: getProfile.email,
            name: '',
          },
        }).unwrap(); // Unwrap the result for easier access
        dispatch(setUserRole(result.data[0].role));
      }
    };
    setDetails();
  }, [getProfile]);

  // useEffect(() => {
  //     if (location) {
  //         console.log(location.pathname);
  //         let urlPaths = location.pathname
  //             .split("/")
  //             .filter(Boolean)
  //             .filter(
  //                 (path) => path !== "home" && !/^[a-f0-9\-]{36}$/.test(path)
  //             )
  //             .map((path) => {
  //                 const decodedPath = decodeURIComponent(path);

  //                 return {
  //                     label: decodedPath
  //                         .replace("-", " ") // Replace hyphen with a space
  //                         .toLowerCase() // Convert the entire string to lowercase
  //                         .replace(/^./, (char) => char.toUpperCase()), // Capitalize the first character,
  //                     path: `${path}`,
  //                     disableClick: false,
  //                 };
  //             });
  //         setBreadcrumbsData(urlPaths);
  //     }
  // }, [location]);

  useEffect(() => {
    if (location) {
      let accumulatedPath = ''; // Track the full path hierarchy
      const urlPaths = location.pathname
        .split('/')
        .filter(Boolean)
        // eslint-disable-next-line no-useless-escape
        .filter((path) => path !== 'home' && !/^[a-f0-9\-]{36}$/.test(path))
        .map((path, index, array) => {
          const decodedPath = decodeURIComponent(path);
          accumulatedPath += `/${path}`; // Append segment to full path

          return {
            label: decodedPath
              .replace('-', ' ') // Replace hyphen with a space
              .toLowerCase() // Convert the entire string to lowercase
              .replace(/^./, (char) => char.toUpperCase()), // Capitalize the first character
            path: accumulatedPath.substring(1), // Remove leading slash
            disableClick: index === array.length - 1, // Disable click on last path
          };
        });

      setBreadcrumbsData(urlPaths);
    }
  }, [location]);

  useEffect(() => {
    // -------------01-10-24 This is temporary-------------
    // -----------------Backend Issue-----------------
    // if (token) {
    //     dispatch(
    //         setUserOrganisationId("ac863006-af46-45ff-8a5f-83601ea6facb")
    //     );
    // }
    // ----------------------------------------------------

    // --------------01-10-24 Fixing--------------
    if (getUserOrganisation && token && !isSelectedUserOrgId) {
      if (getUserOrganisation.data.length > 1) {
        dispatch(setUserOrganisationId(null));
        setIsMultipleOrg(true);

        setOrgList([...getUserOrganisation.data].reverse());
      } else {
        dispatch(setUserOrganisationId(getUserOrganisation.data[0].id));
      }
    }
    // -------------------------------------------
  }, [getUserOrganisation, isSelectedUserOrgId, token]);

  useEffect(() => {
    if (getUserSettings) {
      dispatch(setDateFormat(getUserSettings.dateFormat));
    }
  }, [getUserSettings]);

  return (
    <>
      <div className="relative md:px-10 sm:px-8 sm:py-3 py-2 px-4 flex items-center justify-between ">
        <div className="flex h-full">
          <div className="xl:flex hidden">
            <Breadcrumbs breadcrumbs={breadcrumbsData} />
          </div>
          <img
            src={PassOnLogo}
            alt="Logo"
            className="xl:hidden flex cursor-pointer"
            onClick={() => navigate(`/home`)}
          />
        </div>
        <div className="flex items-center gap-[24px]">
          {/* trial warning */}
          {!isSubscribed && !isCancelled && (
            <div className="xl:flex hidden items-center gap-[8px]">
              {isExpired ? (
                <p className="text-caption-reg text-nt-300">Trial Expired</p>
              ) : (
                <>
                  <p className="text-caption-reg text-nt-300">
                    Trial period ends in
                  </p>
                  <div className="flex items-center gap-[3px]">
                    <Clock color="#FA1D6D" />
                    <p className="text-caption-reg text-rd-600">{formatted}</p>
                  </div>
                </>
              )}
            </div>
          )}

          {/* Notifications */}
          {!isExpired && <Notifications />}

          {/* Profile */}
          <div ref={dropdownRef}>
            <div
              className={`xl:flex ${
                isExpired ? 'flex' : 'hidden'
              } items-center justify-center rounded-full h-[40px] w-[40px] cursor-pointer`}
              onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
            >
              <Avatar
                firstName={`${profileDetails?.firstName[0]}`}
                lastName={`${profileDetails?.lastName[0]}`}
                imgUrl={profileDetails?.profile.displayPhoto}
              />
            </div>
            {!isExpired && (
              <div className="xl:hidden flex cursor-pointer">
                <img
                  src={BarsBottomLeft}
                  alt=""
                  onClick={() => setIsOpenSideBar(!isOpenSideBar)}
                />
              </div>
            )}

            <div
              className={`absolute right-10 w-40 bg-white rounded-2xl slide-down ${
                isUserMenuOpen && !closing ? 'open' : 'closed'
              } z-9999`}
              onClick={handleClose}
            >
              <UserMenu
                {...(!isExpired && {
                  onProfileClick: () => setShowUserProfile(true),
                })}
                onLogoutClick={() => {
                  setShowLogoutPopup(true);
                }}
                isExpired={isExpired}
              />
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 w-full inset-x-0 md:px-[40px] sm:px-[32px] px-[16px]">
          <div className="h-[1px] w-full bg-nt-150"></div>
        </div>
      </div>

      <div className="xl:hidden flex">
        <Sidebar
          isOpen={isOpenSideBar}
          toggleSidebar={() => setIsOpenSideBar(!isOpenSideBar)}
          menuItems={menuItems}
          toggleUserProfile={() => setShowUserProfile(true)}
          toggleLogoutUser={() => {
            setShowLogoutPopup(true);
          }}
          isExpired={isExpired}
        />
      </div>

      {/* Conditionally Render UserProfile */}
      {/* {showUserProfile && (
            )} */}

      <div
        className={`fixed inset-0 bg-black bg-opacity-50 flex justify-end z-50 w-full transition-opacity ${
          showUserProfile
            ? 'opacity-100'
            : 'opacity-0 pointer-events-none h-full w-0'
        }`}
        onClick={() => setShowUserProfile(false)}
      >
        <div
          className={`transform transition-transform duration-300 ease-in-out ${
            showUserProfile ? 'translate-x-0' : 'translate-x-full'
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          <UserProfile
            avatarUrl={profileDetails?.profile.displayPhoto}
            firstName={profileDetails?.firstName || 'John'}
            lastName={profileDetails?.lastName || 'Smith'}
            email={profileDetails?.email || 'john.smith@email.com'}
            setShowUserProfile={setShowUserProfile}
            setSuccessModal={setSuccessModal}
            refetchGetProfile={refetchGetProfile}
            openConfirmPopup={openConfirmPopup}
          />
        </div>
      </div>
      <Popup
        isOpen={showLogoutPopup}
        closeAction={() => setShowLogoutPopup(false)}
        disableOverlayClick={false}
      >
        <div className="flex flex-col gap-8">
          <div className="flex justify-center">
            <SystemsIcon status="Warning" />
          </div>
          <div className="flex flex-col gap-5 items-center">
            <span className="text-center text-h3 text-nt-900">Log out</span>
            <span className="text-center text-body-base-reg text-nt-700">
              Are you sure you want to log out?
            </span>

            <div className="flex gap-3">
              <button
                className="secondary-btn base-btn"
                onClick={() => setShowLogoutPopup(false)}
              >
                Cancel
              </button>
              <button
                className="primary-btn base-btn"
                onClick={() => {
                  dispatch(setFaviconState(null));
                  dispatch(clearToken());
                  window.location.href = '/';
                }}
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </Popup>

      <Popup
        isOpen={isMultipleOrg}
        closeAction={() => {
          if (orgList) {
            dispatch(setUserOrganisationId(orgList[0].id));
            dispatch(setIsSelectedUserOrgId(true));
          }
          setIsMultipleOrg(false);
        }}
        disableOverlayClick={true}
        header={'Select the workspace'}
        type="form"
        disableContentPadding={true}
      >
        <div className="flex flex-col py-8 px-10">
          {orgList?.map((item, index) => (
            <div
              className={`flex items-center justify-between py-4 px-4 ${
                index !== orgList.length - 1 ? 'border-b' : ''
              } `}
            >
              <div className="flex gap-2">
                <span className="text-nt-700 text-body-big-str">
                  {item.name}
                </span>
                {index === 0 && <StatusChip label="Default" status="system" />}
              </div>
              <div className="flex">
                <button
                  className="primary-btn ghost-btn"
                  disabled={index === 0}
                  onClick={() => {
                    dispatch(setUserOrganisationId(item.id));
                    dispatch(setIsSelectedUserOrgId(true));
                    setIsMultipleOrg(false);
                  }}
                >
                  Set as default
                </button>
              </div>
            </div>
          ))}
        </div>
      </Popup>

      <Popup
        isOpen={successModal}
        disableOverlayClick={false}
        closeAction={() => setSuccessModal(false)}
      >
        <div className="flex flex-col gap-8">
          <div className="flex justify-center">
            <SystemsIcon status="Success" />
          </div>
          <div className="flex flex-col gap-5 items-center">
            <h3 className="text-center">Changes Saved</h3>
            <span className="text-center text-body-base-reg text-nt-700">
              Your changes have been successfully saved.
            </span>
          </div>
        </div>
      </Popup>

      <Popup
        isOpen={showDeleteAccountConfirmationPopup}
        closeAction={() => {
          setShowDeleteAccountConfirmationPopup(false);
        }}
        disableOverlayClick={false}
        disableXButton={false}
      >
        <div className="flex flex-col gap-8">
          <div className="flex justify-center">
            <SystemsIcon status="Warning" />
          </div>
          <div className="flex flex-col gap-5 items-center">
            <h3 className="text-center">Warning</h3>
            <span className="text-center text-body-base-reg text-nt-700">
              Are you sure you want to delete the account?
            </span>
            <div className="flex gap-3">
              <button
                className="base-btn bg-sys-rd600 text-white hover:bg-[#FF4C83]"
                onClick={deleteAccount}
              >
                Yes, delete
              </button>
              <button
                className="secondary-btn base-btn"
                onClick={() => {
                  setShowDeleteAccountConfirmationPopup(false);
                }}
              >
                Cancel deletion
              </button>
            </div>
          </div>
        </div>
      </Popup>
      {loadingQuery && <LoadingScreen />}
    </>
  );
};

export default TopBar;
