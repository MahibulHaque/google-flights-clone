import type { Icon, IconProps } from "@tabler/icons-react";
import type { LinkProps } from "@tanstack/react-router";

export interface INavMenuItems {
  icon: React.ForwardRefExoticComponent<IconProps & React.RefAttributes<Icon>>;
  title: string;
  href: LinkProps['to'];
}