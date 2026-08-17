type IconProps = {
  className?: string;
};

const base = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  viewBox: "0 0 24 24",
};

export function ScissorsIcon({ className }: IconProps) {
  return (
    <svg className={className} {...base} aria-hidden="true">
      <circle cx="6" cy="6" r="3" />
      <circle cx="6" cy="18" r="3" />
      <line x1="8.5" y1="8.5" x2="19" y2="19" />
      <line x1="8.5" y1="15.5" x2="19" y2="5" />
    </svg>
  );
}

export function RazorIcon({ className }: IconProps) {
  return (
    <svg className={className} {...base} aria-hidden="true">
      <rect x="4" y="3" width="6" height="12" rx="1.5" />
      <path d="M7 15v2.5a3.5 3.5 0 0 0 7 0V15" />
      <path d="M14 12h6" />
      <path d="M17 9v6" />
    </svg>
  );
}

export function TowelIcon({ className }: IconProps) {
  return (
    <svg className={className} {...base} aria-hidden="true">
      <path d="M4 4h16v6a8 8 0 0 1-16 0V4Z" />
      <path d="M4 4v13a3 3 0 0 0 3 3" />
      <path d="M20 4v13a3 3 0 0 1-3 3" />
    </svg>
  );
}

export function CombIcon({ className }: IconProps) {
  return (
    <svg className={className} {...base} aria-hidden="true">
      <rect x="4" y="4" width="16" height="4" rx="1" />
      {[6, 9, 12, 15, 18].map((x) => (
        <line key={x} x1={x} y1="8" x2={x} y2="19" />
      ))}
    </svg>
  );
}

export function MapPinIcon({ className }: IconProps) {
  return (
    <svg className={className} {...base} aria-hidden="true">
      <path d="M20 10.5c0 6-8 11.5-8 11.5S4 16.5 4 10.5a8 8 0 1 1 16 0Z" />
      <circle cx="12" cy="10.5" r="2.5" />
    </svg>
  );
}

export function PhoneIcon({ className }: IconProps) {
  return (
    <svg className={className} {...base} aria-hidden="true">
      <path d="M4.5 3h3.2l1.6 4.5-2 1.6a13 13 0 0 0 6.6 6.6l1.6-2 4.5 1.6v3.2a2 2 0 0 1-2.2 2A17.5 17.5 0 0 1 2.5 5.2 2 2 0 0 1 4.5 3Z" />
    </svg>
  );
}

export function ClockIcon({ className }: IconProps) {
  return (
    <svg className={className} {...base} aria-hidden="true">
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3.5 2" />
    </svg>
  );
}

export function MenuIcon({ className }: IconProps) {
  return (
    <svg className={className} {...base} aria-hidden="true">
      <line x1="4" y1="7" x2="20" y2="7" />
      <line x1="4" y1="12" x2="20" y2="12" />
      <line x1="4" y1="17" x2="20" y2="17" />
    </svg>
  );
}

export function CloseIcon({ className }: IconProps) {
  return (
    <svg className={className} {...base} aria-hidden="true">
      <line x1="5" y1="5" x2="19" y2="19" />
      <line x1="19" y1="5" x2="5" y2="19" />
    </svg>
  );
}

export function ArrowRightIcon({ className }: IconProps) {
  return (
    <svg className={className} {...base} aria-hidden="true">
      <line x1="4" y1="12" x2="20" y2="12" />
      <polyline points="13 5 20 12 13 19" />
    </svg>
  );
}

export function FacebookIcon({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M13.5 22v-8.4h2.8l.4-3.3h-3.2V8.1c0-.95.26-1.6 1.63-1.6H17V3.5c-.3-.04-1.3-.13-2.46-.13-2.44 0-4.1 1.49-4.1 4.22v2.35H8v3.3h2.44V22h3.06Z" />
    </svg>
  );
}

/**
 * A plain, generic review-star mark — deliberately not a reproduction of
 * Yelp's trademarked logo. Always pair with a visible "Yelp" text label.
 */
export function StarIcon({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 3 14.12 9.09 20.56 9.22 15.42 13.11 17.29 19.28 12 15.6 6.71 19.28 8.58 13.11 3.44 9.22 9.88 9.09Z" />
    </svg>
  );
}

export function DotIcon({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 8 8" fill="currentColor" aria-hidden="true">
      <circle cx="4" cy="4" r="4" />
    </svg>
  );
}
