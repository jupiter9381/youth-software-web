//react
import { useEffect, useRef, useState } from 'react';

import { useUsers } from '../../services/users/use-users';

//assets
// import SvgColorChanger from "../../functions/SvgColorChanger";
import Pencil from '../../assets/outline/Pencil.svg';
// import Tabs from "../NavigationBlocks/Tabs";
// import RadioGroup from "../RadioGroup";
import ToggleGroup from '../FormElements/Toggle';
import EditProfileForm from './EditProfileForm';
import ContextMenuItem from '../ContextMenuItem';
import TrashRed from '../../assets/outline/hovered/TrashRed.svg';
// import LoadingScreen from "../LoadingScreen";
import Close from '../../assets/outline/component_type/Close';
import More from '../../assets/outline/component_type/More';
import Avatar from '../Avatar';
import UpdateUserPasswordForm from './UpdateUserPasswordForm';
import SvgColorChanger from '../../functions/SvgColorChanger';
import { RootState } from '../../reducers/store';
import { useSelector } from 'react-redux';

interface UserProfileProps {
  avatarUrl?: string;
  firstName: string;
  lastName: string;
  email: string;
  setShowUserProfile: (value: boolean) => void;
  setSuccessModal: any;
  refetchGetProfile: any;
  openConfirmPopup: () => void;
}

