import { useEffect, useState } from 'react';

// libraries
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useSelector } from 'react-redux';
import * as yup from 'yup';

// hooks
import { RootState } from '../reducers/store';
import { useOrganisations } from '../services/organisations/use-organisations';
// import { useUsers } from "../services/users/use-users";

//slice
import { setOrgDetails } from '../reducers/organisationSlice';

// functions
import { handleValidationError } from '../functions/handleValidationError';

// Assets
// import PlusIcon from "../assets/outline/Plus.svg";
import AgencyLogo from '../assets/filled/Group.svg';

// components
import Avatar from './Avatar';
import Popup from './Popup';
// import FloatingLabelSelect from "./FloatingLabelSelect";
// import LoadingScreen from "./LoadingScreen";
import SystemsIcon from './SystemIcon';
import X from '../assets/outline/component_type/X';
import PlusIcon from '../assets/outline/component_type/PlusIcon';
import ModalForm from '../pages/AddressBook/components/ModalForm';
import { useDispatch } from 'react-redux';
import { setFaviconState } from '../reducers/faviconSlice';
import { capitalizeFirstLetter } from '../functions/capitalizeFirstLetter';
// import Banner from "./Banner";
import ModalUpgradePlan from './BuildingBlocks/ModalUpgradePlan';
// Mock data for team members
// const teamMembersMock: any[] = [
//     // {
//     //     firstName: "Jessica",
//     //     lastName: "Whyte",
//     //     role: "Client manager",
//     //     initials: "JW",
//     // },
//     // {
//     //     firstName: "John",
//     //     lastName: "Smith",
//     //     role: "Client manager",
//     //     initials: "JS",
//     // },
// ];

const schema = yup.object().shape({
  firstName: yup.string().required('First name is required!'),
  lastName: yup.string().required('Last name is required!'),
  email: yup.string().email().required('Email is required!'),
  role: yup.string().required('Role is required!'),
  position: yup.string().required('Position is required!'),
});

