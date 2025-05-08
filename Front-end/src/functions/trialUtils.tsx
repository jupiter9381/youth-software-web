import { useSelector } from 'react-redux';
import { RootState } from '../reducers/store';

interface TrialStatus {
  value: number;
  unit: 'days' | 'hours';
  formatted: string; // Returns "X days" or "X hours"
  isExpired: boolean;
  status: string;
  isCancelled?: boolean;
  name?: string;
  isSubscribed?: boolean;
}

const getTimeDiff = (endDate: string) => {
  const currentDate = new Date(); // Current date
  const trialEndDate = new Date(endDate); // Trial end date

  const timeDiff = trialEndDate.getTime() - currentDate.getTime(); // Time difference in milliseconds
  return timeDiff;
};

const getHoursAndDays = (timeDiff: number) => {
  const remainingDays = Math.floor(timeDiff / (1000 * 60 * 60 * 24)); // Convert to days
  const remainingHours = Math.floor(
    (timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
  ); // Convert to hours

  let diffLabel: string = '';
  if (remainingDays > 0)
    diffLabel = `${remainingDays} day${remainingDays > 1 ? 's' : ''}`;
  else diffLabel = `${remainingHours} hour${remainingHours > 1 ? 's' : ''}`;

  return { remainingDays, remainingHours, diffLabel };
};

export const useTrialStatus = (
  returnFormatted: boolean = true,
): TrialStatus => {
  const trial = useSelector((state: RootState) => state.authReducer.trial); // Access the trial from Redux
  if (!trial) {
    return {
      value: 0,
      unit: 'days',
      formatted: returnFormatted ? 'Your trial has expired.' : '0',
      isExpired: true,
      status: '',
    };
  }
  if (trial?.status === 'CANCELLED') {
    const timeDiff = getTimeDiff(trial.subscriptionEndDate);

    let formatted: string = '';
    if (timeDiff <= 0) formatted = 'Your subscription has expired';
    else {
      const { diffLabel } = getHoursAndDays(timeDiff);

      formatted = diffLabel;
    }

    return {
      value: 0,
      unit: 'days',
      formatted: formatted,
      isExpired: timeDiff <= 0 ? true : false,
      isCancelled: true,
      status: trial.status,
      name: trial.name,
    };
  }

  if (trial.isInTrial) {
    const timeDiff = getTimeDiff(trial.trialEndDate);

    if (timeDiff <= 0) {
      return {
        value: 0,
        unit: 'days',
        formatted: returnFormatted ? 'Trial period has expired.' : '0',
        isExpired: true,
        status: trial.status,
      };
    }

    const { remainingDays, remainingHours } = getHoursAndDays(timeDiff);

    if (remainingDays > 0) {
      return {
        value: remainingDays,
        unit: 'days',
        formatted: returnFormatted
          ? `${remainingDays} day${remainingDays > 1 ? 's' : ''}`
          : `${remainingDays}`,
        isExpired: false,
        status: trial.status,
      };
    } else {
      return {
        value: remainingHours,
        unit: 'hours',
        formatted: returnFormatted
          ? `${remainingHours} hour${remainingHours > 1 ? 's' : ''}`
          : `${remainingHours}`,
        isExpired: false,
        status: trial.status,
      };
    }
  }

  if (trial?.status === 'ACTIVE' || trial?.status === 'PAYMENT_PENDING') {
    if (trial.isSubscribed) {
      return {
        value: 0,
        unit: 'days',
        formatted: returnFormatted ? 'Your trial has expired.' : '0',
        isExpired: false,
        name: trial.name,
        isSubscribed: trial.isSubscribed,
        status: trial.status,
      };
    }
    return {
      value: 0,
      unit: 'days',
      formatted: returnFormatted ? 'Your trial has expired.' : '0',
      isExpired: false,
      status: trial.status,
    };
  }
  return {
    value: 0,
    unit: 'days',
    formatted: returnFormatted ? 'Your trial has expired.' : '0',
    isExpired: false,
    status: trial.status,
  };
};
