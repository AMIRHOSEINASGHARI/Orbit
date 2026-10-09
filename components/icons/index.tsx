import type { ReactNode, SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

function icon(children: ReactNode) {
  return function Icon(props: IconProps) {
    return (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden={props["aria-label"] ? undefined : true}
        {...props}
      >
        {children}
      </svg>
    );
  };
}

export const CheckIcon = icon(<path d="m5 12 4 4L19 6" />);
export const ChevronDownIcon = icon(<path d="m6 9 6 6 6-6" />);
export const ChevronLeftIcon = icon(<path d="m15 6-6 6 6 6" />);
export const ChevronRightIcon = icon(<path d="m9 6 6 6-6 6" />);
export const ChevronUpIcon = icon(<path d="m6 15 6-6 6 6" />);
export const CircleCheckIcon = icon(
  <>
    <circle cx="12" cy="12" r="9" />
    <path d="m8 12 3 3 5-6" />
  </>,
);
export const InfoIcon = icon(
  <>
    <circle cx="12" cy="12" r="9" />
    <path d="M12 11v5m0-8h.01" />
  </>,
);
export const Loader2Icon = icon(<path d="M21 12a9 9 0 1 1-9-9" />);
export const MinusIcon = icon(<path d="M5 12h14" />);
export const MoreHorizontalIcon = icon(
  <>
    <circle cx="5" cy="12" r="1" />
    <circle cx="12" cy="12" r="1" />
    <circle cx="19" cy="12" r="1" />
  </>,
);
export const OctagonXIcon = icon(
  <>
    <path d="M8 2h8l6 6v8l-6 6H8l-6-6V8z" />
    <path d="m9 9 6 6m0-6-6 6" />
  </>,
);
export const PanelLeftIcon = icon(
  <>
    <rect x="3" y="3" width="18" height="18" rx="2" />
    <path d="M9 3v18" />
  </>,
);
export const SearchIcon = icon(
  <>
    <circle cx="11" cy="11" r="7" />
    <path d="m16 16 5 5" />
  </>,
);
export const TriangleAlertIcon = icon(
  <>
    <path d="M10.3 4a2 2 0 0 1 3.4 0l8 14a2 2 0 0 1-1.7 3H4a2 2 0 0 1-1.7-3z" />
    <path d="M12 9v4m0 4h.01" />
  </>,
);
export const XIcon = icon(<path d="M5 5 19 19M19 5 5 19" />);
export const HomeIcon = icon(
  <>
    <path d="m3 10 9-7 9 7v10a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1z" />
    <path d="M9 21v-7h6v7" />
  </>,
);
export const ListIcon = icon(
  <>
    <path d="M9 6h12M9 12h12M9 18h12" />
    <path d="m3 6 1 1 2-2m-3 7 1 1 2-2m-3 7 1 1 2-2" />
  </>,
);
export const FolderIcon = icon(
  <path d="M3 6a2 2 0 0 1 2-2h5l2 2h7a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />,
);
export const NoteIcon = icon(
  <>
    <rect x="4" y="3" width="16" height="18" rx="2" />
    <path d="M8 8h8M8 12h8M8 16h5" />
  </>,
);
export const CalendarIcon = icon(
  <>
    <rect x="3" y="5" width="18" height="16" rx="2" />
    <path d="M7 3v4m10-4v4M3 10h18" />
  </>,
);
export const FilterIcon = icon(<path d="M3 5h18l-7 8v6l-4 2v-8z" />);
export const ArchiveIcon = icon(
  <>
    <rect x="3" y="4" width="18" height="4" rx="1" />
    <path d="M5 8v12h14V8m-10 5h6" />
  </>,
);
export const UsersIcon = icon(
  <>
    <circle cx="9" cy="8" r="3" />
    <path d="M3 20v-2a6 6 0 0 1 12 0v2M17 5a3 3 0 0 1 0 6m1 3a5 5 0 0 1 3 5v1" />
  </>,
);
export const ChartIcon = icon(
  <>
    <path d="M4 20V4m0 16h16" />
    <path d="M8 16v-4m4 4V8m4 8V6" />
  </>,
);
export const TrashIcon = icon(
  <>
    <path d="M4 7h16m-14 0 1 14h10l1-14M9 7V4h6v3m-5 4v6m4-6v6" />
  </>,
);
export const BellIcon = icon(
  <>
    <path d="M18 8a6 6 0 0 0-12 0c0 7-3 8-3 9h18c0-1-3-2-3-9M10 21h4" />
  </>,
);
export const SettingsIcon = icon(
  <>
    <circle cx="12" cy="12" r="3" />
    <path d="M12 2v3m0 14v3M2 12h3m14 0h3M5 5l2 2m10 10 2 2M19 5l-2 2M7 17l-2 2" />
  </>,
);
export const MenuIcon = icon(<path d="M4 6h16M4 12h16M4 18h16" />);
// shortcut: the orbit mark is provisional, replace it when the Figma logo is provided.
export const OrbitIcon = icon(
  <>
    <circle cx="12" cy="12" r="4" />
    <ellipse cx="12" cy="12" rx="10" ry="5" transform="rotate(-30 12 12)" />
    <circle cx="20" cy="8" r="1" fill="currentColor" stroke="none" />
  </>,
);
