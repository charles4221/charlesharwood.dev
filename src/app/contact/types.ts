export type ContactFormFields = {
  firstName: string;
  lastName: string;
  email: string;
  company: string;
  website: string;
  description: string;
};

export type ContactFormRequiredFields =
  | 'firstName'
  | 'lastName'
  | 'email'
  | 'description';

export type ContactFormState = {
  message?: string | ContactFormResponseMessage;
  success?: boolean;
  validFields?: {
    [key in keyof ContactFormFields]: boolean;
  };
};

export enum ContactFormResponseMessage {
  SUCCESS = 'Message sent successfully! I will be in touch as soon as I can.',
  FAILED = 'Message failed to send. Please try again later.',
  INVALID = 'Please fill out all required fields with valid information.',
  INVALID_EMAIL = 'Please check that you have entered a valid email address.',
}
