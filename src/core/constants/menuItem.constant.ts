import type { INavMenuItems } from "@/core/interfaces/menuItem.interface";
import {  Flight, Hotel, TravelExplore } from "@mui/icons-material";

export const navMenuItems: INavMenuItems[] = [
  {
    icon: TravelExplore,
    title: 'Travel',
    href: '/travel',
  },
  {
    icon: Flight,
    title: 'Flight',
    href: '/flights',
  },
  {
    icon: Hotel,
    title: 'Hotels',
    href: '/hotels',
  },
] as const;