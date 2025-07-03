import type { INavMenuItems } from "@core/interfaces/menuItem.interface";
import { IconLuggage, IconPlaneTilt, IconBedFilled, IconBeach } from "@tabler/icons-react";

export const navMenuItems: INavMenuItems[] = [
  {
    icon: IconLuggage,
    title: 'Travel',
    href: '/travel',
  },
  {
    icon: IconPlaneTilt,
    title: 'Flight',
    href: '/flights',
  },
  {
    icon: IconBedFilled,
    title: 'Hotels',
    href: '/hotels',
  },
  {
    icon: IconBeach,
    title: 'Vacation Rentals',
    href: '/vacation-rentals',
  },
] as const;