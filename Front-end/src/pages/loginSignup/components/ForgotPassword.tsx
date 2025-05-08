import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import FloatingLabelInput from '../../../components/FloatingLabelInput';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../services/auth/use-auth';
import LoadingScreen from '../../../components/LoadingScreen';
import Popup from '../../../components/Popup';
import SystemsIcon from '../../../components/SystemIcon';

const schema = yup.object().shape({
  email: yup
    .string()
    .email('Invalid email address!')
    .required('Email is required!'),
});

const ForgotPassword = () => {
  const navigate = useNavigate();
  const { forgotPassword, loadingMutation, successMutation } = useAuth();
  const {
    handleSubmit,
    register,
    formState: { errors },
    watch,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const email = watch('email');

  const [openModal, setOpenModal] = useState(false);

  const submit = async () => {
    const userDetails = {
      email: email,
    };
    await forgotPassword(userDetails);
    setOpenModal(true);
  };
  return (
    <>
      <form
        onSubmit={handleSubmit(submit)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            e.preventDefault(); // Prevents accidental form submission
            handleSubmit(submit)(); // Manually triggers form submission
          }
        }}
        className="flex flex-col md:w-full sm:w-[70%] w-full lg:gap-6 gap-5 lg:px-5"
      >
        <h3 className="font-sans md:text-start text-center">
          Forgot password?
        </h3>
        <span className="text-body-base-reg text-nt-700">
          Don't worry! Just enter your email and we’ll send you a link to reset
          password.
        </span>
        <div className="flex flex-col gap-5">
          <FloatingLabelInput
            register={register}
            type="email"
            formField="email"
            label="Email"
            value={email}
            error={!!errors.email}
            helperText={errors.email?.message}
            flex={1}
          />
        </div>
        <button type="submit" className="primary-btn base-btn mt-2">
          Send email
        </button>
      </form>
      <div className="flex justity-center">
        <span
          className="text-pm-500 cursor-pointer hover:underline"
          onClick={() => navigate('/')}
        >
          {' '}
          Back to login
        </span>
      </div>
      {loadingMutation && <LoadingScreen />}
      <Popup
        isOpen={openModal && successMutation}
        closeAction={() => {
          setOpenModal(false);
        }}
        disableOverlayClick={true}
      >
        <div className="flex flex-col gap-8">
          <div className="flex justify-center">
            <SystemsIcon status="Success" />
          </div>
          <div className="flex flex-col gap-5 items-center">
            <h3 className="text-cente">Link sent</h3>
            <span className="text-center text-body-base-reg text-nt-700">
              Check your inbox. we've sent you an email to {email} with a link
              to reset your password.
            </span>
          </div>
        </div>
      </Popup>
    </>
  );
};

export default ForgotPassword;
