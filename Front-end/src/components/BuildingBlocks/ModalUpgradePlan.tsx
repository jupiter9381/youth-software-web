import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

// Components
import FloatingLabelInput from '../FloatingLabelInput';
import FloatingLabelSelect from '../FloatingLabelSelect';
import Popup from '../Popup';
import DragImageUpload from '../DragImageUpload';

// Validation Schema
const schema = yup.object().shape({
  agencyName: yup.string().required('Agency name is required!'),
  country: yup.string().required('Country is required!'),
});

interface ModalUpgradePlanProps {
  openFormModal: boolean;
  closeAction: () => void;
}

const ModalUpgradePlan = ({
  openFormModal,
  closeAction,
}: ModalUpgradePlanProps) => {
  // React Hook Form
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
    clearErrors,
  } = useForm({
    resolver: yupResolver(schema),
  });

  // Ensure `watch("image")` always returns `File | null`
  const agencyName = watch('agencyName');
  const [imageDetails, setImageDetails] = useState<any | null>(null);

  // Fetch Countries
  const [countries, setCountries] = useState<{ id: number; label: string }[]>(
    [],
  );
  const [countriesLoading, setCountriesLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await fetch('https://restcountries.com/v3.1/all');
        const data = await response.json();

        const sortedCountries = data
          .map((country: any, index: number) => ({
            id: index,
            label: country.name.common,
          }))
          .sort((a: any, b: any) => a.label.localeCompare(b.label));

        setCountries(sortedCountries);
      } catch (error) {
        console.error('Error fetching countries:', error);
      } finally {
        setCountriesLoading(false);
      }
    };

    fetchCountries();
  }, []);

  // Form Submit
  const onSubmit = (data: any) => {
    alert('There is still no backend endpoint here at the moment');
    console.log('Form Submitted:', data);
    closeAction();
  };

  return (
    <Popup
      isOpen={openFormModal}
      closeAction={closeAction}
      header="Upgrade to Business Plan"
      disableOverlayClick={true}
      type="form"
      disableContentPadding={true}
    >
      <form
        className="flex flex-col gap-8 p-10"
        onSubmit={handleSubmit(onSubmit)}
      >
        {/* Agency Name Input */}
        <FloatingLabelInput
          register={register}
          formField="agencyName"
          label="Agency name"
          value={agencyName}
          error={!!errors.agencyName}
          helperText={errors.agencyName?.message}
          flex={1}
        />

        {/* Country Select Dropdown */}
        {countriesLoading ? (
          <div className="flex justify-center">
            <div className="w-12 h-12 border-4 border-blue-500 border-solid border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : (
          <FloatingLabelSelect
            label="Country"
            value={watch('country')}
            searchable
            onChange={(value) => {
              setValue('country', value, { shouldValidate: true });
              clearErrors('country');
            }}
            options={countries}
            error={!!errors.country}
            helperText={errors.country?.message}
            flex={1}
          />
        )}

        {/* Image Upload */}
        <div className="gap-1 flex flex-col">
          <DragImageUpload
            note="Drag your logo here"
            imageDetails={{
              data: imageDetails,
              setImageDetails,
            }}
          />
        </div>

        {/* Submit Button */}
        <button type="submit" className="primary-btn base-btn w-full">
          Start your free 7-day trial
        </button>
      </form>
    </Popup>
  );
};

export default ModalUpgradePlan;
