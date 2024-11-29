import { IconDefinition } from '@fortawesome/fontawesome-svg-core';

import { Theme } from '@/theme/types';

export type ThemeOption = {
  label: string;
  value: Theme;
  icon: IconDefinition;
  ariaTitle: string;
};