const AgencyProfile = (props: {
  adjust: boolean | null;
  isOpen: boolean;
  adjustedCloseAction: () => void;
  editMode?: true;
  isBusiness?: boolean;
}) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
    setValue,
    setError,
    clearErrors,
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  // INPUT FIELDS
  const firstName = watch('firstName');
  const lastName = watch('lastName');
  const email = watch('email');
  const role = watch('role');
  const position = watch('position');

  const [teamMembers, setTeamMembers] = useState<null | any[]>(null);

  const [fetchLoading, setFetchLoading] = useState(false);

  // POPUP
  const [isAgencyOpened, setIsAgencyOpened] = useState(true);
  const [closing, setClosing] = useState(false);

  const [showInviteFormPopup, setShowInviteFormPopup] =
    useState<boolean>(false);
  const [showWarningPopup, setShowWarningPopup] = useState<boolean>(false);
  const [showSuccessPopup, setshowSuccessPopupPopup] = useState<boolean>(false);

  const handleClose = () => {
    setClosing(true);
    setTimeout(() => {
      setClosing(false);
      setIsAgencyOpened(false);
    }, 300);
  };

  // DETAILS
  const [organisationsDetails, setOrganisationsDetails] = useState<any | null>(
    null,
  );
  const [profileDetails, setProfileDetails] = useState<any | null>(null);

  // RTK HOOKS
  const {
    getOrganisation,
    getOrganisationMembers,
    invitationsAction,
    loadingMutation,
    successMutation,
  } = useOrganisations({
    fetchAll: true,
  });

  // SLICES
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.authReducer.user);
  const orgId = useSelector(
    (state: RootState) => state.authReducer.userOrganisationId,
  );

  const userRole = useSelector((state: RootState) => state.authReducer.role);

  // ============================= TYPE SOLO BANNER  =============================
  const [openBannerPopup, setOpenBannerPopup] = useState(false);

  //pagination
  // const [total, setTotal] = useState(0);
  const page = 1;
  const limit = 9;
  // const [page, setPage] = useState(1);
  // const [limit, setLimit] = useState(10);
  const [totalMembers, setTotalMembers] = useState(0);

  // State for transformed data

  // FUNCTIONS
  const fetchOrganisationMembers = async () => {
    try {
      setFetchLoading(true);
      const result = await getOrganisationMembers({
        page: page, // Replace with the desired page value
        limit: limit, // Replace with the desired limit value
        filters: {}, // Add any filters if necessary
      }).unwrap(); // Unwrap the result for easier access

      if (result?.data && profileDetails) {
        // Transform and set data directly
        const transformedData = result.data
          .filter(
            (item: any) =>
              item.active === true && item.email !== profileDetails?.email,
          )
          .map((item: any) => ({
            id: item.id,
            name: `${item.firstName} ${item.lastName}`,
            email: item.email,
            role: item.role,
            createdAt: new Date(item.createdAt).toLocaleString(),
          }));

        // const matchingItemIndex = transformedData.findIndex(
        //     (item: any) => {
        //         return (
        //             item.name.toLowerCase() ===
        //             `${firstName} ${lastName}`.toLowerCase()
        //         );
        //     }
        // );

        // if (matchingItemIndex !== -1) {
        //     const [matchingItem] = transformedData.splice(
        //         matchingItemIndex,
        //         1
        //     );
        //     transformedData.unshift(matchingItem);
        // }

        // find user
        // move the user to the top

        const { email: emailUser } = profileDetails;

        const resultUser = await getOrganisationMembers({
          page: 1, // Replace with the desired page value
          limit: 5, // Replace with the desired limit value
          filters: {
            id: emailUser,
            name: emailUser,
            email: emailUser,
          }, // Add any filters if necessary
        }).unwrap(); // Unwrap the result for easier access

        const transformedDataUser = resultUser.data
          .filter((item: any) => item.active === true)
          .map((item: any) => ({
            id: item.id,
            name: `${item.firstName} ${item.lastName}`,
            email: item.email,
            role: item.role,
            createdAt: new Date(item.createdAt).toLocaleString(),
          }));

        console.log(resultUser);

        setTeamMembers([...transformedDataUser, ...transformedData]);

        setTotalMembers(result.data.total + 1);
        setFetchLoading(false);
      }
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      setFetchLoading(false);
    }
  };

  const submitInvitations = async (values: any) => {
    const result = await invitationsAction({
      url: '/organisations/invite',
      postDetails: {
        firstName: values.firstName,
        lastName: values.lastName,
        email: values.email,
        role: values.role.toUpperCase(),
        position: position,
      },
    });

    if (result.error) {
      if ('data' in result.error) {
        const message = handleValidationError(result.error, setError);
        if (!message?.field) {
          if (
            typeof message?.message === 'string' ||
            message?.message === undefined
          ) {
            setError('email' as any, {
              type: 'manual',
              message: message?.message ?? '',
            });
          }
        }
      }
    } else {
      setShowInviteFormPopup(false);
      setshowSuccessPopupPopup(true);
    }
  };

  const deleteAgency = () => {};

  useEffect(() => {
    if (orgId) fetchOrganisationMembers();
  }, [page, orgId, profileDetails]);

  useEffect(() => {
    // GET ORG DETAILS
    if (getOrganisation) {
      setOrganisationsDetails(getOrganisation);
      dispatch(
        setOrgDetails({
          name: getOrganisation.name,
          type: getOrganisation.type,
          countryCode: getOrganisation.countryCode,
          phoneNumber: getOrganisation.phoneNumber,
          industry: getOrganisation.industry,
          trial: {
            organisationId: getOrganisation.trial?.organisationId ?? null,
            startDate: getOrganisation.trial?.startDate ?? null,
            durationInDays: getOrganisation.trial?.durationInDays ?? null,
          },
        }),
      );

      dispatch(setFaviconState(getOrganisation.branding.favicon));
    }
    if (user) {
      setProfileDetails(user);
    }
    if (props.adjust) {
      setIsAgencyOpened(true);
    }
  }, [getOrganisation, user, props.adjust]);

  return (
    <>
      <div
        className={`flex border-nt-150 relative z-40 ${
          props.isOpen && 'h-full w-0'
        } ${props.isBusiness && '2xl:border-l'}`}
      >
        {/* <div className={`w-[300px] p-10 relative h-full flex flex-col justify-between border-l border-nt-150 ${isAgencyExpanded ? "animate-slide-in" : "animate-slide-out"}`}> */}

        {/* Background overlay */}
        <div
          className={`2xl:relative fixed  inset-0 bg-black/25 z-40 transition-opacity ${
            props.isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
          onClick={props.adjustedCloseAction}
        ></div>

        {/* Agency profile component */}
        <div
          className={`2xl:relative fixed top-0 right-0 z-50  h-full overflow-y-auto flex flex-col justify-between
                        2xl:bg-transparent ${
                          props.isBusiness && 'bg-white'
                        } transform transition-transform duration-300 ease-in-out ${
                          props.adjust
                            ? props.isOpen
                              ? 'translate-x-0'
                              : 'translate-x-full'
                            : ''
                        }`}
        >
          {/* Agency Expanded */}
          <div
            className={`${
              isAgencyOpened && 'w-[300px]'
            } h-full flex flex-col justify-between slide-left ${
              props.isBusiness ? 'p-10' : 'py-4 pr-4'
            }`}
            style={{
              display: isAgencyOpened ? '' : 'none',
              transform:
                isAgencyOpened && !closing
                  ? 'translateX(0)'
                  : 'translateX(150px)',
              opacity: isAgencyOpened && !closing ? 1 : 0,
              pointerEvents: isAgencyOpened && !closing ? 'auto' : 'none',
              zIndex: isAgencyOpened || closing ? 99 : -1,
            }}
          >
            {/* close */}
            {props.isBusiness ? (
              <>
                <div
                  className="absolute cursor-pointer"
                  onClick={
                    !props.adjust ? handleClose : props.adjustedCloseAction
                  }
                >
                  <X hoverColor={'#0046FA'} />
                </div>
                {/* Agency Content */}
                <div className="grid gap-8">
                  {/* Top Section - Company Logo */}
                  <div className="flex flex-col items-center gap-4">
                    <img
                      src={
                        organisationsDetails
                          ? (organisationsDetails.branding.logo ?? AgencyLogo)
                          : ''
                      }
                      alt="Organisation Logo"
                      className="w-20 h-20"
                    />
                    <h4>
                      {organisationsDetails
                        ? organisationsDetails.name
                        : 'Made Neat.'}{' '}
                    </h4>
                  </div>

                  {/* Horizontal Divider */}
                  <hr className="border-t border-gray-300 my-4" />

                  {/* Team Members Section */}
                  <div className="flex flex-col gap-4 ">
                    {fetchLoading ? (
                      <div className="flex items-center justify-center">
                        <div className="w-12 h-12 border-4 border-blue-500 border-solid border-t-transparent rounded-full animate-spin"></div>
                      </div>
                    ) : (
                      <>
                        {totalMembers === 0 ? (
                          <p className="text-body-small-str text-nt-700 text-center">
                            No team members for now.
                          </p>
                        ) : (
                          <>
                            <p className="text-caption-all-caps uppercase text-nt-300">
                              Team Members
                            </p>

                            <div
                              className="flex flex-col gap-4 overflow-auto mb-3 max-h-[40vh]"
                              style={{
                                overflowY: 'auto',
                                overflowX: 'hidden',
                                scrollbarWidth: 'thin', // For Firefox
                              }}
                            >
                              {teamMembers &&
                                teamMembers.map((member, index) => (
                                  <div
                                    key={index}
                                    className="flex items-center gap-4"
                                  >
                                    <Avatar
                                      firstName={member.name.split(' ')[0]}
                                      lastName={member.name.split(' ')[1]}
                                      imgUrl={member.imgUrl}
                                    />
                                    <div className="flex flex-col w-max">
                                      <div className="flex flex-row gap-2">
                                        <span
                                          className={`text-body-base-reg ${
                                            member.isActive
                                              ? 'text-body-base-str text-nt-900'
                                              : 'text-nt-700'
                                          }`}
                                        >
                                          {`${capitalizeFirstLetter(
                                            member.name.split(' ')[0],
                                          )} ${capitalizeFirstLetter(
                                            member.name
                                              .split(' ')
                                              .slice(1)
                                              .join(' '),
                                          )}`}
                                        </span>

                                        {index === 0 && (
                                          <span className="bg-pm-50 text-pm-500 text-xs font-semibold px-2 py-1 rounded">
                                            You
                                          </span>
                                        )}
                                      </div>

                                      <span className="text-body-small-reg text-nt-300">
                                        {member.role}
                                      </span>
                                    </div>
                                  </div>
                                ))}
                            </div>
                          </>
                        )}
                      </>
                    )}
                  </div>
                </div>
                {props.editMode ? (
                  <>
                    {/* {userRole === "OWNER" && (
                                            <button
                                                className='ghost-btn text-sys-rd600 hover:bg-gray-200'
                                                onClick={() => {
                                                    setShowWarningPopup(true);
                                                }}
                                            >
                                                Delete agency
                                            </button>
                                        )} */}
                  </>
                ) : (
                  <>
                    {/* Invite Team Member Button */}
                    {userRole !== 'MEMBER' && (
                      <button
                        className="secondary-btn base-btn"
                        onClick={() => {
                          setShowInviteFormPopup(true);
                        }}
                      >
                        <PlusIcon color="#0046FA" />
                        <p className="text-body-small-reg">
                          Invite Team Member
                        </p>
                      </button>
                    )}
                  </>
                )}
              </>
            ) : (
              <></>
              // <Banner
              //     contents="To invite team members, modify forms, edit branding and create custom templates"
              //     orientation="vertical"
              //     upgradeAction={() => setOpenBannerPopup(true)}
              //     closeAction={props.adjustedCloseAction}
              // />
            )}
          </div>
          {/* Agency Collapsed */}
          <div
            className={`h-full cursor-pointer ${
              props.isBusiness ? 'p-10' : 'p-10'
            }`}
            style={{
              display: !isAgencyOpened ? '' : 'none',
            }}
            onClick={() => setIsAgencyOpened(true)}
          >
            <img
              src={organisationsDetails?.branding?.logo || AgencyLogo}
              alt="Organisation Logo"
              className="w-10 h-10"
            />
          </div>
        </div>
      </div>
      <ModalUpgradePlan
        openFormModal={openBannerPopup}
        closeAction={() => {
          setOpenBannerPopup(false);
        }}
      />

      {/* <Popup
                isOpen={showInviteFormPopup}
                closeAction={() => {
                    setShowInviteFormPopup(false);
                    reset();
                }}
                disableOverlayClick={false}
                header="Invite team member"
                type="form"
                disableContentPadding={true}
            >
                <form
                    className="flex flex-col gap-5 p-10"
                    onSubmit={handleSubmit(submitInvitations)}
                >
                    <div className="flex md:gap-2.5 gap-5 md:flex-row flex-col">
                        <FloatingLabelInput
                            register={register}
                            formField="firstName"
                            label="First name"
                            value={firstName}
                            error={!!errors.firstName}
                            helperText={errors.firstName?.message}
                        />

                        <FloatingLabelInput
                            register={register}
                            formField="lastName"
                            label="Last name"
                            value={lastName}
                            error={!!errors.lastName}
                            helperText={errors.lastName?.message}
                        />
                    </div>
                    <FloatingLabelInput
                        register={register}
                        formField="email"
                        label="Email"
                        value={email}
                        error={!!errors.email}
                        helperText={errors.email?.message}
                        // onChange={() => {
                        //     clearErrors("email");
                        // }}
                    />

                    <button
                        type="submit"
                        className="primary-btn base-btn"
                        // onClick={submit}
                    >
                        Invite
                    </button>
                </form>
            </Popup> */}

      <ModalForm
        openFormModal={showInviteFormPopup}
        closeAction={() => {
          // setOpenFormModal(false);
          // setToDeleteEditDetails(null);
          setShowInviteFormPopup(false);
          reset();
        }}
        formType={'member'}
        formMode={'new'}
        handleSubmit={handleSubmit(submitInvitations)}
        loadingMutation={loadingMutation}
        register={register}
        errors={errors}
        clearErrors={clearErrors}
        setValue={setValue}
        firstName={firstName}
        lastName={lastName}
        email={email}
        phone={''}
        company={''}
        role={role}
        position={position}
      />

      <Popup
        isOpen={showWarningPopup}
        closeAction={() => setShowWarningPopup(false)}
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
              {`Are you sure you want to delete ${
                organisationsDetails && organisationsDetails.name
              }`}
            </span>
            <div className="flex gap-3">
              <button
                className=" base-btn bg-sys-rd600 text-white hover:bg-[#FF4C83]"
                onClick={deleteAgency}
              >
                Yes, delete
              </button>
              <button
                className="secondary-btn base-btn"
                onClick={() => setShowWarningPopup(false)}
              >
                Cancel deletion
              </button>
            </div>
          </div>
        </div>
      </Popup>
      {/* {loadingMutation && <LoadingScreen />} */}
      <Popup
        isOpen={successMutation && showSuccessPopup}
        closeAction={() => {
          setShowInviteFormPopup(false);
          setshowSuccessPopupPopup(false);
          reset();
        }}
        disableOverlayClick={false}
        disableXButton={false}
      >
        <div className="flex flex-col gap-8">
          <div className="flex justify-center">
            <SystemsIcon status="Success" />
          </div>
          <div className="flex flex-col gap-5 items-center">
            <h3 className="text-center">Invitation Successful</h3>
            <span className="text-center text-body-base-reg text-nt-700">
              The invitation has been sent.
            </span>
          </div>
        </div>
      </Popup>
    </>
  );
};

export default AgencyProfile;
