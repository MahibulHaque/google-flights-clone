import { IconGoogle } from '@/assets/icons/IconGoogle';
import { navMenuItems } from '@/core/constants/menuItem.constant';
import Button from '@mui/material/Button';
import {useLocation} from '@tanstack/react-router';
import RouterLink from '../router-link';

const Header = () => {
  const location = useLocation();
  return (
    <div className="w-full bg-background sticky top-0 z-1000 border-b border-border">
      <div className="container-wrapper 3xl:fixed:px-0 px-6">
        <div className="3xl:fixed:container flex h-[calc(0.25rem*14)] items-center gap-2">
          <a
            href="/"
            className="items-center justify-center gap-2 flex text-sm font-medium [&_svg:not([class*='size-'])]:size-12 shrink-0 [&_svg]:shrink-0 size-16 outline-none">
            <IconGoogle />
          </a>
          <nav className="items-center gap-2 hidden lg:flex">
            {navMenuItems.map(item => (
              <Button
                LinkComponent={RouterLink}
                className="rounded-full!"
                size="medium"
                variant={location.href === item.href ? 'contained' : 'outlined'}
                color={'primary'}
                key={item.href}
                startIcon={<item.icon />}
                href={item.href}>
                {item.title}
              </Button>
            ))}
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Header;
