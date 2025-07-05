import Header from '@/components/ui/header';
import {createFileRoute, Outlet} from '@tanstack/react-router';

export const Route = createFileRoute('/(app)')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="flex flex-col bg-[#202124] relative z-10 min-h-screen">
      <Header />
      <main className="flex flex-1 flex-col">
        <Outlet />
      </main>
    </div>
  );
}
