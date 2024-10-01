import clsx from 'clsx';

import { ContactFormResponseMessage } from '@/app/contact/types';

type ContactFormResponseProps = {
  success: boolean | undefined;
  message: string | undefined;
};

export function ContactFormResponse({
  success,
  message,
}: ContactFormResponseProps) {
  if (success === undefined) {
    return null;
  }

  const classes = clsx(
    'font-semibold mt-10',
    success ? 'text-green-700 dark:text-green-400' : 'text-red-600',
  );

  return (
    <p className={classes}>
      {message || ContactFormResponseMessage[success ? 'SUCCESS' : 'FAILED']}
    </p>
  );
}
