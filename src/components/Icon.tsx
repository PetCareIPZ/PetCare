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
  faSyringe,
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
  syringe: faSyringe,
};

type IconName = keyof typeof icons;

export const defaultColors: Record<IconName, string> = {
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
  syringe: "rgb(193, 68, 239)",
};

interface IconProps {
  name: IconName;
  className?: string;
  color?: string;
}

export default function Icon({ name, className = "", color }: IconProps) {
  const colorValue = color ?? defaultColors[name] ?? "";
  const style = colorValue ? { color: colorValue } : undefined;
  return <FontAwesomeIcon icon={icons[name]} className={className} style={style} />;
}
