// REACT
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

// RTK
import { RootState } from '../../reducers/store';
import { useSelector } from 'react-redux';
import { useUsers } from '../../services/users/use-users';

// COMPONENTS
import FloatingLabelInput from '../FloatingLabelInput';
import ArrowLeft from '../../assets/outline/component_type/ArrowLeft';
import SystemsIcon from '../SystemIcon';
import Popup from '../Popup';
import { handleValidationError } from '../../functions/handleValidationError';

// useform
const schema = yup.object().shape({
  currentPassword: yup.string().required('Password is required!'),
  password: yup.string().required('New password is required!'),
  confirmPassword: yup.string().required('Confirm new password is required!'),
});

interface EditProfileFormProps {
  onBack: () => void;
  setSuccessModal: any;
}

const UpdateUserPasswordForm = ({
  onBack,
  setSuccessModal,
}: EditProfileFormProps) => {
  const user = useSelector((state: RootState) => state.authReducer.user);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);

  const { loadingMutation, successMutation, updateUserPassword } = useUsers();

  const { handleSubmit, formState, reset, watch, register, setError } = useForm(
    {
      resolver: yupResolver(schema),
    },
  );

  const [showPassword, setShowPassword] = useState([false, false, false]);

  const currentPassword = watch('currentPassword');
  const password = watch('password');
  const confirmPassword = watch('confirmPassword');

  const { isValid } = formState;

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
  // const onSaveLocal = async (data: {
  //     // firstName: string;
  //     // lastName: string;
  //     // email: string;
  //     // phoneNumber?: string;
  //     // profilePicture?: File | string;
  //     password: string;
  //     newPassword: string;
  //     confirmNewPassword: string;
  // }) => {
  //     // if (data.profilePicture && typeof data.profilePicture !== "string") {
  //     //     const formData = new FormData();
  //     //     formData.append("photo", data.profilePicture);
  //     //     await updatePhoto({ file: data.profilePicture });
  //     // }

  //     // Call parent’s onSave if provided
  //     let result = await onSave?.(data);
  // };

  const submitPasswordChanges = async (data: {
    currentPassword: string;
    password: string;
    confirmPassword: string;
  }) => {
    const result = await updateUserPassword(data);

    if (result.error) {
      if ('data' in result.error) {
        const message = handleValidationError(result.error, setError);
        if (!message?.field) {
          if (
            typeof message?.message === 'string' ||
            message?.message === undefined
          ) {
            setError('currentPassword', {
              type: 'manual',
              message: message?.message,
            });
            // setWarningMessage(message?.message ?? "");
            // setShowWarning(true);
          }
        }
      }
    } else {
      reset();
      setSuccessModal(true);
      onBack();
    }

    // if (data.profilePicture) {
    //     // Create a FormData object
    //     const formData = new FormData();
    //     formData.append("file", data.profilePicture);
    //     await updatePhoto(formData);
    //     // setSuccessModal(true);
    //     setProfileEdit(false);
    //     refetchGetProfile();
    // }
  };

  if (!user) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-body-big-str text-nt-500">Loading password...</p>
      </div>
    );
  }

  return (
    <>
      <form
        onSubmit={handleSubmit(submitPasswordChanges)}
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
          <h4>Change password</h4>
        </div>

        {/* Details Section */}
        <div className="flex flex-col p-10 justify-between h-full">
          <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-4">
              <h6 className="text-body-small-str text-nt-900">
                Current password
              </h6>

              <FloatingLabelInput
                register={register}
                label="Password"
                type="password"
                formField="currentPassword"
                value={currentPassword}
                showPassword={showPassword[0]}
                passwordAction={() => {
                  setShowPassword((prev) =>
                    prev.map((item, index) => (index === 0 ? !item : item)),
                  );
                }}
                error={!!formState.errors.currentPassword}
                helperText={formState.errors?.currentPassword?.message}
              />
            </div>
            <div className="flex flex-col gap-4">
              <h6 className="text-body-small-str text-nt-900">New password</h6>

              <FloatingLabelInput
                register={register}
                label="Create password"
                type="password"
                formField="password"
                value={password}
                showPassword={showPassword[1]}
                passwordAction={() => {
                  setShowPassword((prev) =>
                    prev.map((item, index) => (index === 1 ? !item : item)),
                  );
                }}
                error={!!formState.errors.password}
                helperText={formState.errors?.password?.message}
              />

              <FloatingLabelInput
                register={register}
                label="Confirm password"
                type="password"
                formField="confirmPassword"
                value={confirmPassword}
                showPassword={showPassword[2]}
                passwordAction={() => {
                  setShowPassword((prev) =>
                    prev.map((item, index) => (index === 2 ? !item : item)),
                  );
                }}
                error={!!formState.errors.confirmPassword}
                helperText={formState.errors?.confirmPassword?.message}
              />
            </div>
          </div>
          {/* Footer */}
          <button
            type="submit"
            className={`rounded-lg py-3 text-body-small-str ${
              isValid
                ? 'bg-pm-500 text-white'
                : 'bg-nt-150 text-nt-400 cursor-not-allowed'
            }`}
            disabled={!isValid || loadingMutation}
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

export default UpdateUserPasswordForm;
