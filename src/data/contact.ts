import { Mail, Link2, MessageCircle } from "@lucide/vue";
import type { Component } from "vue";

export interface SocialLink {
  icon: Component;
  iconClass: string;
  label: string;
  value: string;
  href: string;
}

// TODO: replace placeholder values with real contact info before publishing
// TODO: replace with real LINE add-friend URL before publishing
export const LINE_ID = "@801foijn";
export const LINE_URL = "https://lin.ee/t6m8zt9";

// TODO: replace placeholder values with real contact info before publishing
export const socialLinks: SocialLink[] = [
  {
    icon: Mail,
    iconClass: "bg-accent-100 text-accent-700",
    label: "Gmail",
    value: "iamlaurenwang@gmail.com",
    href: "mailto:iamlaurenwang@gmail.com",
  },
  {
    icon: Link2,
    iconClass: "bg-neutral-200 text-neutral-600",
    label: "LinkedIn",
    value: "linkedin.com/in/lauren-wang",
    href: "https://www.linkedin.com/in/lauren-wang",
  },
  {
    icon: MessageCircle,
    iconClass: "bg-accent-50 text-accent-600",
    label: "LINE",
    value: LINE_ID,
    href: LINE_URL,
  },
];
