import { FetchBaseQueryError } from '@reduxjs/toolkit/query';

interface ErrorMessage {
  field: string;
  error: string;
}

export const handleValidationError = (
  error: FetchBaseQueryError,
  setError: (field: any, options: { type: string; message: string }) => void,
) => {
  if (error.data && typeof error.data === 'object' && 'message' in error.data) {
    const message = (error.data as { message: ErrorMessage[] | string })
      .message;

    if (Array.isArray(message) && message.length > 0) {
      // Define valid field names
      const validFields: any[] = [message[0].field];

      // Check if the field is in the valid fields list
      if (validFields.includes(message[0].field as any)) {
        setError(message[0].field as any, {
          type: 'manual',
          message: message[0].error,
        });
        return { field: message[0].field, message: message[0].error };
      } else {
        // Handle unexpected field names
        console.error(`Unexpected field: ${message[0].field}`);
      }
    } else {
      return { message };
    }
  } else {
    setError('email', {
      type: 'manual',
      message: 'An error occurred while validating the email.',
    });
  }
};
