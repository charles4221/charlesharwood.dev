import { faEclipse } from '@fortawesome/pro-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export function DarkModeIcon() {
  return (
    <FontAwesomeIcon
      icon={faEclipse}
      size="lg"
      className="text-slate-950 dark:text-white"
    />
  );
}
