import type { ReactNode } from "react";

interface IconProps {
  className?: string;
}

function Icon({ children, className }: IconProps & { children: ReactNode }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      {children}
    </svg>
  );
}

export function MenuIcon(props: IconProps) {
  return <Icon {...props}><path d="M4 6h16M4 12h16M4 18h16" /></Icon>;
}

export function CloseIcon(props: IconProps) {
  return <Icon {...props}><path d="m6 6 12 12M18 6 6 18" /></Icon>;
}

export function SunIcon(props: IconProps) {
  return <Icon {...props}><circle cx="12" cy="12" r="4" /><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" /></Icon>;
}

export function MoonIcon(props: IconProps) {
  return <Icon {...props}><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79Z" /></Icon>;
}

export function ExternalLinkIcon(props: IconProps) {
  return <Icon {...props}><path d="M14 3h7v7M10 14 21 3M21 14v5a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5" /></Icon>;
}

export function CodeIcon(props: IconProps) {
  return <Icon {...props}><path d="m8 9-4 3 4 3M16 9l4 3-4 3M14 5l-4 14" /></Icon>;
}