const UserProfile = ({
  avatarUrl,
  firstName,
  lastName,
  email,
  setShowUserProfile,
  setSuccessModal,
  openConfirmPopup,
}: UserProfileProps) => {
  // const [isHoveredMore, setIsHoveredMore] = useState(false);

  // const [activeTab, setActiveTab] = useState<string>("Security");
  const activeTab = 'Security';
  const [changePassword, setChangePassword] = useState(false);
  // const tabs = [{ label: "Notifications" }, { label: "Security" }];

  //radio button for inapp notifications
  // const [inAppNotifOption, setInAppNotifOption] = useState("all");

  // const inAppNotifOptions = [
  //     { label: "All agency activity feed", value: "all" },
  //     { label: "Only my activity", value: "myActivity" },
  //     { label: "None", value: "none", disableOd: false },
  // ];

  //radio button for email notifications
  // const [emailNotifOption, setEmailNotifOption] =
  //     useState("answered requests ");

  // const emailNotifOptions = [
  //     {
  //         label: "Answered requests",
  //         value: "answeredRequests",
  //         checked: true,
  //     },
  //     {
  //         label: "Destroyed answers",
  //         value: "destroyedAnswers",
  //         checked: false,
  //     },
  //     { label: "Expiring Soon", value: "expiringSoon", checked: false },
  //     { label: "Requests sent", value: "requestsSent", checked: false },
  //     { label: "Shares sent", value: "sharesSent", checked: false },
  // ];

  //2FA Toggle
  const [active2FAToggle, setActive2FAToggle] = useState<string[]>([]);

  const orgDetails = useSelector(
    (state: RootState) => state.organisationReducer,
  );
  // const options2FA = [
  //     // {
  //     //     label: "Authenticator app verification",
  //     //     value: "authenticator",
  //     //     disabled: true,
  //     // },
  //     { label: "Email verification", value: "email", disabled: false },
  //     // { label: "SMS verification", value: "sms", disabled: true },
  // ];

  // const [options2FA, setOptions2FA] = useState<any[]>([
  //     // {
  //     //     label: "Authenticator app verification",
  //     //     value: "authenticator",
  //     //     disabled: true,
  //     // },
  //     { label: "Email verification", value: "email", disabled: false },
  //     // { label: "SMS verification", value: "sms", disabled: true },
  // ]);

  const options2FA = [
    // {
    //     label: "Authenticator app verification",
    //     value: "authenticator",
    //     disabled: true,
    // },
    { label: 'Email verification', value: 'email', disabled: false },
    // { label: "SMS verification", value: "sms", disabled: true },
  ];

  //Profile Edit
  const [profileEdit, setProfileEdit] = useState(false);
  const handleClose = () => {
    setShowUserProfile(false);
  };

  //More Icon
  const [moreMenu, setMoreMenu] = useState(false);
  const [closing, setClosing] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const handleCloseMoreMenu = () => {
    setMoreMenu(false);
    setClosing(true);
    setTimeout(() => {
      setClosing(false);
      setMoreMenu(false);
    }, 300);
  };

  const {
    getProfile,
    // updatePhoto,
    refetchGetProfile,
    update2FA,
    loadingMutation,
  } = useUsers();

  // const submitChanges = async (data: {
  //   firstName: string;
  //   lastName: string;
  //   email: string;
  //   phoneNumber?: string;
  //   profilePicture?: any;
  // }) => {
  //   if (data.profilePicture) {
  //     // Create a FormData object
  //     const formData = new FormData();
  //     formData.append('file', data.profilePicture);
  //     await updatePhoto(formData);
  //     // setSuccessModal(true);
  //     setProfileEdit(false);
  //     refetchGetProfile();
  //   }
  // };

  const updateEmailVerification = async (status: boolean) => {
    await update2FA({ enabled: status });
    refetchGetProfile();
  };

  // Click outside detection
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        handleCloseMoreMenu(); // Close menu if clicked outside
      }
    };

    // Add event listener when menu is open
    if (moreMenu) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    // Cleanup listener on unmount or when menu closes
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [moreMenu]);

  // useEffect(() => {
  //     if (active2FAToggle.includes("email")) {
  //         updateEmailVerification(true);
  //         refetchGetProfile();
  //     } else {
  //         updateEmailVerification(false);
  //         refetchGetProfile();
  //     }
  // }, [active2FAToggle]);

  useEffect(() => {
    if (getProfile) {
      if (getProfile.twoFactorEnabled) {
        setActive2FAToggle((prev) => [...prev, 'email']);
      } else {
        const transformActive2FAToggle = active2FAToggle.filter(
          (item) => item !== 'email',
        );
        setActive2FAToggle(transformActive2FAToggle);
      }
    }
  }, [getProfile]);

  return (
    <div className="w-[400px] bg-white h-full">
      {!profileEdit && !changePassword ? (
        <>
          {/* Top Container*/}
          {/* <div className='relative h-[350px] bg-nt-50 border-b border-nt-150'> */}
          <div className="relative h-[350px]  bg-nt-50">
            {/* Window Header */}
            <div className="relative flex justify-between px-6 py-3">
              <div className="cursor-pointer" onClick={handleClose}>
                <Close color="#9497A3" hoverColor="#0046FA" />
              </div>
              <div
                className="cursor-pointer"
                // onMouseEnter={() => setIsHoveredMore(true)}
                // onMouseLeave={() => setIsHoveredMore(false)}
                onClick={() => setMoreMenu(!moreMenu)}
              >
                <More hoverColor="#0046FA" />
              </div>
              {moreMenu && (
                <div
                  ref={menuRef}
                  className={`absolute top-9 right-5 w-40 flex flex-col bg-white rounded-2xl gap-2 py-2 slide-down ${
                    moreMenu && !closing ? 'open' : 'closed'
                  } z-9999`}
                >
                  <ContextMenuItem
                    label="Delete Account"
                    handleClick={() => {
                      if (!(orgDetails && orgDetails.type === 'BUSINESS')) {
                        setMoreMenu(false);
                        openConfirmPopup();
                      }
                    }}
                    icon={TrashRed}
                    iconHovered={TrashRed}
                    disabled={
                      orgDetails && orgDetails.type === 'BUSINESS'
                        ? true
                        : false
                    }
                  />
                </div>
              )}
            </div>
            {/* Profile */}
            <div className="flex flex-col items-center gap-4">
              {avatarUrl ? (
                <img
                  src={avatarUrl}
                  alt={`${firstName} ${lastName}`}
                  className="w-28 h-28 rounded-full object-cover"
                />
              ) : (
                <Avatar
                  firstName={firstName}
                  lastName={lastName}
                  customWidth="112px"
                  customHeight="112px"
                  customFontSize="text-h1"
                />
              )}

              <div className="flex flex-col gap-2 items-center">
                <h4>{`${firstName} ${lastName}`}</h4>
                <p className="text-body-small-reg text-nt-700">{email}</p>
              </div>

              <button
                onClick={() => {
                  setProfileEdit(true);
                }}
                className="primary-btn base-btn flex items-center gap-2"
              >
                <SvgColorChanger svgPath={Pencil} strokeColor="#FFFFFF" />
                Edit profile
              </button>
            </div>
            {/* <div className='flex w-full justify-center absolute -bottom-5'>
                            <Tabs tabs={tabs} activeTab={activeTab} onTabClick={setActiveTab} />
                        </div> */}
          </div>

          {/* Bottom Container */}
          <div className="px-5 py-12 flex flex-col gap-10 h-[calc(100%-350px)] overflow-y-auto">
            {/* {activeTab === "Notifications" && (
                            <>
                                <div className='flex flex-col px-5 gap-5'>
                                    <h6 className='text-h6'>In app notifications</h6>
                                    <RadioGroup
                                        flexType='flex-col'
                                        options={inAppNotifOptions}
                                        value={inAppNotifOption}
                                        onChange={setInAppNotifOption}
                                    />
                                </div>

                                <div className='flex flex-col px-5 gap-5'>
                                    <h6 className='text-h6'>Email notifications</h6>
                                    <RadioGroup
                                        flexType='flex-col'
                                        options={emailNotifOptions}
                                        value={emailNotifOption}
                                        onChange={setEmailNotifOption}
                                    />
                                </div>
                            </>
                        )} */}

            {activeTab === 'Security' && (
              <>
                <div className="flex flex-col px-5 gap-5">
                  <div className="flex flex-col gap-3">
                    <h6 className="text-h6">Password</h6>
                    {/* <p className="text-body-small-reg">
                                            You are currently using Google Sign
                                            in password.
                                        </p> */}
                  </div>
                  <button
                    className="primary-btn ghost-btn w-fit"
                    onClick={() => setChangePassword(true)}
                  >
                    Change Password
                  </button>
                </div>

                <div className="flex flex-col px-5 gap-5">
                  <div className="flex flex-col gap-3">
                    <h6 className="text-h6">Two factor authentication</h6>
                    {loadingMutation ? (
                      <div className="flex items-center justify-center">
                        <div className="w-12 h-12 border-4 border-blue-500 border-solid border-t-transparent rounded-full animate-spin"></div>
                      </div>
                    ) : (
                      <ToggleGroup
                        options={options2FA}
                        values={active2FAToggle}
                        onChange={(value) => {
                          if (value.includes('email')) {
                            updateEmailVerification(true);
                          } else {
                            updateEmailVerification(false);
                          }
                        }}
                      />
                    )}
                  </div>
                </div>
              </>
            )}
          </div>
        </>
      ) : (
        <>
          {profileEdit && (
            <EditProfileForm
              // onSave={(data) => submitChanges(data)}
              onBack={() => {
                refetchGetProfile();
                setProfileEdit(false);
              }}
              setSuccessModal={setSuccessModal}
            />
          )}

          {changePassword && (
            <UpdateUserPasswordForm
              onBack={() => setChangePassword(false)}
              setSuccessModal={setSuccessModal}
            />
          )}
        </>
      )}

      {/* {loadingMutation && <LoadingScreen />} */}
    </div>
  );
};

export default UserProfile;
