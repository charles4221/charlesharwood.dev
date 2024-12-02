import { faSpinner } from '@fortawesome/pro-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useFormStatus } from 'react-dom';

import { Button } from '../links/Button';

const ButtonText = {
  DEFAULT: 'Send Message',
  PENDING: 'Sending',
  SUCCESS: 'Message Sent!',
} as const;

export function ContactFormSubmitButton({ isSuccess }: { isSuccess: boolean }) {
  const formStatus = useFormStatus();
  const isPending = formStatus.pending;

  const isDisabled = isPending || isSuccess;

  const defaultButtonText = isPending ? ButtonText.PENDING : ButtonText.DEFAULT;
  const buttonText = isSuccess ? ButtonText.SUCCESS : defaultButtonText;

  return (
    <Button type="submit" disabled={isDisabled} isCTA>
      {buttonText}
      {isPending ? (
        <FontAwesomeIcon
          icon={faSpinner}
          className="text-slate-900 ml-3"
          spin
          size="xs"
        />
      ) : null}
    </Button>
  );
}
