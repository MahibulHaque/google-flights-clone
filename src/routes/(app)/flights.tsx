import BackgroundImage from '@assets/svg/background.svg';
import {FlightSearchForm} from '@features/flights/components/FlightSearchForm';
import {createFileRoute} from '@tanstack/react-router';
export const Route = createFileRoute('/(app)/flights')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="container-wrapper relative flex flex-col items-center gap-2 pt-8 lg:pt-30">
      <img src={BackgroundImage} className="w-full h-auto absolute top-0 z-[-1] left-[50%] translate-x-[-50%]" alt="background" />
      <h1 className='text-4xl lg:text-6xl font-medium text-foreground'>Flights</h1>
      <FlightSearchForm />
    </div>
  );
}
