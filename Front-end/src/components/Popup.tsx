// assets
import Close from '../assets/outline/component_type/Close';

interface ModalProps {
  isOpen: boolean;
  closeAction?: () => void;
  disableOverlayClick: boolean; // to close modal if overlay is clicked
  header?: string;
  type?: 'form' | 'toast';
  disableContentPadding?: boolean;
  disableXButton?: boolean;
  children: React.ReactNode;
}

const Popup = (props: ModalProps) => {
  const handleOverlayClick = (e: React.MouseEvent) => {
    // Close the modal only if the click was on the overlay (outside the modal content)
    if (e.target === e.currentTarget) {
      if (!props.disableOverlayClick) {
        props.closeAction && props.closeAction();
      }
    }
  };

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 transition-opacity duration-200 ${
        props.isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}
      onClick={handleOverlayClick}
    >
      <div
        className={`bg-white rounded-3xl shadow-lg w-11/12 transform transition-all duration-200 max-h-[95vh] overflow-y-auto ${
          props.isOpen ? 'scale-100' : 'scale-95'
        } ${props.type === 'form' ? 'max-w-[28rem]' : 'max-w-[35rem]'}`}
        style={{
          overflowY: 'auto',
          overflowX: 'hidden',
          scrollbarWidth: 'thin', // For Firefox
        }}
      >
        <div
          className={`relative flex items-center gap-4 py-5  ${
            props.header && 'border-b border-nt-150'
          } ${
            (props.closeAction && !props.disableXButton) || props.header === ''
              ? 'py-5 px-6'
              : 'py-8'
          }`}
        >
          {!props.disableXButton && props.closeAction && (
            <div>
              <Close
                color="#9497A3"
                hoverColor="#0046FA"
                onClick={props.closeAction}
              />
            </div>
          )}

          {props.header && (
            <div>
              <h4 className="text-nt-700">{props.header}</h4>
            </div>
          )}
        </div>
        <div className={`${!props.disableContentPadding && 'p-16 pt-5'}`}>
          {props.children}
        </div>
      </div>
    </div>
  );
};

export default Popup;
