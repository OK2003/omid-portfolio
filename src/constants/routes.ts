export const ROUTES = {
  home: "/",
  about: "/about",
  projects: "/projects",
  blog: "/blog",
  resume: "/resume",
  contact: "/contact",
} as const;

export const NAV_ITEMS = [
  { label: "Home", href: ROUTES.home },
  { label: "About", href: ROUTES.about },
  { label: "Projects", href: ROUTES.projects },
  { label: "Blog", href: ROUTES.blog },
  { label: "Resume", href: ROUTES.resume },
  { label: "Contact", href: ROUTES.contact },
] as const;
