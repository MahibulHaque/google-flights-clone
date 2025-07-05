import StoreProvider from '@/components/provider/StoreProvider';
import {ThemeProvider} from '@/theme';
import {createRootRoute, Outlet} from '@tanstack/react-router';
import {TanStackRouterDevtools} from '@tanstack/react-router-devtools';

export const Route = createRootRoute({
  component: () => (
    <>
      <StoreProvider>
        <ThemeProvider>
          <Outlet />
        </ThemeProvider>
      </StoreProvider>
      <TanStackRouterDevtools />
    </>
  ),
});
