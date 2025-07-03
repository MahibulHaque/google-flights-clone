import {Link, type LinkProps} from '@tanstack/react-router';
import React from 'react';

interface RouterLinkProps extends Omit<LinkProps, 'to'> {
  href: LinkProps['to'];
  ref?: React.RefObject<HTMLAnchorElement | null>;
}

export default function RouterLink({
  ref, 
  href, 
  ...props
}: Readonly<RouterLinkProps>) {
  return <Link ref={ref} to={href} {...props} />;
}
