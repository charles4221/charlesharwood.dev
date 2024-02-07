import { faSunrise, faSunset } from '@fortawesome/pro-light-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export function DarkModeIcon({ isDarkMode }: { isDarkMode: boolean }) {
  return (
    <FontAwesomeIcon
      icon={isDarkMode ? faSunrise : faSunset}
      size="lg"
      inverse={isDarkMode}
    />
  );
}
