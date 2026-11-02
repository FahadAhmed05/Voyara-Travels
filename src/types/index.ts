export interface NavLink {
  label: string;
  href: `#${string}`;
}

export interface FooterLink {
  label: string;
  href: string;
}

export type SocialPlatform = "facebook" | "instagram" | "youtube" | "linkedin";

export interface SocialLink {
  platform: SocialPlatform;
  label: string;
  href: string;
}
