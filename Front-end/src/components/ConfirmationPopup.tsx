import Popup from './Popup';
import SystemsIcon from './SystemIcon';

const ConfirmationPopup = (props: {
  open: boolean;
  message?: string;
  closeAction: any;
  confirmAction: any;
}) => {
  return (
    <Popup
      isOpen={props.open}
      closeAction={props.closeAction}
      disableOverlayClick={false}
      disableXButton={false}
    >
      <div className="flex flex-col gap-8">
        <div className="flex justify-center">
          <SystemsIcon status="Warning" />
        </div>
        <div className="flex flex-col gap-5 items-center">
          <h3 className="text-center">Are you sure?</h3>
          <span className="text-center text-body-base-reg text-nt-700">
            {props.message
              ? props.message
              : 'Any unsaved changes will be lost.'}
          </span>
          <div className="flex gap-3">
            <button
              className=" base-btn bg-sys-rd600 text-white hover:bg-[#FF4C83]"
              onClick={props.confirmAction}
            >
              Yes, proceed!
            </button>
            <button
              className="secondary-btn base-btn"
              onClick={props.closeAction}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </Popup>
  );
};

export default ConfirmationPopup;
