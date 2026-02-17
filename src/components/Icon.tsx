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

// RGBA colors mapped to each semantic icon name.  
// These values correspond roughly to the Tailwind palette previously used.
const defaultColors: Record<IconName, string> = {
  bell: "rgba(234,179,8,1)",
  chart: "rgba(59,130,246,1)",
  paw: "rgba(16,185,129,1)",
  calendar: "rgba(99,102,241,1)",
  pills: "rgba(239,68,68,1)",
  book: "rgba(249,115,22,1)",
  cog: "rgba(107,114,128,1)",
  map: "rgba(20,184,166,1)",
  times: "rgba(107,114,128,1)",
  dog: "rgba(75,85,99,1)",
  cat: "rgba(75,85,99,1)",
  paperclip: "rgba(234,179,8,1)",
  bars: "rgba(75,85,99,1)",
  xmark: "rgba(75,85,99,1)",
};

interface IconProps {
  name: IconName;
  /**
   * Additional classes for sizing, spacing, rotation, etc.
   * These are appended to the rendered element but do not affect color.
   */
  className?: string;
  /**
   * Override the default color mapping. Provide any valid CSS color string
   * (hex, rgb, rgba, named color, etc.). If omitted, the component uses
   * the RGBA value defined in `defaultColors` for the given icon.
   */
  color?: string;
}

export default function Icon({ name, className = "", color }: IconProps) {
  const colorValue = color ?? defaultColors[name] ?? "";
  const style = colorValue ? { color: colorValue } : undefined;
  return <FontAwesomeIcon icon={icons[name]} className={className} style={style} />;
}
