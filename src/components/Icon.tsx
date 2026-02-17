import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBell,
  faChartBar,
  faPaw,
  faCalendar,
  faPills,
  faBook,
  faCog,
  faMapMarkerAlt,
  faTimes,
  faDog,
  faCat,
  faPaperclip,
  faBars,
  faXmark,
} from '@fortawesome/free-solid-svg-icons';

const icons = {
  bell: faBell,
  chart: faChartBar,
  paw: faPaw,
  calendar: faCalendar,
  pills: faPills,
  book: faBook,
  cog: faCog,
  map: faMapMarkerAlt,
  times: faTimes,
  dog: faDog,
  cat: faCat,
  paperclip: faPaperclip,
  bars: faBars,
  xmark: faXmark,
};

type IconName = keyof typeof icons;

const defaultColors: Record<IconName, string> = {
  bell: "text-indigo-500",
  chart: "text-blue-500",
  paw: "text-green-500",
  calendar: "text-yellow-500",
  pills: "text-red-500",
  book: "text-orange-500",
  cog: "text-gray-500",
  map: "text-teal-500",
  times: "text-gray-500",
  dog: "text-gray-600",
  cat: "text-gray-600",
  paperclip: "text-yellow-500",
  bars: "text-gray-600",
  xmark: "text-gray-600",
};

interface IconProps {
  name: IconName;
  /**
   * Additional classes that will be appended after the color class.
   * Use this for sizing, spacing, rotation etc.
   */
  className?: string;
  /**
   * Override the default color mapping. Provide a Tailwind text-... class
   * or any other color class you prefer.
   */
  color?: string;
}

export default function Icon({ name, className = "", color }: IconProps) {
  const colorClass = color ?? defaultColors[name] ?? "";
  return <FontAwesomeIcon icon={icons[name]} className={`${colorClass} ${className}`} />;
}
