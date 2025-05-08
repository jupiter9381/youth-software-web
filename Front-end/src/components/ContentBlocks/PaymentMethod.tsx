import StatusChip from './StatusChip';
import MasterCard from '../../assets/logos&Illustrations/Mastercard.svg';
//import EditIcon from '../../assets/outline/Pencil.svg';
import TrashIcon from '../../assets/outline/Trash.svg';

interface PaymentMethodProps {
  paymentMethod: 'mastercard' | 'visa';
  cardNumber: string; // Last 4 digits of the card number
  status?: 'Primary' | 'Secondary'; // Status of the card
  onEdit?: () => void; // Edit action callback
  onDelete?: () => void; // Delete action callback
}

const paymentIcons: { [key: string]: string } = {
  mastercard: MasterCard,
};

// Helper function to mask card number, showing only the last 4 digits
const maskCardNumber = (cardNumber: string) => {
  const lastFour = cardNumber.slice(-4);
  return `•••• •••• •••• ${lastFour}`;
};

const PaymentMethod = ({
  paymentMethod,
  cardNumber,
  status = 'Primary',
  //onEdit,
  onDelete,
}: PaymentMethodProps) => {
  return (
    <div className="flex px-6 py-3 w-full justify-between items-center hover:bg-nt-100 rounded-3xl">
      {/* Left Section: Logo, Masked Card Number, Status */}
      <div className="flex gap-4 items-center">
        <img
          src={paymentIcons[paymentMethod]}
          alt={`${paymentMethod} Logo`}
          className="w-7"
        />
        <p className="text-body-base-reg text-nt-900">
          {maskCardNumber(cardNumber)}
        </p>
        <StatusChip
          label={status}
          status={status.toLowerCase() === 'primary' ? 'system' : 'custom'}
        />
      </div>

      {/* Right Section: Edit and Delete Buttons */}
      <div className="flex gap-4">
        {/* <button
          className="secondary-btn ghost-btn flex items-center gap-2"
          onClick={onEdit}
        >
          <img src={EditIcon} alt="Edit" />
          <p className="text-caption-reg">Edit</p>
        </button> */}
        <button
          className="secondary-btn ghost-btn flex items-center gap-2"
          onClick={onDelete}
        >
          <img src={TrashIcon} alt="Trash" />
          <p className="text-caption-reg">Delete</p>
        </button>
      </div>
    </div>
  );
};

export default PaymentMethod;
