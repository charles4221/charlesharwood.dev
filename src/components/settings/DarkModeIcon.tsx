import { faSunrise, faSunset } from '@fortawesome/pro-light-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// const animationStyle = {
//   '--fa-animation-duration': '3s',
//   '--fa-animation-delay': '10s',
//   '--fa-animation-timing': 'ease-in-out',
// };

export function DarkModeIcon({ isDarkMode }: { isDarkMode: boolean }) {
  return (
    <FontAwesomeIcon
      icon={isDarkMode ? faSunrise : faSunset}
      size="lg"
      inverse={isDarkMode}
    />
  );
}
