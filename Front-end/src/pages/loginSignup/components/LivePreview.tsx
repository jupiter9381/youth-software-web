import { useEffect } from 'react';

// assets
import CheckGreen from '../../../assets/filled/CheckGreen.svg';

// Components
import FloatingLabelInput from '../../../components/FloatingLabelInput';
import FloatingLabelSelect from '../../../components/FloatingLabelSelect';

const LivePreview = (props: {
  logoPreview: { data: any; setLogoPreview: any };
  fullNamePreview: string;
  agencyPreview: string;
}) => {
  const points = [
    'Encrypted At-Rest Storage',
    'GDPR compliant',
    'Zero Key Storage',
    'AES-256 Encryption',
    'Your data will be destroyed within the timeframe you choose below',
  ];

  useEffect(() => {
    props.logoPreview.setLogoPreview(null);
  }, []);

  return (
    <div className="h-full flex flex-col gap-[35px]">
      <div className="flex flex-col items-center gap-6">
        <h2 className="text-center">Live Preview</h2>
        <span className="text-center text-body-base-reg text-nt-700">
          This is a live preview example of a branded login details request
          form. Upload your logo to see how it would look for your business. You
          can also customize it later in Settings.
        </span>
      </div>
      <div>
        <div className="bg-white rounded-[20px]">
          <div className="flex flex-col items-center justify-center py-[24px] px-[35px] gap-[15px] border-b  border-b-nt-150 ">
            <img
              className="w-[55px]"
              src={props.logoPreview.data ? props.logoPreview.data : ''}
              alt=""
            />
            <span className="text-center">
              {props.fullNamePreview} from{' '}
              {props.agencyPreview ? props.agencyPreview : '[ENTER TITLE]'} has
              requested login details from you
            </span>
          </div>
          <div className="flex flex-col lg:flex-row items-center justify-center border-b  border-b-nt-150">
            <div className="flex-1 flex flex-col gap-[15px] lg:py-[35px] lg:px-[35px] p-[20px] w-full">
              <FloatingLabelInput label="URL" value={''} disabled />
              <FloatingLabelInput label="Login" value={''} disabled />
              <FloatingLabelInput label="Password" value={''} disabled />
            </div>
            <div className="flex-1 flex flex-col gap-4 lg:py-[35px] lg:px-[35px] p-5 border-l border-l-nt-150">
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
          </div>
          <div className="flex items-center flex-col lg:flex-row">
            <div className="flex-1 lg:py-[35px] lg:px-[35px] p-[20px] w-full">
              <FloatingLabelSelect
                label="Destroy this info"
                value={'In 60 minutes'}
                disabled
                options={[{ id: 1, label: 'In 60 minutes' }]}
                onChange={() => {}}
              />
            </div>
            <div className="flex-1 w-full  lg:py-[35px] lg:px-[35px] p-[20px]">
              <div className="bg-nt-50 py-[9px] px-[18px] flex flex-col lg:flex-row items-center gap-[25px] rounded-[10px]">
                <span className="text-body-small-reg text-nt-400">
                  By submitting I consent to share this information.
                </span>
                <button className="bg-pm-500 text-nt-50 small-btn w-full lg:w-auto">
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="h-[40px] w-full" style={{ height: '40px' }}>
        {'\u200B'}
      </div>
    </div>
  );
};

export default LivePreview;
