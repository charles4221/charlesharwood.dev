import { useEffect } from 'react';

import clsx from 'clsx';

import { ContactFormResponseMessage } from '@/app/contact/types';
import { UmamiPlugin } from '@/plugins/umami';

type ContactFormResponseProps = {
  isSuccess: boolean | undefined;
  message: string | undefined;
};

export function ContactFormResponse({
  isSuccess,
  message,
}: ContactFormResponseProps) {
  useEffect(() => {
    if (isSuccess) {
      UmamiPlugin()?.track('Contact Form Submitted');
    }
  }, [isSuccess]);

  if (isSuccess === undefined) {
    return null;
  }

  const classes = clsx(
    'font-semibold mt-10',
    isSuccess ? 'text-green-700 dark:text-green-400' : 'text-red-600',
  );

  return (
    <p className={classes}>
      {message || ContactFormResponseMessage[isSuccess ? 'SUCCESS' : 'FAILED']}
    </p>
  );
}
