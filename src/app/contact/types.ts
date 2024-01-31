export type ContactFormFields = {
  firstName: string;
  lastName: string;
  email: string;
  company: string;
  website: string;
  description: string;
};

export type ContactFormState = {
  message?: string;
  success?: boolean;
};

type SenderOrRecipient = {
  name: string;
  email: string;
};

type Attachment = ({ url: string } | { content: string }) & {
  name: string;
};

export type MessageBody = {
  sender: SenderOrRecipient;
  to: SenderOrRecipient[];
  bcc?: SenderOrRecipient[];
  cc?: SenderOrRecipient[];
  replyTo?: SenderOrRecipient;
  subject: string;
  htmlContent: string;
  textContent: string;
  attachment?: Attachment[];
  templateId?: number;
  params?: { [key: string]: string };
  tags?: string[];
  scheduledAt?: string;
  batchId?: string;
};

type MessageResponseSuccess = {
  messageId: string;
};
type MessageResponseScheduled = {
  messageId: string;
  batchId: string;
};
type MessageResponseErrorCode =
  | 'invalid_parameter'
  | 'missing_parameter'
  | 'out_of_range'
  | 'campaign_processing'
  | 'campaign_sent'
  | 'document_not_found'
  | 'reseller_permission_denied'
  | 'not_enough_credits'
  | 'permission_denied'
  | 'duplicate_parameter'
  | 'duplicate_request'
  | 'method_not_allowed'
  | 'unauthorized'
  | 'account_under_validation'
  | 'not_acceptable'
  | 'bad_request';
type MessageResponseError = {
  message: string;
  code: MessageResponseErrorCode;
};
export type MessageResponse =
  | MessageResponseSuccess
  | MessageResponseScheduled
  | MessageResponseError;

export enum ContactFormResponseMessage {
  SUCCESS = 'Message sent successfully! I will be in touch as soon as I can.',
  FAILED = 'Message failed to send. Please try again later.',
}
