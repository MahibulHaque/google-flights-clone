import type { SvgIconComponent } from "@mui/icons-material";
import type { LinkProps } from "@tanstack/react-router";

export interface INavMenuItems {
  icon: SvgIconComponent;
  title: string;
  href: LinkProps['to'];
}