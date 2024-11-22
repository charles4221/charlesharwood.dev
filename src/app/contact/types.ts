export type ContactFormFields = {
  firstName: string;
  lastName: string;
  email: string;
  company: string;
  projectType: string;
  description: string;
};

export type ContactFormRequiredFields =
  | 'firstName'
  | 'lastName'
  | 'email'
  | 'description';

export type ContactFormState = {
  data?: ContactFormFields;
  message?: string | ContactFormResponseMessage;
  success?: boolean;
  invalidFieldMessages?: {
    [key in keyof ContactFormFields]?: string;
  };
};

export enum ContactFormResponseMessage {
  SUCCESS = 'Message sent successfully! I will be in touch as soon as I can.',
  FAILED = 'Message failed to send. Please try again later.',
  INVALID = 'Please fill out all required fields with valid information.',
  INVALID_EMAIL = 'Please check that you have entered a valid email address.',
}
