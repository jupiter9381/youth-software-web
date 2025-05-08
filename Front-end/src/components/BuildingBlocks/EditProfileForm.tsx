// REACT
import { useEffect, useState } from 'react';
import { useForm, Controller, useWatch } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

// RTK
import { RootState } from '../../reducers/store';
import { useSelector } from 'react-redux';
import { useUsers } from '../../services/users/use-users';

// COMPONENTS
import FloatingLabelInput from '../FloatingLabelInput';
import DragImageUpload from '../DragImageUpload';
import ArrowLeft from '../../assets/outline/component_type/ArrowLeft';
import SystemsIcon from '../SystemIcon';
import Popup from '../Popup';

// useform
const schema = yup.object().shape({
  firstName: yup.string().required('First name is required!'),
  lastName: yup.string().required('First name is required!'),
  phone: yup.string().required('Phone is required!'),
  profilePicture: yup.mixed(),
});

interface EditProfileFormProps {
  onBack: () => void;
  // onSave?: (data: {
  //   firstName: string;
  //   lastName: string;
  //   email: string;
  //   phoneNumber?: string;
  //   profilePicture?: File | string;
  // }) => Promise<void>;
  setSuccessModal: any;
}

const EditProfileForm = ({ onBack, setSuccessModal }: EditProfileFormProps) => {
  const user = useSelector((state: RootState) => state.authReducer.user);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);

  const {
    getProfile,
    loadingMutation,
    updatePhoto,
    updateUserAccount,
    successMutation,
  } = useUsers();

  const initialValues = {
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    email: user?.email || '',
    phoneNumber: getProfile?.phone ? getProfile?.phone : '',
    profilePicture: '',
  };

  const { handleSubmit, control, formState, reset, watch, register, setValue } =
    useForm({
      resolver: yupResolver(schema),
    });

  const firstName = watch('firstName');
  const lastName = watch('lastName');
  const phone = watch('phone');

  const currentValues = useWatch({ control });

  // const [firstName, setFirstName] = useState(initialValues.firstName);
  // const [lastName, setLastName] = useState(initialValues.lastName);
  // const [phone, phone] = useState(initialValues.lastName);

  // Check if only the profile picture changed
  const isProfilePictureModified =
    initialValues.profilePicture !== currentValues.profilePicture;

  // const onSave = async (data: {
  //     firstName: string;
  //     lastName: string;
  //     email: string;
  //     phoneNumber?: string;
  //     profilePicture?: File | string;
  // }) => {
  //     if (data.profilePicture && typeof data.profilePicture !== "string") {
  //         const formData = new FormData();
  //         formData.append("photo", data.profilePicture);
  //         let res = await updatePhoto({
  //             file: data.profilePicture,
  //         });
  //         console.log("profile update: ", res);

  //         // If the mutation was successful, show the popup
  //         // if (!errorMutation && successMutation) {
  //         //     setShowSuccessPopup(true);
  //         // }
  //     }
  // };
  const onSaveLocal = async (data: any) => {
    const result = await updateUserAccount({
      firstName: firstName,
      lastName: lastName,
      phone: phone,
    });
    if (result.error) {
      console.log('error');
    } else {
      if (data.profilePicture && typeof data.profilePicture !== 'string') {
        const formData = new FormData();
        formData.append('file', data.profilePicture);
        await updatePhoto(formData);
      }
      setSuccessModal(true);
      onBack();
    }
  };

  useEffect(() => {
    if (!firstName && !lastName) {
      setValue('firstName', initialValues.firstName);
      setValue('lastName', initialValues.lastName);
      setValue('phone', initialValues.phoneNumber);
    }
  }, [initialValues]);

  if (!user) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-body-big-str text-nt-500">Loading profile data...</p>
      </div>
    );
  }

  return (
    <>
      <form
        onSubmit={handleSubmit(onSaveLocal)}
        className="flex flex-col bg-white w-full h-full"
      >
        {/* Header */}
        <div className="flex items-center px-6 py-3 gap-4 h-16 border-b border-nt-150">
          <button
            type="button"
            onClick={() => {
              reset();
              onBack();
            }}
          >
            <ArrowLeft hoverColor="#0046FA" />
          </button>
          <h4>Edit Profile</h4>
        </div>

        {/* Details Section */}
        <div className="flex flex-col p-10 justify-between h-full">
          <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-4">
              <h6 className="text-body-small-str text-nt-900">Details</h6>
              {/* const [firstName, setFirstName] = useState(initialValues.firstName);
  const [lastName, setLastName] = useState(initialValues.lastName); */}
              <FloatingLabelInput
                register={register}
                label="First name *"
                formField="firstName"
                value={firstName}
                error={!!formState.errors.firstName}
                helperText={formState.errors?.firstName?.message}
              />
              <FloatingLabelInput
                register={register}
                label="Last name *"
                value={lastName}
                formField="lastName"
                error={!!formState.errors.lastName}
                helperText={formState.errors?.lastName?.message}
              />
              <FloatingLabelInput
                label="Email *"
                value={initialValues.email}
                disabled
              />
              <FloatingLabelInput
                register={register}
                label="Phone number"
                formField="phone"
                value={phone}
                error={!!formState.errors.phone}
                helperText={formState.errors?.phone?.message}
              />
            </div>
            <div className="flex flex-col gap-4">
              <h6 className="text-body-small-str text-nt-900">Picture</h6>
              <Controller
                name="profilePicture"
                control={control}
                render={({ field }) => (
                  <DragImageUpload
                    imageDetails={{
                      data:
                        typeof field.value === 'string' ? null : field.value,
                      setImageDetails: (file) => field.onChange(file),
                    }}
                    note="Upload your profile picture"
                    error={!!formState.errors.profilePicture}
                    helperText={
                      formState.errors.profilePicture?.message as string
                    }
                  />
                )}
              />
            </div>
          </div>
          {/* Footer */}
          <button
            type="submit"
            className={`rounded-lg py-3 text-body-small-str ${
              !(
                !isProfilePictureModified &&
                firstName !== initialValues.firstName &&
                lastName !== initialValues.lastName &&
                phone !== initialValues.phoneNumber
              )
                ? 'bg-pm-500 text-white'
                : 'bg-nt-150 text-nt-400 cursor-not-allowed'
            }`}
            disabled={
              !isProfilePictureModified &&
              firstName === initialValues.firstName &&
              lastName === initialValues.lastName &&
              phone === initialValues.phoneNumber
            }
          >
            {loadingMutation ? 'Saving...' : 'Save changes'}
          </button>
        </div>
      </form>

      <Popup
        isOpen={successMutation && showSuccessPopup}
        closeAction={() => {
          setShowSuccessPopup(false);
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
            <h3 className="text-center">Profile Picture Updated</h3>
            <span className="text-center text-body-base-reg text-nt-700">
              Your profile picture has been successfully updated.
            </span>
          </div>
        </div>
      </Popup>
    </>
  );
};

export default EditProfileForm;
